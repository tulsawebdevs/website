import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Label } from '@radix-ui/react-label';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { ThumbsUpIcon, ThumbsDownIcon, MinusIcon } from 'lucide-react';
import { CardHeader, CardContent, Card } from './ui/card.tsx';

export type ProposalVoteCardProps = {
  author?: string;
  title: string;
  description: string;
  created: string;
};

export function ProposalVoteCard(props: ProposalVoteCardProps) {
  return (
    <Card>
      <CardHeader className="pb-0 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold dark:text-gray-200">
              {props.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {props.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUpIcon className="w-5 h-5 text-green-500" />
            <span className="text-green-500 font-medium">72</span>
            <ThumbsDownIcon className="w-5 h-5 text-red-500" />
            <span className="text-red-500 font-medium">18</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-start justify-between gap-6">
        <div className="flex items-center gap-1 py-0">
          <Avatar className="w-8 h-8">
            <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {`Proposed ${new Date(props.created).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })} at ${new Date(props.created).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })} by `}
            <span className="font-bold dark:text-gray-200">
              {props.author ?? 'Anonymous'}
            </span>
          </div>
        </div>
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
