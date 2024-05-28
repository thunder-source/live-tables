import React from 'react';
import { useAppDispatch } from '@/hooks/reduxHandlers';
import { DialogState, closeDialog } from '@/store/features/dialog';
import { Button, Dialog, Flex } from '@radix-ui/themes';
import { deleteBase } from '@/store/features/sideBarBasesTables';
import useLoading from '@/hooks/useLoading';

const BaseDeleteDialogHandler: React.FC<{ dialog: DialogState }> = ({ dialog }) => {
  const dispatch = useAppDispatch();
  const { isLoading, startLoading } = useLoading();

  const deleteBaseHandler = () => {
    startLoading(() => {
      dispatch(deleteBase({ id: dialog.entityId ?? '' }));
      dispatch(closeDialog());
    });
  };

  return (
    <Dialog.Root open={dialog.isOpen} onOpenChange={() => dispatch(closeDialog())}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Delete Base</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Are you sure you want to delete{' '}
          <span className="font-bold">
            {dialog.additionalOptions?.name && dialog.additionalOptions?.name}
          </span>{' '}
          base? This action cannot be undone.
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button loading={isLoading} variant="soft" color="red" onClick={deleteBaseHandler}>
            Delete
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default BaseDeleteDialogHandler;
