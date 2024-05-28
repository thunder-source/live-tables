import { useAppDispatch } from '@/hooks/reduxHandlers';
import { openDialog } from '@/store/features/dialog';
import { TableConfig } from '@/types';
import { ContextMenu } from '@radix-ui/themes';
import React, { ReactNode, useState } from 'react';

type Props = { children: ReactNode; table: TableConfig; baseId: string; onClose: () => void; };

export default function SidebarTableContextMenu(Props: Props) {
  const { children, table, baseId, onClose } = Props;
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const deleteBaseHandler = () => {
    dispatch(
      openDialog({
        actionType: 'DELETE',
        entityId: table.id,
        entityType: 'TABLE',
        additionalOptions: { tableConfig: table, baseId: baseId },
      }),
    );
    setIsOpen(false);
    onClose()
  };
  const renameBaseHandler = () => {
    dispatch(
      openDialog({
        actionType: 'UPDATE',
        entityId: table.id,
        entityType: 'TABLE',
        additionalOptions: { tableConfig: table, baseId: baseId },
      }),
    );
    setIsOpen(false);
    onClose()
  };

  return (
    <ContextMenu.Root modal={isOpen} onOpenChange={(e) => {
      setIsOpen(e)
      if (!e) onClose();
    }}>
      <ContextMenu.Trigger className={`${isOpen && 'bg-accent-6'}`}>{children}</ContextMenu.Trigger>
      <ContextMenu.Content variant="soft" className="w-52">
        <ContextMenu.Item onClick={renameBaseHandler} shortcut="⌘ E">
          Rename
        </ContextMenu.Item>
        <ContextMenu.Item disabled shortcut="⌘ D">
          Duplicate
        </ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item disabled shortcut="⌘ N">
          Archive
        </ContextMenu.Item>

        <ContextMenu.Separator />
        <ContextMenu.Item disabled>Share</ContextMenu.Item>
        <ContextMenu.Item disabled>Add to favorites</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item onClick={deleteBaseHandler} shortcut="⌘ ⌫" color="red">
          Delete
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
