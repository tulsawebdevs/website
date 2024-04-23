/**
 * v0 by Vercel.
 * @see https://v0.dev/t/G4ftnlAGIX0
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
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
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Proposal Title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
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
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide more details about your proposal"
                required
              />
            </div>
            <div className="flex justify-end">
              <Button className="mr-2" type="submit" variant="outline">
                Save Draft
              </Button>
              <Button type="submit" variant="default">
                Submit Proposal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
