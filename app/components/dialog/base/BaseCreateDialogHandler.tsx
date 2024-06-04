import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHandlers';
import { DialogState, closeDialog } from '@/store/features/dialog';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import { createBase } from '@/store/features/sideBarBasesTables';
import { generateBaseId, generateBaseName } from '@/utils';
import useLoading from '@/hooks/useLoading';

const BaseCreateDialogHandler: React.FC<{ dialog: DialogState }> = ({ dialog }) => {
  const dispatch = useAppDispatch();
  const bases = useAppSelector((state) => state.sidebar.bases);
  const [nameInput, setNameInput] = useState('');
  const { isLoading, startLoading } = useLoading();

  console.log(dialog);

  const createBaseReduxHandler = () => {
    startLoading(() => {
      dispatch(
        createBase({
          id: generateBaseId(),
          name: nameInput === '' ? generateBaseName(bases) : nameInput,
          tableOrder: [],
          tables: {},
        }),
      );
      dispatch(closeDialog());
    });
  };

  return (
    <Dialog.Root open={dialog.isOpen} onOpenChange={() => dispatch(closeDialog())}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Create Base</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your Bases.
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
              placeholder="Enter Base Name You want to Create"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button loading={isLoading} onClick={createBaseReduxHandler}>
            Save
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default BaseCreateDialogHandler;
