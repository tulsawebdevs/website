import type React from 'react';
import { useState, useMemo } from 'react';
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

export default function DraftProposalList() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({
    key: 'name' as 'name' | 'date',
    order: 'asc' as 'asc' | 'desc',
  });
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const submissions = useMemo(
    () =>
      [
        {
          id: 'SUB001',
          name: 'Contact Form',
          date: '2023-05-01',
        },
        {
          id: 'SUB002',
          name: 'Newsletter Signup',
          date: '2023-05-02',
        },
        {
          id: 'SUB003',
          name: 'Job Application',
          date: '2023-05-03',
        },
        {
          id: 'SUB004',
          name: 'Feedback Form',
          date: '2023-05-04',
        },
        {
          id: 'SUB005',
          name: 'Event Registration',
          date: '2023-05-05',
        },
      ]
        .filter((submission) => {
          const searchValue = search.toLowerCase();
          return (
            submission.name.toLowerCase().includes(searchValue) ||
            submission.date.toLowerCase().includes(searchValue)
          );
        })
        .sort((a, b) => {
          if (sort.order === 'asc') {
            return a[sort.key] > b[sort.key] ? 1 : -1;
          }

          return a[sort.key] < b[sort.key] ? 1 : -1;
        }),
    [search, sort],
  );

  const handleSearch = (err: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(err.target.value);

  const handleSort = (key: 'name' | 'date') => {
    if (sort.key === key) {
      setSort({ key, order: sort.order === 'asc' ? 'desc' : 'asc' });
    } else {
      setSort({ key, order: 'asc' });
    }
  };

  const handleSelect = (id: string) => {
    if (selectedSubmissions.includes(id)) {
      setSelectedSubmissions(selectedSubmissions.filter((s) => s !== id));
    } else {
      setSelectedSubmissions([...selectedSubmissions, id]);
    }
    setShowBulkActions(selectedSubmissions.length > 0);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSubmissions(submissions.map((s) => s.id));
    } else {
      setSelectedSubmissions([]);
    }
    setShowBulkActions(checked);
  };

  const handleDelete = () => {};
  const handleEdit = () => {};

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Draft Submissions</h1>
        <div className="flex items-center gap-2">
          {showBulkActions && (
            <Button variant="destructive" onClick={handleDelete}>
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
                onValueChange={(value) => handleSort(value as 'name' | 'date')}
              >
                <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
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
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedSubmissions.length === submissions.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead
                className="w-[200px]"
                onClick={() => handleSort('name')}
              >
                Form Name
                {sort.key === 'name' && (
                  <span className="ml-1">
                    {sort.order === 'asc' ? '\u2191' : '\u2193'}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="w-[150px]"
                onClick={() => handleSort('date')}
              >
                Submission Date
                {sort.key === 'date' && (
                  <span className="ml-1">
                    {sort.order === 'asc' ? '\u2191' : '\u2193'}
                  </span>
                )}
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedSubmissions.includes(submission.id)}
                    onCheckedChange={() => handleSelect(submission.id)}
                  />
                </TableCell>
                <TableCell>{submission.name}</TableCell>
                <TableCell>{submission.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-transparent hover:text-primary"
                    >
                      <FilePenIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-transparent hover:text-red-500"
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
