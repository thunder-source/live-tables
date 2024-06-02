import { useAppDispatch } from '@/hooks/reduxHandlers';
import { openDialog } from '@/store/features/dialog';
import { TableConfig } from '@/types';
import { DropdownMenu, Tooltip } from '@radix-ui/themes';
import React, { ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
  table: TableConfig;
  baseId: string;
  disableOnClick?: boolean;
  openMenuOnSelected?: boolean;
  isOpen?: boolean;
  forcedClosedLeftClick?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  align?: 'center' | 'end' | 'start' | undefined;
  side?: 'top' | 'right' | 'bottom' | 'left' | undefined;
};

export default function TableDropDownMenu(Props: Props) {
  const {
    children,
    table,
    baseId,
    disableOnClick = false,
    forcedClosedLeftClick = false,
    openMenuOnSelected = false,
    onClose,
    onOpen,
    align = 'start',
    side = 'bottom',
  } = Props;
  const [isOpen, setIsOpen] = useState(Props.isOpen);
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
    onClose?.();
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
    onClose?.();
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    if (forcedClosedLeftClick) {
      event.preventDefault();
      setIsOpen(false);
    }
    if (openMenuOnSelected) {
      return;
    }
    if (disableOnClick && event.button === 0) {
      event.preventDefault();
    }
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onOpen?.();
    setIsOpen(true);
  };

  return (
    <DropdownMenu.Root
      modal={isOpen}
      open={isOpen}
      onOpenChange={(e) => {
        setIsOpen(e);
        if (e) {
          onOpen?.();
        } else {
          onClose?.();
        }
      }}
    >
      <DropdownMenu.Trigger>
        <div
          className={`${isOpen && 'bg-accent-a3'}`}
          onPointerDown={handlePointerDown}
          onContextMenu={handleContextMenu}
        >
          {children}
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        onContextMenu={handleContextMenu}
        align={align}
        side={side}
        variant="soft"
        className="w-52"
      >
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
