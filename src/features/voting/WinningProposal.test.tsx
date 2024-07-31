import { render, screen } from '@testing-library/react';
import { expect, test, describe, beforeEach } from 'vitest';
import WinningProposal from './WinningProposal.tsx';
import type { ProposalWinner } from '@/sdk';

const testProposal: ProposalWinner = {
  id: 1,
  created: '2021-09-01T12:00:00Z',
  updated: '2021-09-01T12:00:00Z',
  title: 'My Proposal',
  description: 'A longer description of the proposal',
  summary: 'A short summary of the proposal',
  authorName: 'John Doe',
  type: 'topic',
  status: 'closed',
  results: [
    { value: 2, comment: null },
    { value: 2, comment: null },
    { value: 2, comment: null },
    { value: 0, comment: null },
    { value: -1, comment: null },
    { value: -2, comment: null },
  ],
};

describe('WinningProposal Component', () => {
  describe('default render', () => {
    beforeEach(() => {
      // eslint-disable-next-line react/jsx-props-no-spreading
      render(<WinningProposal {...testProposal} />);
    });

    test('renders element', () => {
      expect(screen.getByTestId('winning-proposal')).toBeInTheDocument();
    });

    test('renders title', () => {
      expect(screen.getByText('My Proposal')).toBeInTheDocument();
    });
    test('renders summary', () => {
      expect(
        screen.getByText('A short summary of the proposal'),
      ).toBeInTheDocument();
    });
    test('renders description', () => {
      expect(
        screen.getByText('A longer description of the proposal'),
      ).toBeInTheDocument();
    });
    test('renders voting statistics', () => {
      expect(screen.getByTestId('voting-statistics')).toBeInTheDocument();
    });
  });

  test('do not display optional description', () => {
    const { description, ...proposal } = testProposal;

    // eslint-disable-next-line react/jsx-props-no-spreading
    render(<WinningProposal {...proposal} />);

    expect(
      screen.queryByTestId('proposal-description'),
    ).not.toBeInTheDocument();
  });
});
