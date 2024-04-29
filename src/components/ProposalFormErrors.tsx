/* eslint-disable max-classes-per-file */
export class ProposalFormError extends Error {
  constructor(cause: unknown) {
    let message: string;

    if (cause instanceof Response) {
      message = `${cause.status} Error: ${cause.statusText}`;
    } else {
      message = `Unknown Error`;
    }

    if (typeof cause === 'string') message += `: ${cause}`;
    if (cause instanceof Error) message += `: ${cause.message}`;
    if (cause instanceof ErrorEvent) message += `: ${cause.message}`;

    super(message);
    this.name = 'ProposalFormError';
  }

  render() {
    return (
      <div className="first-line:font-bold space-y-2">
        <p>{this.message}</p>
        <p>
          Please try again. If the problem continues, please contact support.
        </p>
      </div>
    );
  }
}

export class ProposalFormFetchError extends ProposalFormError {
  constructor() {
    super('Network Error');
    this.name = 'ProposalFormFetchError';
  }
}
