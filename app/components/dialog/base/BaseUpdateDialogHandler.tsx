import React, { useState } from 'react';
import { useAppDispatch } from '@/hooks/reduxHandlers';
import { DialogState, closeDialog } from '@/store/features/dialog';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import useLoading from '@/hooks/useLoading';
import { updateBaseDetails } from '@/store/features/sideBarBasesTables';
import toast from 'react-hot-toast';

const BaseUpdateDialogHandler: React.FC<{ dialog: DialogState }> = ({ dialog }) => {
  const dispatch = useAppDispatch();
  const { additionalOptions, entityId } = dialog;
  const [nameInput, setNameInput] = useState(additionalOptions?.name ?? '');
  const { isLoading, startLoading } = useLoading();

  const updateBaseReduxHandler = () => {
    if (!entityId) {
      toast.error('Please provide a valid base ID');
      return;
    }
    startLoading(() => {
      dispatch(
        updateBaseDetails({
          id: entityId,
          name: nameInput,
        }),
      );
      dispatch(closeDialog());
    });
  };

  return (
    <Dialog.Root open={dialog.isOpen} onOpenChange={() => dispatch(closeDialog())}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Update Base</Dialog.Title>
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
              placeholder="Enter Base Name You want to Update"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button loading={isLoading} onClick={updateBaseReduxHandler}>
            Save
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default BaseUpdateDialogHandler;
