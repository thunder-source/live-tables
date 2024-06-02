import { useAppDispatch } from '@/hooks/reduxHandlers';
import { openDialog } from '@/store/features/dialog';
import { BaseConfig } from '@/types';
import { DropdownMenu, Tooltip } from '@radix-ui/themes';
import React, { ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
  base: BaseConfig;
  disableOnClick?: boolean;
  align?: 'center' | 'end' | 'start' | undefined;
  side?: 'top' | 'right' | 'bottom' | 'left' | undefined;
};

export default function BaseDropDownMenu(Props: Props) {
  const { children, base, disableOnClick = false, align = 'start', side = 'bottom' } = Props;
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
  const renameBaseHandler = () => {
    dispatch(
      openDialog({
        actionType: 'UPDATE',
        entityId: base.id,
        entityType: 'BASE',
        additionalOptions: base,
      }),
    );
    setIsOpen(false);
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    if (disableOnClick && event.button === 0) {
      event.preventDefault();
    }
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(true);
  };

  return (
    <DropdownMenu.Root
      open={isOpen}
      onOpenChange={(e) => {
        setIsOpen(e);
      }}
    >
      <DropdownMenu.Trigger>
        <div
          className={`${isOpen && 'bg-accent-6'}`}
          onPointerDown={handlePointerDown}
          onContextMenu={handleContextMenu}
        >
          {children}
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align={align} side={side} variant="soft" className="w-52">
        <DropdownMenu.Item onClick={renameBaseHandler} shortcut="⌘ E">
          Rename
        </DropdownMenu.Item>
        <Tooltip side="right" sideOffset={10} content="Upcoming Feature">
          <DropdownMenu.Item disabled shortcut="⌘ D">
            Duplicate
          </DropdownMenu.Item>
        </Tooltip>

        <DropdownMenu.Separator />
        <Tooltip side="right" sideOffset={10} content="Upcoming Feature">
          <DropdownMenu.Item disabled shortcut="⌘ N">
            Archive
          </DropdownMenu.Item>
        </Tooltip>

        <DropdownMenu.Separator />
        <Tooltip side="right" sideOffset={10} content="Upcoming Feature">
          <DropdownMenu.Item disabled>Share</DropdownMenu.Item>
        </Tooltip>
        <Tooltip side="right" sideOffset={10} content="Upcoming Feature">
          <DropdownMenu.Item disabled>Add to favorites</DropdownMenu.Item>
        </Tooltip>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={deleteBaseHandler} shortcut="⌘ ⌫" color="red">
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
