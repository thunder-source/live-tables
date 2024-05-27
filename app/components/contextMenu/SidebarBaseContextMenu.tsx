import { useAppDispatch } from '@/hooks/reduxHandlers';
import { ContextMenu } from '@radix-ui/themes';
import React, { ReactNode, useState } from 'react';
import { SidebarTableMenuItemProps } from '../sidebar/SidebarTableMenuItem';
import { openDialog } from '@/store/features/dialog';

type Props = {
  children: ReactNode;
  base: {
    name: string;
    id: string;
    tableOrder: string[];
    tables: { [key: string]: SidebarTableMenuItemProps };
  };
};

export default function SidebarBaseContextMenu(Props: Props) {
  const { children, base } = Props;
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const deleteBaseHandler = () => {
    dispatch(
      openDialog({
        actionType: 'DELETE',
        entityId: base.id,
        entityType: 'BASE',
        additionalOptions: base,
      }),
    );
    setIsOpen(false);
  };

  return (
    <ContextMenu.Root onOpenChange={setIsOpen}>
      <ContextMenu.Trigger className={`${isOpen && 'bg-accent-6'}`}>{children}</ContextMenu.Trigger>
      <ContextMenu.Content variant="soft" className="w-52">
        <ContextMenu.Item shortcut="⌘ E">Rename</ContextMenu.Item>
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
