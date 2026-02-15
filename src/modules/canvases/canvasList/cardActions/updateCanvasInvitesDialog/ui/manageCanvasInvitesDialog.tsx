import { Button } from '@/common/ui/button';
import { ControlledDialog } from '@/common/ui/controlled-dialog';
import {
  InviteEmailsInput,
  InviteEmailsList,
  InviteExistingEmails,
  useInviteState
} from '@/modules/invites';

import type { CanvasDialogProps } from '../../model/canvasDialogsConfig';

import { useUpdateCanvasInvitesMutation } from '../hooks/useUpdateCanvasInvitesMutation';

function ManageCanvasInvitesDialog({ card, onOpenChange }: CanvasDialogProps) {
  const {
    initialInvited,
    getStatus,
    addedInvites,
    removedInvites,
    setAddedInvites,
    setRemovedInvites
  } = useInviteState(card.invitedEmails);

  const [updateCanvasInvites, { loading }] = useUpdateCanvasInvitesMutation();

  const onSubmit = () => {
    updateCanvasInvites({
      variables: { id: card.id, add: addedInvites, remove: removedInvites }
    });
  };

  return (
    <ControlledDialog title='Manage invites' onOpenChange={onOpenChange} open={true}>
      <InviteExistingEmails
        emails={initialInvited}
        getStatus={getStatus}
        setRemoveInvites={setRemovedInvites}
      />
      <InviteEmailsInput
        getStatus={getStatus}
        invites={addedInvites}
        label='Invite users by email'
        setInvites={setAddedInvites}
      />
      <InviteEmailsList emails={addedInvites} setInvites={setAddedInvites} />

      <Button className='w-full mt-4' disabled={loading} size='lg' type='submit' onClick={onSubmit}>
        Send invite
      </Button>
    </ControlledDialog>
  );
}

export { ManageCanvasInvitesDialog };
