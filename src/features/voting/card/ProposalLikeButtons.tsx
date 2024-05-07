import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { Button } from '../../ui/button.tsx';
import type { Vote } from '../types.ts';

type ProposalLikeButtonsProps = {
  onVote: (vote: Vote) => void;
  numberUpvotes: number | string;
  numberDownvotes: number | string;
  disabled?: boolean;
  voteValue: string;
};

export default function ProposalLikeButtons({
  onVote,
  numberUpvotes,
  numberDownvotes,
  disabled = false,
  voteValue,
}: ProposalLikeButtonsProps) {
  const handleLikeVote = (type: 'up' | 'down') => {
    let currentVoteValue = parseInt(voteValue, 10);

    if (type === 'up') {
      currentVoteValue = Math.min(2, currentVoteValue + 1);
    } else {
      currentVoteValue = Math.max(-2, currentVoteValue - 1);
    }

    onVote(currentVoteValue.toString() as Vote);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleLikeVote('up')}
        disabled={disabled}
      >
        <ThumbsUpIcon className="w-5 h-5 text-green-500 mr-1" />
        <span className="text-green-500 font-medium">{numberUpvotes}</span>
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={() => handleLikeVote('down')}
        disabled={disabled}
      >
        <ThumbsDownIcon className="w-5 h-5 text-red-500 mr-1" />
        <span className="text-red-500 font-medium">{numberDownvotes}</span>
      </Button>
    </div>
  );
}
