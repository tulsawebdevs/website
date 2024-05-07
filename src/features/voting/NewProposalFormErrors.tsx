/* eslint-disable max-classes-per-file */
import { ZodiosError } from '@zodios/core';
import z from 'astro/zod';

function isZodiosZodError(
  error: unknown,
): error is ZodiosError & { cause: z.ZodError } {
  return error instanceof ZodiosError && error.cause instanceof z.ZodError;
}

export class ProposalFormError extends Error {
  source: unknown;

  errors: string[];

  constructor(source: unknown) {
    let og = source;

    // Don't wrap ProposalFormError in another ProposalFormError
    if (og instanceof ProposalFormError) og = og.source;

    // Unwrap ZodErrors wrapped in ZodiosErrors
    if (isZodiosZodError(og)) og = og.cause;

    // ! For debugging unhandled Zodios errors
    if (og instanceof ZodiosError && !isZodiosZodError(og)) {
      console.error(og);
    }

    const errors = [og].flat(1).flatMap((error) => {
      switch (true) {
        case error instanceof Response:
          return `${error.status} Error${error.statusText ? `: ${error.statusText}` : ''}`;
        case error instanceof z.ZodError:
          return [
            'Invalid Response from server:',
            ...error.errors.map(
              (err) => `- ${err.path.join('>')}: ${err.message}\n`,
            ),
          ];
        case typeof error === 'string':
          return error;
        case error instanceof Error || error instanceof ErrorEvent:
          return error.message;
        default:
          return 'Unknown error';
      }
    });

    super(errors.join('\n'));
    this.source = source;
    this.errors = errors;
    this.name = 'ProposalFormError';
  }

  render() {
    return (
      <div className="first-line:font-bold space-y-2 pointer-events-none">
        <h2>Submission Failed</h2>
        <p>
          There was an error submitting your proposal. Please try again. If the
          problem continues, please contact support.
        </p>
        {this.errors.map((error) => (
          <p key={error}>{error}</p>
        ))}
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
