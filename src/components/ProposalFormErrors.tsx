/* eslint-disable max-classes-per-file */
export class ProposalFormError extends Error {
  displayText: string;

  constructor(message: string) {
    super(message);
    this.name = 'ProposalFormError';
    this.displayText =
      'Please try again. If the problem continues, please contact support.';
  }
}

export class ProposalForm401Error extends ProposalFormError {
  constructor() {
    super('Not Authorized');
    this.name = 'ProposalFormNotAuhorizedError';
  }
}

export class ProposalForm500Error extends ProposalFormError {
  constructor() {
    super('Server Error');
    this.name = 'ProposalFormServerError';
  }
}

export class ProposalFormUnknownError extends ProposalFormError {
  constructor(message?: string) {
    super(`Unknown Error${message ? `: ${message}` : ''}`);
    this.name = 'ProposalFormUnknownError';
  }
}

export class ProposalFormFetchError extends ProposalFormError {
  constructor() {
    super('Network Error');
    this.name = 'ProposalFormFetchError';
  }
}
