import { config } from 'dotenv';
import { prisma } from 'src/database/prismaClient';

class IGDBConnector {
  #tokenRequestUrl: string;
  #base_url: string;
  #authorisation_request_body: object;
  #access_token: string = '';
  #is_initialised: boolean = false;

  constructor() {
    config();
    if (!process.env.IGDB_TOKEN_REQUEST_URL) {
      throw new Error('IGDB API Token Request URL not defined');
    }
    if (!process.env.IGDB_API) {
      throw new Error('IGDB API Base URL not defined');
    }
    this.#tokenRequestUrl = process.env.IGDB_TOKEN_REQUEST_URL;
    this.#base_url = process.env.IGDB_API;
    this.#authorisation_request_body = {
      client_id: process.env.IGDB_CLIENT_ID,
      client_secret: process.env.IGDB_CLIENT_SECRET,
      grant_type: 'client_credentials',
    };
  }

  async initialize() {
    if (this.#isInitiliased()) {
      return;
    }
    const tokenRecord = await this.#getMostRecentToken();
    // Check token exists and won't expire the next minute
    if (tokenRecord && tokenRecord.expire_at >= new Date(Date.now() + 60000)) {
      this.#access_token = tokenRecord.token;
    } else {
      this.#access_token = await this.#getNewToken();
    }
    this.#is_initialised = true;
  }

  #isInitiliased(): boolean {
    return this.#is_initialised;
  }

  #getHeader(): { 'Content-Type': string; 'Client-ID': string; Authorization: string } {
    return {
      'Content-Type': 'application/json',
      'Client-ID': process.env.IGDB_CLIENT_ID || '',
      Authorization: 'Bearer ' + this.#access_token,
    };
  }

  async #getMostRecentToken() {
    const mostRecentTokens = await prisma.igdb_tokens.findMany({
      orderBy: {
        expire_at: 'desc',
      },
      take: 1,
    });

    return mostRecentTokens[0];
  }

  async #sendNewTokenRequest() {
    try {
      const response = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.#authorisation_request_body),
      });
      return await response.json();
    } catch (error: any) {
      console.error(`Download error: ${error.message}`);
    }
  }

  async #getNewToken() {
    const tokenObject = await this.#sendNewTokenRequest();
    await prisma.igdb_tokens.create({
      data: {
        token: tokenObject.access_token,
        expire_at: new Date(Date.now() + tokenObject.expires_in * 1000),
      },
    });
    return tokenObject.access_token;
  }

  async gameFetch(body: string) {
    await this.initialize();
    try {
      const response = await fetch(this.#base_url + 'games/', {
        headers: this.#getHeader(),
        method: 'POST',
        body: body,
      });
      return await response.json();
    } catch (error: any) {
      console.error(`Download error: ${error.message}`);
    }
  }
}

const connector = new IGDBConnector();

async function getConnector() {
  await connector.initialize();
  return connector;
}

export { getConnector };
