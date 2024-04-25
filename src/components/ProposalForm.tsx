/**
 * v0 by Vercel.
 * @see https://v0.dev/t/G4ftnlAGIX0
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import React from 'react';
import { useCallback } from 'react';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
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

export default function ProposalForm() {
  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = 'https://api.tulsawebdevs.org/proposals';
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    console.log('target:', event.target)

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

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(proposal),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('response:', response);
        if (response.status === 201) return formElement.reset();
        if (response.status === 401) throw new Error('Unauthorized');
        if (response.status === 500) throw new Error('Server Error');
        throw new Error('Unknown Error');
      })
      .catch((error) => {
        console.error('There was a problem with your fetch operation:', error);
      });
  }, []);

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
                  pattern=".+@.+"
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
              <Select defaultValue="topic" defaultOpen={false}>
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
            <div className="flex justify-end">
              <Button
                className="mr-2"
                type="submit"
                name="status-draft"
                variant="outline"
              >
                Save Draft
              </Button>
              <Button name="status-open" type="submit" variant="default">
                Submit Proposal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
