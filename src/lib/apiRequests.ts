import { Prisma } from '@prisma/client';

const PLAYED_URL = `/playeds`;
const BASED_URL = process.env.NEXT_PUBLIC_PRIVATE_API_URL;

export async function deletePlayedRequest(id: number) {
  const url = BASED_URL + PLAYED_URL + '/' + id;
  console.log(url);
  const response = await fetch(url, {
    method: 'DELETE',
  });
  console.log('Escupe: ', response);
  let json = null;
  if (response.status !== 204) {
    json = await response.json();
  }
  return { response: json, statusCode: response.status };
}

export async function upsertPlayedRequest(details: Prisma.playedsCreateManyInput, id?: number) {
  const url = BASED_URL + PLAYED_URL + '/' + (id ? id : '');
  const response = await fetch(url, {
    method: id ? 'PATCH' : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  });
  return { response: await response.json(), statusCode: response.status };
}
