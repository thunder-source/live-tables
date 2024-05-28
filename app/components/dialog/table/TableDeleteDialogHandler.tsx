import React from 'react';
import { useAppDispatch } from '@/hooks/reduxHandlers';
import { DialogState, closeDialog } from '@/store/features/dialog';
import { Button, Dialog, Flex } from '@radix-ui/themes';
import useLoading from '@/hooks/useLoading';
import { deleteTable } from '@/store/features/sideBarBasesTables';

const TableDeleteDialogHandler: React.FC<{ dialog: DialogState }> = ({ dialog }) => {
  const dispatch = useAppDispatch();

  const { isLoading, startLoading } = useLoading();

  const deleteTableHandler = () => {

    startLoading(() => {
      dispatch(deleteTable({ tableId: dialog.entityId ?? '', baseId: dialog.additionalOptions?.baseId ?? '' }));
      dispatch(closeDialog());
    });
  };

  return (
    <Dialog.Root open={dialog.isOpen} onOpenChange={() => dispatch(closeDialog())}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Delete Table</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Are you sure you want to delete <span className="font-bold">
            {dialog.additionalOptions?.name && dialog.additionalOptions?.name}
          </span>{' '} table? This action cannot be undone.
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button loading={isLoading}
            variant="soft"
            color="red"
            onClick={deleteTableHandler}
          >
            Delete
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default TableDeleteDialogHandler;
