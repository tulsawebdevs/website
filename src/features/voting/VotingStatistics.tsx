import { useMemo } from 'react';
import { Meh, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import type { ProposalWinner } from '@/sdk';

type Props = {
  results: ProposalWinner['results'];
};

export default function VotingStatistics({ results }: Props) {
  const stats = useMemo(
    () =>
      results.reduce(
        (accumulator, result) => {
          const voteValue = result.value;

          if (voteValue < 0) {
            accumulator.down.score += voteValue;
            accumulator.down.count += 1;
          } else if (voteValue > 0) {
            accumulator.up.score += voteValue;
            accumulator.up.count += 1;
          } else {
            accumulator.neutral.score += voteValue;
            accumulator.neutral.count += 1;
          }

          accumulator.total += voteValue;

          return accumulator;
        },
        {
          up: { score: 0, count: 0 },
          down: { score: 0, count: 0 },
          neutral: { score: 0, count: 0 },
          total: 0,
        },
      ),
    [results],
  );

  const breakdown = useMemo(() => {
    if (results.length === 0) {
      return { down: 0, neutral: 0, up: 0 };
    }

    return {
      down: (stats.down.count / results.length) * 100,
      neutral: (stats.neutral.count / results.length) * 100,
      up: (stats.up.count / results.length) * 100,
    };
  }, [stats, results]);

  return (
    <div data-testid="voting-statistics">
      <h2 className="font-bold">Voting Results</h2>
      <p className="font-medium text-slate-500 text-sm">
        Total Score: <span data-testid="vote-score">{stats.total}</span>
      </p>

      <div className="flex gap-x-1 my-3">
        <div
          className="bg-red-500 rounded h-4"
          style={{
            width: `${breakdown.down}%`,
          }}
          data-testid="breakdown-down"
          data-breakdown={breakdown.down}
        />
        <div
          className="bg-slate-500 rounded h-4"
          style={{
            width: `${breakdown.neutral}%`,
          }}
          data-testid="breakdown-neutral"
          data-breakdown={breakdown.neutral}
        />
        <div
          className="bg-green-500 rounded h-4"
          style={{
            width: `${breakdown.up}%`,
          }}
          data-testid="breakdown-up"
          data-breakdown={breakdown.up}
        />
      </div>

      <div className="flex justify-between">
        <div>
          <span className="text-slate-600">Negative</span>

          <div className="flex items-center justify-center">
            <ThumbsDownIcon className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-500 font-medium" data-testid="down-count">
              {stats.down.count}
            </span>
          </div>
        </div>
        <div>
          <span className="text-slate-600">Neutral</span>

          <div className="flex items-center justify-center">
            <Meh className="w-5 h-5 mr-2" />
            <span data-testid="neutral-count">{stats.neutral.count}</span>
          </div>
        </div>
        <div>
          <span className="text-slate-600">Positive</span>

          <div className="flex items-center justify-center">
            <ThumbsUpIcon className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-green-500 font-medium" data-testid="up-count">
              {stats.up.count}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
