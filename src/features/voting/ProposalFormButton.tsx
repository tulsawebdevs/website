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
} from '../ui/dialog.tsx';
import { Textarea } from '../ui/textarea.tsx';
import { Input } from '../ui/input.tsx';
import {
  ProposalFormError,
  ProposalFormFetchError,
} from './ProposalFormErrors.tsx';
import { useSession } from '../auth/hooks.ts';
import { schemas, sdk } from '../../sdk.ts';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../ui/form.tsx';
import { ProtectedTrigger } from '../auth/components.tsx';

const formSchema = z.union([
  z.object({ isDraft: z.literal(true) }).and(schemas.Draft),
  z.object({ isDraft: z.literal(false) }).and(schemas.Proposal),
]);

export default function AddProposalButton({
  prefill = {},
  renderTrigger = () => (
    <Button size="sm" variant="outline">
      New Proposal
    </Button>
  ),
}: {
  prefill?: Partial<z.infer<typeof formSchema>>;
  renderTrigger?: () => React.JSX.Element;
}) {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: { ...prefill, isDraft: true },
  });

  useEffect(() => {
    if (form.formState.isSubmitting) setLoading(true);
    return () => setLoading(false);
  }, [form.formState.isSubmitting]);

  const submit = form.handleSubmit(
    async ({ isDraft, ...data }, event) => {
      event?.preventDefault();
      const path = isDraft ? '/drafts' : '/proposals';
      const headers = { Authorization: `Bearer ${await session?.getToken()}` };
      return sdk.post(path, data, { headers });
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
    const isDraft = form.getValues('isDraft');
    form.reset({
      description: '',
      summary: '',
      title: '',
      type: undefined,
      isDraft: true,
    });

    // Stay open after draft submit, in case the user wants to create another
    if (!isDraft) setOpen(false);

    return isDraft ? 'Draft Saved' : 'Proposal Submitted!';
  }, [form, setOpen]);

  const error = useCallback(
    (err: unknown) => {
      form.reset({ ...form.getValues(), isDraft: true });

      return err instanceof TypeError ?
          new ProposalFormFetchError().render()
        : new ProposalFormError(err).render();
    },
    [form],
  );

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      toast.promise(submit(event), {
        success,
        error,
        loading:
          form.getValues('isDraft') ? 'Saving draft...' : 'Submitting...',
      });
    },
    [error, form, submit, success],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <ProtectedTrigger type="dialog">{renderTrigger()}</ProtectedTrigger>

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
              {
                // TODO: Disabled until the Drafts UI is completed
                /* <Button
                className="mr-2"
                type="submit"
                name="status-draft"
                variant="outline"
                onClick={() => form.setValue('isDraft', true)}
                disabled={loading}
                busy={form.getValues('isDraft') && loading}
              >
                Save Draft
              </Button> */
              }
              <Button
                name="status-open"
                type="submit"
                variant="default"
                onClick={() => form.setValue('isDraft', false)}
                disabled={loading}
                busy={!form.getValues('isDraft') && loading}
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
