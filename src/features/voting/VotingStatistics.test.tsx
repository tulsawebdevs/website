import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import VotingStatistics from './VotingStatistics.tsx';

describe('Voting Statistics Component', () => {
  test('renders default', () => {
    render(<VotingStatistics results={[]} />);

    expect(screen.getByText('Voting Results')).toBeInTheDocument();
    expect(screen.getByTestId('vote-score')).toHaveTextContent('0');
    expect(screen.getByTestId('down-count')).toHaveTextContent('0');
    expect(screen.getByTestId('neutral-count')).toHaveTextContent('0');
    expect(screen.getByTestId('up-count')).toHaveTextContent('0');
    expect(screen.getByTestId('breakdown-down')).toHaveAttribute(
      'data-breakdown',
      '0',
    );
    expect(screen.getByTestId('breakdown-neutral')).toHaveAttribute(
      'data-breakdown',
      '0',
    );
    expect(screen.getByTestId('breakdown-up')).toHaveAttribute(
      'data-breakdown',
      '0',
    );
  });

  describe('Count Statistics', () => {
    test('calculates correct scores', () => {
      render(
        <VotingStatistics
          results={[
            { value: 2, comment: null },
            { value: 0, comment: null },
            { value: -1, comment: null },
          ]}
        />,
      );

      expect(screen.getByTestId('vote-score')).toHaveTextContent('1');
      expect(screen.getByTestId('down-count')).toHaveTextContent('1');
      expect(screen.getByTestId('neutral-count')).toHaveTextContent('1');
      expect(screen.getByTestId('up-count')).toHaveTextContent('1');
    });

    test('calculates correct negative score', () => {
      render(
        <VotingStatistics
          results={[
            { value: 2, comment: null },
            { value: 0, comment: null },
            { value: -1, comment: null },
            { value: -2, comment: null },
            { value: -2, comment: null },
          ]}
        />,
      );

      expect(screen.getByTestId('vote-score')).toHaveTextContent('-3');
      expect(screen.getByTestId('down-count')).toHaveTextContent('3');
      expect(screen.getByTestId('neutral-count')).toHaveTextContent('1');
      expect(screen.getByTestId('up-count')).toHaveTextContent('1');
    });

    test('calculates correct positive score', () => {
      render(
        <VotingStatistics
          results={[
            { value: -2, comment: null },
            { value: 0, comment: null },
            { value: 1, comment: null },
            { value: 2, comment: null },
            { value: 2, comment: null },
          ]}
        />,
      );

      expect(screen.getByTestId('vote-score')).toHaveTextContent('3');
      expect(screen.getByTestId('down-count')).toHaveTextContent('1');
      expect(screen.getByTestId('neutral-count')).toHaveTextContent('1');
      expect(screen.getByTestId('up-count')).toHaveTextContent('3');
    });

    test('calculates correct neutral score', () => {
      render(
        <VotingStatistics
          results={[
            { value: 0, comment: null },
            { value: 0, comment: null },
            { value: 0, comment: null },
            { value: 0, comment: null },
          ]}
        />,
      );

      expect(screen.getByTestId('vote-score')).toHaveTextContent('0');
      expect(screen.getByTestId('down-count')).toHaveTextContent('0');
      expect(screen.getByTestId('neutral-count')).toHaveTextContent('4');
      expect(screen.getByTestId('up-count')).toHaveTextContent('0');
    });
  });

  describe('Stacked Bar Statistics', () => {
    test('calculate 1/3 per vote type', () => {
      render(
        <VotingStatistics
          results={[
            { value: 2, comment: null },
            { value: 0, comment: null },
            { value: -1, comment: null },
          ]}
        />,
      );
      expect(screen.getByTestId('breakdown-down')).toHaveAttribute(
        'data-breakdown',
        `${(1 / 3) * 100}`,
      );
      expect(screen.getByTestId('breakdown-neutral')).toHaveAttribute(
        'data-breakdown',
        `${(1 / 3) * 100}`,
      );
      expect(screen.getByTestId('breakdown-up')).toHaveAttribute(
        'data-breakdown',
        `${(1 / 3) * 100}`,
      );
    });
    test('calculate majority negative votes', () => {
      render(
        <VotingStatistics
          results={[
            { value: 2, comment: null },
            { value: 0, comment: null },
            { value: -1, comment: null },
            { value: -2, comment: null },
            { value: -2, comment: null },
          ]}
        />,
      );

      expect(screen.getByTestId('breakdown-down')).toHaveAttribute(
        'data-breakdown',
        `${(3 / 5) * 100}`,
      );
      expect(screen.getByTestId('breakdown-neutral')).toHaveAttribute(
        'data-breakdown',
        `${(1 / 5) * 100}`,
      );
      expect(screen.getByTestId('breakdown-up')).toHaveAttribute(
        'data-breakdown',
        `${(1 / 5) * 100}`,
      );
    });
    test('calculate majority positive votes', () => {
      render(
        <VotingStatistics
          results={[
            { value: -2, comment: null },
            { value: 0, comment: null },
            { value: 1, comment: null },
            { value: 2, comment: null },
            { value: 2, comment: null },
          ]}
        />,
      );

      expect(screen.getByTestId('breakdown-down')).toHaveAttribute(
        'data-breakdown',
        `${(1 / 5) * 100}`,
      );
      expect(screen.getByTestId('breakdown-neutral')).toHaveAttribute(
        'data-breakdown',
        `${(1 / 5) * 100}`,
      );
      expect(screen.getByTestId('breakdown-up')).toHaveAttribute(
        'data-breakdown',
        `${(3 / 5) * 100}`,
      );
    });
    test('calculate majority neutral votes', () => {
      render(
        <VotingStatistics
          results={[
            { value: -2, comment: null },
            { value: 0, comment: null },
            { value: 0, comment: null },
            { value: 0, comment: null },
            { value: 2, comment: null },
          ]}
        />,
      );

      expect(screen.getByTestId('breakdown-down')).toHaveAttribute(
        'data-breakdown',
        `${(1 / 5) * 100}`,
      );
      expect(screen.getByTestId('breakdown-neutral')).toHaveAttribute(
        'data-breakdown',
        `${(3 / 5) * 100}`,
      );
      expect(screen.getByTestId('breakdown-up')).toHaveAttribute(
        'data-breakdown',
        `${(1 / 5) * 100}`,
      );
    });
  });
});
