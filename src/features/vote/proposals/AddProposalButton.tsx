import ProposalForm from '../../../components/ProposalForm.tsx';
import { Button } from '../../../components/ui/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../../components/ui/dialog.tsx';

export default function AddProposalButton() {
  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Add Proposal
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-max min-w-min max-h-[90%] overflow-scroll p-0 mx-0 my-0">
        <ProposalForm />
      </DialogContent>
    </Dialog>
  );
}
