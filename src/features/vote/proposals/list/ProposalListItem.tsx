import { useMemo } from 'react';
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

export type ProposalListItemProps = {
  proposal: Proposal;
};

export type Vote =
  | '-2' // Strongly Disinterested
  | '-1' // Slightly Disinterested
  | '0' // Neutral
  | '1' // Slightly Interested
  | '2'; // Strongly Interested

export type VotePayload = {
  initiativeId: string;
  vote: Vote;
  comment: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
};

export default function ProposalListItem({ proposal }: ProposalListItemProps) {
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

  const numberUpvotes = 72; // TODO: Replace with actual data
  const numberDownvotes = 18; // TODO: Replace with actual data

  const handleInterestVote = (value: Vote) => {
    const votePayload: VotePayload = {
      initiativeId: proposal.id.toString(10),
      vote: value,
      comment: '',
      authorId: '1234', // TODO: Replace with auth data
      authorName: proposal.authorName,
      authorEmail: '', // TODO: Replace with auth data
    };

    console.log('cast vote', votePayload);

    fetch(`https://api.tulsawebdevs.org/proposals/${proposal.id}/vote`, {
      credentials: 'include',
      headers: {
        Authorization: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // TODO: Add auth token
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(votePayload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('do something with data', data);
      })
      .catch((error) => {
        // TODO: Handle inability to cast vote
        console.error(error);
      });
  };

  // TODO: Implement like vote functionality. What API to call?
  const handleLikeVote = (type: 'up' | 'down') => {
    console.log('handle like vote', type);
  };

  return (
    <Card>
      <CardHeader className="pb-0 pt-6 flex flex-row justify-between">
        <CardTitle className="content-center">{proposal.title}</CardTitle>

        <ProposalLikeButtons
          handleLikeVote={handleLikeVote}
          numberUpvotes={numberUpvotes}
          numberDownvotes={numberDownvotes}
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
                Proposed {proposedDate} at {proposedTime} by{' '}
              </div>
            </div>
          </div>

          <CardDescription className="py-4">
            {proposal.description}
          </CardDescription>
        </div>

        <div>
          <ProposalInterestVote onVoteSelect={handleInterestVote} />
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

function ProposalInterestVote({
  onVoteSelect,
}: {
  onVoteSelect: (vote: Vote) => void;
}) {
  return (
    <RadioGroup
      aria-label="Vote"
      className="flex flex-col md:flex-row md:items-center gap-2"
      defaultValue="0" // TODO: Replace with user's selected vote
      onValueChange={onVoteSelect}
    >
      {voteOptions.map((option) => {
        const value = parseInt(option.value, 10);

        return (
          <Label
            key={option.id}
            className="flex items-center gap-2 cursor-pointer"
            htmlFor={option.id}
          >
            <RadioGroupItem
              className="peer sr-only"
              id={option.id}
              value={option.value}
            />
            <div
              className={cn(
                'p-0.5 w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-400',
                {
                  'peer-aria-checked:bg-red-500 peer-aria-checked:border-red-500 dark:border-gray-600 dark:peer-aria-checked:bg-red-500 dark:peer-aria-checked:border-red-500':
                    value < 0,
                  'peer-aria-checked:bg-gray-500 peer-aria-checked:border-gray-500 dark:border-gray-600 dark:peer-aria-checked:bg-gray-500 dark:peer-aria-checked:border-gray-500':
                    value === 0,
                  'peer-aria-checked:bg-green-500 peer-aria-checked:border-green-500 dark:border-gray-600 dark:peer-aria-checked:bg-green-500 dark:peer-aria-checked:border-green-500':
                    value > 0,
                },
              )}
            >
              {value < 0 && <ThumbsDownIcon className="w-4 h-4 text-white" />}
              {value === 0 && <MinusIcon className="w-4 h-4 text-white" />}
              {value > 0 && <ThumbsUpIcon className="w-4 h-4 text-white" />}
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
  numberUpvotes: number;
  numberDownvotes: number;
};

function ProposalLikeButtons({
  handleLikeVote,
  numberUpvotes,
  numberDownvotes,
}: ProposalLikeButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button size="sm" variant="outline" onClick={() => handleLikeVote('up')}>
        <ThumbsUpIcon className="w-5 h-5 text-green-500 mr-1" />
        <span className="text-green-500 font-medium">{numberUpvotes}</span>
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={() => handleLikeVote('down')}
      >
        <ThumbsDownIcon className="w-5 h-5 text-red-500 mr-1" />
        <span className="text-red-500 font-medium">{numberDownvotes}</span>
      </Button>
    </div>
  );
}
