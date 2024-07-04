import { Label } from '@radix-ui/react-label';
import { MinusIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group.tsx';
import { cn } from '../ui/utils.ts';

import { type Vote } from '../../sdk.ts';

const voteOptions = [
  {
    label: 'Strong Disinterest',
    value: -2,
    id: 'vote-strong-disinterest',
  },
  {
    label: 'Slight Disinterest',
    value: -1,
    id: 'vote-slight-disinterest',
  },
  { label: 'Neutral', value: 0, id: 'vote-neutral' },
  { label: 'Slight Interest', value: 1, id: 'vote-slight-interest' },
  { label: 'Strong Interest', value: 2, id: 'vote-strong-interest' },
] as const;

type ProposalInterestVoteProps = {
  proposalId: number;
  disabled?: boolean;
  onVoteChange: (vote: Vote) => void;
  vote: Vote | undefined;
};

export default function ProposalInterestVote(props: ProposalInterestVoteProps) {
  return (
    <RadioGroup
      aria-label="Vote"
      className="flex flex-row place-content-center gap-2"
      value={`${props.vote?.value}`}
      disabled={props.disabled}
      onValueChange={(value: `${Vote['value']}`) =>
        props.onVoteChange({
          ...(props.vote ?? {}),
          value: parseInt(value, 10) as Vote['value'],
        })
      }
    >
      {voteOptions.map(({ label, value, id }) => (
        <Label
          key={`${props.proposalId}-${id}`}
          className={cn(
            'flex flex-col gap-2 text-center items-center w-[20%]',
            { 'cursor-pointer': !props.disabled },
          )}
          htmlFor={`${props.proposalId}-${id}`}
        >
          <RadioGroupItem
            className="peer sr-only"
            id={`${props.proposalId}-${id}`}
            value={`${value}`}
            disabled={props.disabled}
          />
          <div
            className={cn(
              'p-0.5 w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-400',
              {
                'peer-aria-checked:bg-red-500 peer-aria-checked:border-red-500 dark:border-gray-600 dark:peer-aria-checked:bg-red-500 dark:peer-aria-checked:border-red-500':
                  [-2, -1].includes(value),
                'peer-aria-checked:bg-gray-500 peer-aria-checked:border-gray-500 dark:border-gray-600 dark:peer-aria-checked:bg-gray-500 dark:peer-aria-checked:border-gray-500':
                  value === 0,
                'peer-aria-checked:bg-green-500 peer-aria-checked:border-green-500 dark:border-gray-600 dark:peer-aria-checked:bg-green-500 dark:peer-aria-checked:border-green-500':
                  [1, 2].includes(value),
              },
            )}
          >
            {value === 0 && <MinusIcon className="w-4 h-4 text-white" />}
            {[-2, -1].includes(value) && (
              <ThumbsDownIcon className="w-4 h-4 text-white" />
            )}
            {[1, 2].includes(value) && (
              <ThumbsUpIcon className="w-4 h-4 text-white" />
            )}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {label}
          </span>
        </Label>
      ))}
    </RadioGroup>
  );
}
