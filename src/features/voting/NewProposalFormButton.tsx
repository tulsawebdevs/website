/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import z from 'astro/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button.tsx';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog.tsx';
import { Textarea } from '../ui/textarea.tsx';
import { Input } from '../ui/input.tsx';
import {
  ProposalFormError,
  ProposalFormFetchError,
} from './NewProposalFormErrors.tsx';
import { useSession } from '../auth/hooks.ts';
import { schemas, sdk } from '../../sdk.ts';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../ui/form.tsx';

export const postProposalSchema = schemas.Proposal.and(schemas.AuthorData);
export type PostProposalData = z.infer<typeof postProposalSchema>;

export default function AddProposalButton() {
  const session = useSession();
  const [loading, setLoading] = useState(false);

  const form = useForm<PostProposalData>({
    resolver: zodResolver(postProposalSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (form.formState.isSubmitting) setLoading(true);
    return () => setLoading(false);
  }, [form.formState.isSubmitting]);

  useEffect(() => {
    if (!session) return;
    const { user } = session;
    const name = user.fullName ?? [user.firstName, user.lastName].join(' ');
    form.setValue('authorId', user.id);
    form.setValue('authorEmail', user.primaryEmailAddress.emailAddress);
    form.setValue('authorName', name);
  }, [form, session]);

  const submit = form.handleSubmit(
    async (data, event) => {
      event?.preventDefault();
      return sdk.postProposals(data, {
        headers: { Authorization: `Bearer: ${await session?.getToken()}` },
      });
    },
    (errors) => {
      throw new ProposalFormError(
        Object.entries(errors).map(
          ([key, { message }]) => `Invalid ${key}: ${message}`,
        ),
      );
    },
  );

  const success = useCallback(() => {
    const isDraft = form.getValues('status') === 'draft';
    form.reset({
      authorEmail: form.getValues('authorEmail'),
      authorName: form.getValues('authorName'),
      authorId: form.getValues('authorId'),
      description: '',
      summary: '',
      title: '',
      type: '' as 'topic' | 'project',
    });
    return isDraft ? 'Draft Saved' : 'Proposal Submitted!';
  }, [form]);

  const error = useCallback(
    (err: unknown) =>
      err instanceof TypeError ?
        new ProposalFormFetchError().render()
      : new ProposalFormError(err).render(),
    [],
  );

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      toast.promise(submit(event), {
        success,
        error,
        loading:
          form.getValues('status') === 'draft' ?
            'Saving draft...'
          : 'Submitting proposal...',
      });
    },
    [error, form, submit, success],
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
        <Form {...form}>
          <form className="space-y-4" id="proposalForm" onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Proposal Title"
                      defaultValue=""
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select
                      defaultOpen={false}
                      onValueChange={field.onChange}
                      defaultValue=""
                      {...field}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type" {...field} />
                      </SelectTrigger>
                      <SelectContent id="type">
                        <SelectItem value="topic">Topic</SelectItem>
                        <SelectItem value="project">Project</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Briefly describe your proposal"
                      defaultValue=""
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide more details about your proposal"
                      defaultValue=""
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-end p-2">
              <Button
                className="mr-2"
                type="submit"
                name="status-draft"
                variant="outline"
                onClick={() => form.setValue('status', 'draft')}
                disabled={loading}
                busy={form.getValues('status') === 'draft' && loading}
              >
                Save Draft
              </Button>
              <Button
                name="status-open"
                type="submit"
                variant="default"
                onClick={() => form.setValue('status', 'open')}
                disabled={loading}
                busy={form.getValues('status') === 'open' && loading}
              >
                Submit Proposal
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
