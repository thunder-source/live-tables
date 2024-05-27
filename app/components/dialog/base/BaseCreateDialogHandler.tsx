import React, { useState } from 'react';
import { useAppDispatch } from '@/hooks/reduxHandlers';
import { DialogState, closeDialog } from '@/store/features/dialog';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import { createBase } from '@/store/features/sideBarBasesTables';
import { generateBaseId, generateBaseName } from '@/utils';

const BaseCreateDialogHandler: React.FC<{ dialog: DialogState }> = ({ dialog }) => {
  const dispatch = useAppDispatch();
  const [nameInput, setNameInput] = useState('');

  const crateBaseReduxHandler = () => {
    dispatch(
      createBase({
        id: generateBaseId(),
        name: nameInput === '' ? generateBaseName() : nameInput,
        tableOrder: [],
        tables: {},
      }),
    );
    dispatch(closeDialog());
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
          <Dialog.Close>
            <Button onClick={crateBaseReduxHandler}>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default BaseCreateDialogHandler;
