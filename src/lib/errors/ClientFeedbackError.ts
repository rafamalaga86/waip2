export class ClientFeedbackError extends Error {
  #status: number | null;
  constructor(message: string, status: number | null = null) {
    super(message);
    this.#status = status;
  }

  getStatus() {
    return this.#status;
  }
  getMessage() {
    return this.message;
  }
}
