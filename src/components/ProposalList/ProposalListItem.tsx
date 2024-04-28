import { Label } from '@radix-ui/react-label';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { ThumbsUpIcon, ThumbsDownIcon, MinusIcon } from 'lucide-react';
import {
  CardHeader,
  CardContent,
  Card,
  CardTitle,
  CardDescription,
} from '../ui/card.tsx';
import type { Proposal } from '../../types/proposal.ts';

export type Props = {
  proposal: Proposal;
};

export default function ProposalListItem({ proposal }: Props) {
  return (
    <Card>
      <CardHeader className="pb-0 pt-6">
        <CardTitle className="flex justify-between">
          {proposal.title}

          <div className="flex items-center gap-2">
            <ThumbsUpIcon className="w-5 h-5 text-green-500" />
            <span className="text-green-500 font-medium">72</span>
            <ThumbsDownIcon className="w-5 h-5 text-red-500" />
            <span className="text-red-500 font-medium">18</span>
          </div>
        </CardTitle>
        <CardDescription>
          Proposed{' '}
          {new Date(proposal.created).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}{' '}
          at{' '}
          {new Date(proposal.created).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}{' '}
          by{' '}
          <span className="font-bold dark:text-gray-200">
            {proposal.authorName ?? 'Anonymous'}
          </span>
        </CardDescription>
        <CardDescription>{proposal.description}</CardDescription>
      </CardHeader>

      <CardContent className="my-3">
        <div className="flex items-center gap-2">
          <RadioGroup
            aria-label="Vote"
            className="flex items-center gap-2"
            defaultValue="0"
          >
            <Label
              className="flex items-center gap-2 cursor-pointer"
              htmlFor="vote-strongly-disinterested"
            >
              <RadioGroupItem
                className="peer sr-only"
                id="vote-strongly-disinterested"
                value="-2"
              />
              <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 peer-checked:bg-red-500 peer-checked:border-red-500 dark:border-gray-600 dark:peer-checked:bg-red-500 dark:peer-checked:border-red-500">
                <ThumbsDownIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Strongly Disinterested
              </span>
            </Label>
            <Label
              className="flex items-center gap-2 cursor-pointer"
              htmlFor="vote-slightly-disinterested"
            >
              <RadioGroupItem
                className="peer sr-only"
                id="vote-slightly-disinterested"
                value="-1"
              />
              <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 peer-checked:bg-red-500 peer-checked:border-red-500 dark:border-gray-600 dark:peer-checked:bg-red-500 dark:peer-checked:border-red-500">
                <ThumbsDownIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Slightly Disinterested
              </span>
            </Label>
            <Label
              className="flex items-center gap-2 cursor-pointer"
              htmlFor="vote-neutral"
            >
              <RadioGroupItem
                className="peer sr-only"
                id="vote-neutral"
                value="0"
              />
              <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 peer-checked:bg-gray-500 peer-checked:border-gray-500 dark:border-gray-600 dark:peer-checked:bg-gray-500 dark:peer-checked:border-gray-500">
                <MinusIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Neutral
              </span>
            </Label>
            <Label
              className="flex items-center gap-2 cursor-pointer"
              htmlFor="vote-slightly-interested"
            >
              <RadioGroupItem
                className="peer sr-only"
                id="vote-slightly-interested"
                value="1"
              />
              <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 peer-checked:bg-green-500 peer-checked:border-green-500 dark:border-gray-600 dark:peer-checked:bg-green-500 dark:peer-checked:border-green-500">
                <ThumbsUpIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Slightly Interested
              </span>
            </Label>
            <Label
              className="flex items-center gap-2 cursor-pointer"
              htmlFor="vote-strongly-interested"
            >
              <RadioGroupItem
                className="peer sr-only"
                id="vote-strongly-interested"
                value="2"
              />
              <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 peer-checked:bg-green-500 peer-checked:border-green-500 dark:border-gray-600 dark:peer-checked:bg-green-500 dark:peer-checked:border-green-500">
                <ThumbsUpIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Strongly Interested
              </span>
            </Label>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
