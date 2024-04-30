import type React from 'react';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import z from 'astro/zod';
import { Label } from '../../../components/ui/label.tsx';
import { Button } from '../../../components/ui/button.tsx';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../../../components/ui/select.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog.tsx';
import { Textarea } from '../../../components/ui/textarea.tsx';
import { Input } from '../../../components/ui/input.tsx';
import {
  ProposalFormError,
  ProposalFormFetchError,
} from '../../../components/ProposalFormErrors.tsx';
import type { Proposal } from './types.ts';
import { useUser } from '../../auth/hooks.ts';
import { createApiClient, schemas, sdk } from '../../../sdk.ts';
import { Form } from '../../../components/ui/form.tsx';

// <DialogContent className="max-w-max min-w-min max-h-[90%] overflow-scroll p-0 mx-0 my-0">

const dataSchema = z
  .instanceof(FormData)
  .transform((data) => ({
    title: data.get('title'),
    summary: data.get('summary'),
    description: data.get('description'),
    type: data.get('type') as 'topic' | 'project',
  }))
  .pipe(
    z.object({
      title: z.string().min(8),
      summary: z.string().min(8),
      description: z.string().min(8),
      type: z.union([z.literal('topic'), z.literal('project')]),
    }),
  );

export default function AddProposalButton() {
  const [isDraft, setIsDraft] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useUser();

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
      try {
        const url = 'https://vote.tulsawebdevs.org/proposals';
        const form = event.currentTarget;
        const data = dataSchema.parse(new FormData(form));

        const proposal = {
          ...data,
          status: isDraft ? 'draft' : 'open',
          authorId: user?.id ?? '0',
          authorName: user?.fullName ?? 'Anonymous', // TODO: remove fallback
          authorEmail:
            user?.primaryEmailAddress?.emailAddress ??
            'tulsawebdevs@techlahoma.org',
        } satisfies Omit<Proposal, 'id' | 'created' | 'updated'>;

        const result = fetch(url, {
          method: 'POST',
          body: JSON.stringify(proposal),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          if (response.status === 201) return form.reset();
          throw new ProposalFormError(response);
        });

        toast.promise(result, {
          loading: isDraft ? 'Saving draft...' : 'Submitting proposal...',
          success: isDraft ? 'Draft Saved' : 'Proposal Submitted!',
          error(error) {
            return error instanceof TypeError ?
                new ProposalFormFetchError().render()
              : new ProposalFormError(error).render();
          },
        });
      } catch (error) {
        toast.error(new ProposalFormError(error).render());
      } finally {
        setLoading(false);
      }
    },
    [
      isDraft,
      user?.fullName,
      user?.id,
      user?.primaryEmailAddress?.emailAddress,
    ],
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Add Proposal
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit a Proposal</DialogTitle>
          <DialogDescription>
            Share your ideas for topics or projects to discuss at our next
            meetup.
          </DialogDescription>
        </DialogHeader>
        <Form handleSubmit={((onValid) => {}, (onerror) => {})}>
          <div className="space-y-4" id="proposalForm" onSubmit={onSubmit}>
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
            <DialogFooter className="flex justify-end p-2">
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
            </DialogFooter>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
