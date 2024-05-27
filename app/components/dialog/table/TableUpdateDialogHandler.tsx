import React from 'react';
import { useAppDispatch } from '@/hooks/reduxHandlers';
import { DialogState, closeDialog } from '@/store/features/dialog';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';

const TableUpdateDialogHandler: React.FC<{ dialog: DialogState }> = ({ dialog }) => {
  const dispatch = useAppDispatch();

  return (
    <Dialog.Root open={dialog.isOpen} onOpenChange={() => dispatch(closeDialog())}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Update Table</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your Tables.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Root placeholder="Enter Table Name You want to Update" />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default TableUpdateDialogHandler;
