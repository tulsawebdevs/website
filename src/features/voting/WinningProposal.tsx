import type { ProposalWinner } from '@/sdk';
import VotingStatistics from './VotingStatistics.tsx';

type Props = ProposalWinner;

export default function WinningProposal(props: Props) {
  return (
    <div data-testid="winning-proposal">
      <div className="bg-white rounded-t-lg border-b-2 p-3">
        <div className="mb-3">
          <h1
            className="break-words font-bold text-xl"
            data-testid="proposal-title"
          >
            {props.title}
          </h1>
          <h2 className="break-words" data-testid="proposal-summary">
            {props.summary}
          </h2>
        </div>

        {props.description && (
          <p className="text-slate-700" data-testid="proposal-description">
            {props.description}
          </p>
        )}
      </div>

      <div className="bg-slate-100 rounded-b-lg p-3">
        <VotingStatistics results={props.results} />
      </div>
    </div>
  );
}
