import { useMemo, useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { ThumbsUpIcon, ThumbsDownIcon, MinusIcon } from 'lucide-react';
import {
  CardHeader,
  CardContent,
  Card,
  CardTitle,
  CardDescription,
} from '../../../../components/ui/card.tsx';
import {
  RadioGroup,
  RadioGroupItem,
} from '../../../../components/ui/radio-group.tsx';
import type { Proposal } from '../../../../types/proposal.ts';
import { cn } from '../../../../utils.ts';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../../components/ui/avatar.tsx';
import { Button } from '../../../../components/ui/button.tsx';
import ProposalStatus from './ProposalStatus.tsx';
import type { Vote, VotePayload } from '../types.ts';
import { voteForProposal } from '../services/proposal.ts';
import { useErrorToast } from '../../../errors.tsx';

export type ProposalListItemProps = {
  proposal: Proposal;
};

export default function ProposalListItem({ proposal }: ProposalListItemProps) {
  const [loading, setLoading] = useState(false);
  const [voteValue, setVoteValue] = useState<Vote>('0');
  const isOpen = proposal.status === 'open';
  const isDisabled = loading || !isOpen;
  const proposedDate = new Date(proposal.created).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const proposedTime = new Date(proposal.created).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const { authorName } = proposal;
  const displayName = useMemo(() => {
    if (authorName) {
      return authorName.slice(0, 2);
    }

    return 'A';
  }, [authorName]);

  const numberUpvotes = useMemo(() => {
    // if status is not open, return total number of votes
    if (!isOpen) {
      return 72; // TODO: Replace with actual vote total
    }
    // if status is open, only show the user's votes
    // and if vote is below zero return 0 for postive votes
    const userVote = parseInt(voteValue, 10);

    return userVote > 0 ? voteValue : 0;
  }, [voteValue, isOpen]);
  const numberDownvotes = useMemo(() => {
    // if status is not open, return total number of votes
    if (!isOpen) {
      return 18; // TODO: Replace with actual vote total
    }
    // if status is open, only show the user's votes
    // and if vote is above zero return 0 for negative votes
    const userVote = parseInt(voteValue, 10);

    return userVote < 0 ? voteValue : 0;
  }, [voteValue, isOpen]);
  const errorToast = useErrorToast();

  const handleInterestVote = (value: Vote) => {
    const votePayload: VotePayload = {
      initiativeId: proposal.id.toString(10),
      vote: value,
      comment: '',
      authorId: proposal.authorId,
      authorName: proposal.authorName,
      authorEmail: proposal.authorEmail,
    };

    setLoading(true);
    setVoteValue(value);
    voteForProposal(votePayload)
      .catch((error) => {
        console.error(error);
        errorToast({
          title: 'Unable to Vote',
          description: 'Could not cast vote. Please try again.',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLikeVote = (type: 'up' | 'down') => {
    let currentVoteValue = parseInt(voteValue, 10);

    if (type === 'up') {
      currentVoteValue = Math.min(2, currentVoteValue + 1);
    } else {
      currentVoteValue = Math.max(-2, currentVoteValue - 1);
    }

    handleInterestVote(currentVoteValue.toString() as Vote);
  };

  return (
    <Card>
      <CardHeader className="pb-0 pt-6 flex flex-row justify-between">
        <CardTitle className="content-center">{proposal.title}</CardTitle>

        <ProposalLikeButtons
          handleLikeVote={handleLikeVote}
          numberUpvotes={numberUpvotes}
          numberDownvotes={numberDownvotes}
          disabled={isDisabled}
        />
      </CardHeader>

      <CardContent className="my-3">
        <div className="mb-2">
          <div className="flex space-x-2 mb-2">
            <Avatar className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-200">
              <AvatarImage
                alt="avatar"
                src="http://placedog.net/100/100?50"
                className="w-full h-full object-cover rounded-full"
              />
              <AvatarFallback className="capitalize">
                {displayName}
              </AvatarFallback>
            </Avatar>

            <div>
              <div className="font-bold dark:text-gray-200">
                {proposal.authorName}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 content-center">
                Proposed {proposedDate} at {proposedTime}
              </div>
              <div>
                <ProposalStatus status={proposal.status} />
              </div>
            </div>
          </div>

          <CardDescription className="py-4">
            {proposal.description}
          </CardDescription>
        </div>

        <div>
          <ProposalInterestVote
            proposal={proposal}
            onVoteSelect={handleInterestVote}
            disabled={isDisabled}
            value={voteValue}
          />
        </div>
      </CardContent>
    </Card>
  );
}

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
  onVoteSelect: (vote: Vote) => void;
  value: Vote;
};

function ProposalInterestVote({
  proposal,
  disabled = false,
  onVoteSelect,
  value,
}: ProposalInterestVoteProps) {
  return (
    <RadioGroup
      aria-label="Vote"
      className="flex flex-col md:flex-row md:items-center gap-2"
      value={value}
      onValueChange={onVoteSelect}
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

type ProposalLikeButtonsProps = {
  handleLikeVote: (type: 'up' | 'down') => void;
  numberUpvotes: number | string;
  numberDownvotes: number | string;
  disabled?: boolean;
};

function ProposalLikeButtons({
  handleLikeVote,
  numberUpvotes,
  numberDownvotes,
  disabled = false,
}: ProposalLikeButtonsProps) {
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
