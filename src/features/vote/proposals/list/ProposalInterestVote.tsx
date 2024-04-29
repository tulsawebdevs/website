import { Label } from '@radix-ui/react-label';
import { MinusIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import {
  RadioGroup,
  RadioGroupItem,
} from '../../../../components/ui/radio-group.tsx';
import { cn } from '../../../../utils.ts';
import type { Proposal, Vote } from '../types.ts';

const voteOptions = [
  {
    label: 'Strongly Disinterested',
    value: '-2',
    id: 'vote-strongly-disinterested',
  },
  {
    label: 'Slightly Disinterested',
    value: '-1',
    id: 'vote-slightly-disinterested',
  },
  { label: 'Neutral', value: '0', id: 'vote-neutral' },
  { label: 'Slightly Interested', value: '1', id: 'vote-slightly-interested' },
  { label: 'Strongly Interested', value: '2', id: 'vote-strongly-interested' },
];

type ProposalInterestVoteProps = {
  proposal: Proposal;
  disabled?: boolean;
  onVote: (vote: Vote) => void;
  value: Vote;
};

export default function ProposalInterestVote({
  proposal,
  disabled = false,
  onVote,
  value,
}: ProposalInterestVoteProps) {
  return (
    <RadioGroup
      aria-label="Vote"
      className="flex flex-col md:flex-row md:items-center gap-2"
      value={value}
      onValueChange={onVote}
      disabled={disabled}
    >
      {voteOptions.map((option) => {
        const optionValue = parseInt(option.value, 10);

        return (
          <Label
            key={`${proposal.id}-${option.id}`}
            className="flex items-center gap-2 cursor-pointer"
            htmlFor={`${proposal.id}-${option.id}`}
          >
            <RadioGroupItem
              className="peer sr-only"
              id={`${proposal.id}-${option.id}`}
              value={option.value}
              disabled={disabled}
            />
            <div
              className={cn(
                'p-0.5 w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-400',
                {
                  'peer-aria-checked:bg-red-500 peer-aria-checked:border-red-500 dark:border-gray-600 dark:peer-aria-checked:bg-red-500 dark:peer-aria-checked:border-red-500':
                    optionValue < 0,
                  'peer-aria-checked:bg-gray-500 peer-aria-checked:border-gray-500 dark:border-gray-600 dark:peer-aria-checked:bg-gray-500 dark:peer-aria-checked:border-gray-500':
                    optionValue === 0,
                  'peer-aria-checked:bg-green-500 peer-aria-checked:border-green-500 dark:border-gray-600 dark:peer-aria-checked:bg-green-500 dark:peer-aria-checked:border-green-500':
                    optionValue > 0,
                },
              )}
            >
              {optionValue < 0 && (
                <ThumbsDownIcon className="w-4 h-4 text-white" />
              )}
              {optionValue === 0 && (
                <MinusIcon className="w-4 h-4 text-white" />
              )}
              {optionValue > 0 && (
                <ThumbsUpIcon className="w-4 h-4 text-white" />
              )}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {option.label}
            </span>
          </Label>
        );
      })}
    </RadioGroup>
  );
}
