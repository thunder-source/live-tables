import React, { useState } from 'react';
import { useAppDispatch } from '@/hooks/reduxHandlers';
import { DialogState, closeDialog } from '@/store/features/dialog';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import useLoading from '@/hooks/useLoading';
import toast from 'react-hot-toast';
import { updateTable } from '@/store/features/sideBarBasesTables';

const TableUpdateDialogHandler: React.FC<{ dialog: DialogState }> = ({ dialog }) => {
  const dispatch = useAppDispatch();

  const { additionalOptions } = dialog;
  const [nameInput, setNameInput] = useState(additionalOptions?.tableConfig?.name ?? '');
  const { isLoading, startLoading } = useLoading();

  const updateBaseReduxHandler = () => {
    startLoading(() => {
      if (!additionalOptions?.baseId) {
        toast.error('Please provide a valid base ID');
        return;
      }
      if (!additionalOptions.tableConfig) {
        toast.error('Please provide a valid base ID');
        return;
      }
      dispatch(
        updateTable({
          baseId: additionalOptions?.baseId,
          table: { ...additionalOptions.tableConfig, name: nameInput }
        }),
      );
      dispatch(closeDialog());
    });
  };

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
            <TextField.Root value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
              }} placeholder="Enter Table Name You want to Update" />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button loading={isLoading} onClick={updateBaseReduxHandler}>Save</Button>

        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default TableUpdateDialogHandler;
