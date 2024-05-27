import React from 'react';
import { useAppDispatch } from '@/hooks/reduxHandlers';
import { DialogState, closeDialog } from '@/store/features/dialog';
import { Button, Dialog, Flex } from '@radix-ui/themes';

const TableDeleteDialogHandler: React.FC<{ dialog: DialogState }> = ({ dialog }) => {
  const dispatch = useAppDispatch();

  return (
    <Dialog.Root open={dialog.isOpen} onOpenChange={() => dispatch(closeDialog())}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Delete Table</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Are you sure you want to delete this table? This action cannot be undone.
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              variant="soft"
              color="red"
              onClick={() => {
                // Add delete logic here
                dispatch(closeDialog());
              }}
            >
              Delete
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default TableDeleteDialogHandler;
