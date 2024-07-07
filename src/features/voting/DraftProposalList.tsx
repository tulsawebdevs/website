import type React from 'react';
import { toast } from 'sonner';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { ListOrderedIcon, FilePenIcon, TrashIcon } from 'lucide-react';
import { Input } from '../ui/input.tsx';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu.tsx';
import { Button } from '../ui/button.tsx';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../ui/table.tsx';
import { Checkbox } from '../ui/checkbox.tsx';
import { sdk, type DraftIndex, type Paginated } from '../../sdk.ts';
import { useSession } from '../auth/hooks.ts';
import ProposalFormButton from './ProposalFormButton.tsx';

const limit = 10;

export default function DraftProposalList() {
  const session = useSession();

  const [search, setSearch] = useState('');
  const [selectedSubmissions, setSelectedSubmissions] = useState<number[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [drafts, setDrafts] = useState<DraftIndex['drafts']>([]);
  const [cursor, setCursor] = useState<DraftIndex['cursor']>();
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState({ key: 'title', order: 'asc' } as {
    key: 'title' | 'created' | 'updated';
    order: 'asc' | 'desc';
  });

  const load = useCallback(
    async (pagination: Paginated) => {
      setLoading(true);
      try {
        const token = await session?.getToken();
        const result = await sdk.listDrafts({
          queries: { pagination },
          headers: { Authorization: `Bearer ${token}` },
        });
        setCursor(result.cursor);
        setDrafts((previous) => [...previous, ...result.drafts]);
      } finally {
        setLoading(false);
      }
    },
    [session],
  );

  const submissions = useMemo(
    () =>
      drafts
        .filter((submission) => {
          const searchValue = search.toLowerCase();
          return (
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            submission.title?.toLowerCase().includes(searchValue) ||
            submission.created.toLowerCase().includes(searchValue) ||
            submission.updated?.toLowerCase().includes(searchValue)
          );
        })
        .sort((a, b) => {
          if (sort.order === 'asc') {
            return (a[sort.key] ?? 0) > (b[sort.key] ?? 0) ? 1 : -1;
          }

          return (a[sort.key] ?? 0) < (b[sort.key] ?? 0) ? 1 : -1;
        }),
    [drafts, search, sort.key, sort.order],
  );

  const handleSearch = (err: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(err.target.value);

  const handleSort = (key: 'title' | 'created' | 'updated') => {
    if (sort.key === key) {
      setSort({ key, order: sort.order === 'asc' ? 'desc' : 'asc' });
    } else {
      setSort({ key, order: 'asc' });
    }
  };

  const handleSelect = (id: number) => {
    if (selectedSubmissions.includes(id)) {
      setSelectedSubmissions(selectedSubmissions.filter((s) => s !== id));
    } else {
      setSelectedSubmissions([...selectedSubmissions, id]);
    }
    setShowBulkActions(selectedSubmissions.length > 0);
  };

  const handleSelectAll = () => {
    if (
      selectedSubmissions.length === 0 ||
      selectedSubmissions.length < submissions.length
    ) {
      setSelectedSubmissions(submissions.map((s) => s.id));
    } else {
      setSelectedSubmissions([]);
    }
  };

  const onScroll = useCallback(() => {
    const scrolledTo = window.scrollY + window.innerHeight;
    const threshold = 300;
    const isNearBottom = document.body.scrollHeight - threshold <= scrolledTo;

    if (loading || !cursor || !isNearBottom) return;
    toast.promise(load({ cursor, limit }), {
      loading: 'Loading more submissions...',
      success: 'Loaded more submissions',
      error: 'Failed to load more submissions',
    });
  }, [cursor, load, loading]);

  const destroy = useCallback(
    async (id: number) => {
      const token = await session?.getToken();
      setLoading(true);
      try {
        await sdk.deleteDraft(undefined, {
          headers: { Authorization: `Bearer ${token}` },
          queries: { recordId: id },
        });
        setDrafts((previous) => previous.filter((d) => d.id !== id));
      } finally {
        setLoading(false);
      }
    },
    [session],
  );

  const handleBulkDelete = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to delete these drafts?')) {
      selectedSubmissions.forEach((item) =>
        toast.promise(destroy(item), {
          loading: 'Deleting draft...',
          success: 'Draft deleted',
          error: 'Failed to delete draft',
        }),
      );
      setShowBulkActions(false);
    }
  };

  useEffect(() => {
    void load({ limit });
  }, [load]);

  useEffect(() => {
    setShowBulkActions(selectedSubmissions.length > 0);
  }, [selectedSubmissions]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Draft Submissions</h1>
        <div className="flex items-center gap-2">
          {showBulkActions && (
            <Button variant="destructive" onClick={handleBulkDelete}>
              Delete
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <ListOrderedIcon className="h-4 w-4" />
                <span>Sort By</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuRadioGroup
                value={sort.key}
                onValueChange={(value) =>
                  handleSort(value as 'title' | 'created' | 'updated')
                }
              >
                <DropdownMenuRadioItem value="name">
                  Title
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="date">
                  Created
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="updated">
                  Updated
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={sort.order}
                onValueChange={(order) =>
                  setSort({ key: sort.key, order: order as 'asc' | 'desc' })
                }
              >
                <DropdownMenuRadioItem value="asc">
                  Ascending
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="desc">
                  Descending
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            placeholder="Search submissions..."
            value={search}
            onChange={handleSearch}
            className="bg-white dark:bg-gray-950"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Table>
          <TableHeader>
            <TableRow className="sticky top-0 bg-white dark:bg-gray-950">
              <TableHead>
                <Checkbox
                  checked={
                    // eslint-disable-next-line no-nested-ternary
                    selectedSubmissions.length === 0 ? false
                    : selectedSubmissions.length === submissions.length ?
                      true
                    : 'indeterminate'
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead onClick={() => handleSort('title')}>
                Title
                {sort.key === 'title' && (
                  <span className="ml-1">
                    {sort.order === 'asc' ? '\u2191' : '\u2193'}
                  </span>
                )}
              </TableHead>
              <TableHead onClick={() => handleSort('created')}>
                Created
                {sort.key === 'created' && (
                  <span className="ml-1">
                    {sort.order === 'asc' ? '\u2191' : '\u2193'}
                  </span>
                )}
              </TableHead>
              <TableHead onClick={() => handleSort('updated')}>
                Updated
                {sort.key === 'updated' && (
                  <span className="ml-1">
                    {sort.order === 'asc' ? '\u2191' : '\u2193'}
                  </span>
                )}
              </TableHead>
              <TableHead className="self-stretch">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-auto" onScroll={onScroll}>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedSubmissions.includes(submission.id)}
                    onCheckedChange={() => handleSelect(submission.id)}
                  />
                </TableCell>
                <TableCell>{submission.title}</TableCell>
                <TableCell>
                  {new Date(submission.created).toLocaleString()}
                </TableCell>{' '}
                <TableCell>
                  {new Date(submission.updated).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <ProposalFormButton
                      renderTrigger={() => (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-transparent hover:text-primary"
                        >
                          <FilePenIcon className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      )}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-transparent hover:text-red-500"
                      onClick={() => void destroy(submission.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
