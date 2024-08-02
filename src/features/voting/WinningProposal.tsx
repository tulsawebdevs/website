import type { ProposalWinner } from '@/sdk';
import VotingStatistics from './VotingStatistics.tsx';

type Props = ProposalWinner;

export default function WinningProposal(props: Props) {
  return (
    <div data-testid="winning-proposal">
      <div className="bg-white rounded-t-lg border-b-2 p-3 dark:bg-sky-900 dark:text-white dark:border-sky-700">
        <div className="mb-3">
          <h1
            className="break-words font-bold text-xl dark:text-sky-500"
            data-testid="proposal-title"
          >
            {props.title}
          </h1>
          <h2 className="break-words" data-testid="proposal-summary">
            {props.summary}
          </h2>
        </div>

        {props.description && (
          <p
            className="text-slate-700 dark:text-white"
            data-testid="proposal-description"
          >
            {props.description}
          </p>
        )}
      </div>

      <div className="bg-slate-100 rounded-b-lg p-3 dark:bg-sky-950 dark:text-white">
        <VotingStatistics results={props.results} />
      </div>
    </div>
  );
}
