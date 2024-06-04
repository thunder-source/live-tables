import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHandlers';
import { DialogState, closeDialog } from '@/store/features/dialog';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import { createTable } from '@/store/features/sideBarBasesTables';
import { generateTableId, generateTableName } from '@/utils';
import toast from 'react-hot-toast';
import useLoading from '@/hooks/useLoading';

const TableCreateDialogHandler: React.FC<{ dialog: DialogState }> = ({ dialog }) => {
  const dispatch = useAppDispatch();
  const bases = useAppSelector((state) => state.sidebar.bases);
  const [nameInput, setNameInput] = useState('');
  const { additionalOptions, entityId } = dialog;
  const { isLoading, startLoading } = useLoading();

  const crateBaseReduxHandler = () => {
    startLoading(() => {
      if (!entityId) {
        toast.error('Please provide a valid base ID');
        return;
      }
      if (!additionalOptions?.tableOrder) {
        toast.error('Please provide a valid tableOrder in additionalOptions');
        return;
      }
      const tables = bases[entityId].tables;
      dispatch(
        createTable({
          baseId: entityId,
          table: {
            id: generateTableId(),
            name: nameInput === '' ? generateTableName(tables) : nameInput,
            config: {},
          },
        }),
      );
      dispatch(closeDialog());
    });
  };

  return (
    <Dialog.Root open={dialog.isOpen} onOpenChange={() => dispatch(closeDialog())}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Create Table</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your Tables.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Root
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
              }}
              placeholder="Enter Table Name You want to Create"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button loading={isLoading} onClick={crateBaseReduxHandler}>
            Save
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default TableCreateDialogHandler;
