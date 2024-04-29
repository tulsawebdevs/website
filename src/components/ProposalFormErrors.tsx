/* eslint-disable max-classes-per-file */
import z from 'astro/zod';

export class ProposalFormError extends Error {
  source: unknown;

  constructor(source: unknown) {
    let message: string | string[];
    const og = source instanceof ProposalFormError ? source.source : source;

    if (og instanceof Response) {
      message = `${og.status} Error${og.statusText ? `: ${og.statusText}` : ''}`;
    } else if (og instanceof z.ZodError) {
      message = `${og.errors.map((err) => `${err.path.join('>')}: ${err.message}`).join('\n')}`;
    } else if (typeof og === 'string') {
      message = `${og}`;
    } else if (og instanceof Error) {
      message = `${og.message}`;
    } else if (og instanceof ErrorEvent) {
      message = `${og.message}`;
    } else {
      message = 'An unknown error occurred';
    }

    super(message);
    this.source = source;
    this.name = 'ProposalFormError';
  }

  render() {
    return (
      <div className="first-line:font-bold space-y-2">
        <p>Submission Failed</p>
        <p>
          There was an error submitting your proposal. Please try again. If the
          problem continues, please contact support.
        </p>
        <p>{this.message}</p>
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
