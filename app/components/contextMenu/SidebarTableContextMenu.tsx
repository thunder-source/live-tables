import { ContextMenu } from '@radix-ui/themes';
import React, { ReactNode, useState } from 'react';

type Props = { children: ReactNode };

export default function SidebarTableContextMenu(Props: Props) {
  const { children } = Props;
  const [isOpen, setIsOpen] = useState(false);
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
        <ContextMenu.Item shortcut="⌘ ⌫" color="red">
          Delete
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
