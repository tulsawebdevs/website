/**
 * v0 by Vercel.
 * @see https://v0.dev/t/G4ftnlAGIX0
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import type React from 'react';
import { useCallback, useState } from 'react';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from './ui/card.tsx';
import { Label } from './ui/label.tsx';
import { Input } from './ui/input.tsx';
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from './ui/select.tsx';
import { Textarea } from './ui/textarea.tsx';
import { Button } from './ui/button.tsx';

import {
  ProposalForm401Error,
  ProposalForm500Error,
  ProposalFormError,
  ProposalFormFetchError,
  ProposalFormUnknownError,
} from './ProposalFormErrors.tsx';
import { useErrorToast } from '../features/errors.tsx';

export type Proposal = {
  status: 'draft' | 'open'; // | 'rfc'
  authorId: string;
  authorName: string;
  authorEmail: string;
  title: string;
  summary: string;
  description: string;
  type: 'topic' | 'project';
};

// TODO: Replace `card` components with `dialogue` components

export default function ProposalForm() {
  const [isDraft, setIsDraft] = useState(false);
  const [loading, setLoading] = useState(false);
  const toss = useErrorToast();

  const onDraftButtonClick = useCallback(() => {
    setIsDraft(true);
  }, [setIsDraft]);

  const onSubmitButtonClick = useCallback(() => {
    setIsDraft(false);
  }, [setIsDraft]);

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      setLoading(true);
      event.preventDefault();

      const url = 'https://vote.tulsawebdevs.org/proposals';
      const formElement = event.currentTarget;
      const formData = new FormData(formElement);

      const proposal: Proposal = {
        status: isDraft ? 'draft' : 'open',
        authorId: '1',
        authorName: formData.get('authorName') as string,
        authorEmail: formData.get('authorEmail') as string,
        title: formData.get('title') as string,
        summary: formData.get('summary') as string,
        description: formData.get('description') as string,
        type: formData.get('type') as Proposal['type'],
      };

      void fetch(url, {
        method: 'POST',
        body: JSON.stringify(proposal),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.status === 201) return formElement.reset();
          if (response.status === 401) throw new ProposalForm401Error();
          if (response.status === 500) throw new ProposalForm500Error();
          throw new ProposalFormUnknownError();
        })
        .catch((err) => {
          if (err instanceof ProposalFormError) return err;
          if (err instanceof TypeError) return new ProposalFormFetchError();
          return new ProposalFormUnknownError(
            err instanceof Error ? err.message : undefined,
          );
        })
        .then((err) => {
          if (err) toss({ title: err.message, description: err.displayText });
          setLoading(false);
        });
    },
    [isDraft, toss],
  );

  return (
    <div key="1" className="container mx-auto max-w-2xl py-12">
      <Card>
        <CardHeader>
          <CardTitle>Submit a Proposal</CardTitle>
          <CardDescription>
            Share your ideas for topics or projects to discuss at our next
            meetup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" id="proposalForm" onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your Name"
                  type="text"
                  name="authorName"
                  required
                  minLength={6}
                />
              </div>
              <div id="email-field" className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="authorEmail"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Proposal Title"
                required
                minLength={6}
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select required name="type" defaultOpen={false}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" defaultValue="topic" />
                </SelectTrigger>
                <SelectContent id="type">
                  <SelectItem value="topic">Topic</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                placeholder="Briefly describe your proposal"
                name="summary"
                required
                minLength={6}
                rows={3}
                maxLength={200}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide more details about your proposal"
                required
                name="description"
                minLength={6}
                rows={5}
                maxLength={200}
              />
            </div>
            <CardFooter className="flex justify-end p-2">
              <Button
                className="mr-2"
                type="submit"
                name="status-draft"
                variant="outline"
                onClick={onDraftButtonClick}
                disabled={loading}
                busy={isDraft && loading}
              >
                Save Draft
              </Button>
              <Button
                name="status-open"
                type="submit"
                variant="default"
                onClick={onSubmitButtonClick}
                disabled={loading}
                busy={!isDraft && loading}
              >
                Submit Proposal
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
