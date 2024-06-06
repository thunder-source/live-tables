import { BaseConfig } from '@/types';
import { DropdownMenu, Tooltip } from '@radix-ui/themes';
import { CustomHeaderProps } from 'ag-grid-react';
import React, { ReactNode, useState } from 'react';

type Props = {
  children?: ReactNode;
  props: CustomHeaderProps;
  base?: BaseConfig;
  disableOnClick?: boolean;
  align?: 'center' | 'end' | 'start' | undefined;
  side?: 'top' | 'right' | 'bottom' | 'left' | undefined;
};

export default function ColumnMenuDropDown({
  children,
  align = 'end',
  side = 'bottom',
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  //disableOnClick = false,
  // const dispatch = useAppDispatch();

  // const deleteBaseHandler = () => {
  //     dispatch(
  //         openDialog({
  //             actionType: 'DELETE',
  //             entityId: base.id,
  //             entityType: 'BASE',
  //             additionalOptions: base,
  //         }),
  //     );
  //     setIsOpen(false);
  // };
  // const renameBaseHandler = () => {
  //     dispatch(
  //         openDialog({
  //             actionType: 'UPDATE',
  //             entityId: base.id,
  //             entityType: 'BASE',
  //             additionalOptions: base,
  //         }),
  //     );
  //     setIsOpen(false);
  // };

  // const handlePointerDown = (event: React.PointerEvent) => {
  //     if (disableOnClick && event.button === 0) {
  //         event.preventDefault();
  //     }
  // };

  // const handleContextMenu = (event: React.MouseEvent) => {
  //     event.preventDefault();
  //     setIsOpen(true);
  // };
  const handelDeleteColumn = () => {
    // console.log(props.column.getColId());
    // console.log('delete column');
  };

  return (
    <DropdownMenu.Root
      open={isOpen}
      onOpenChange={(e) => {
        setIsOpen(e);
      }}
    >
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Content align={align} side={side} variant="soft" className="w-52">
        <DropdownMenu.Item>Edit Column</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Duplicate Column</DropdownMenu.Item>
        <DropdownMenu.Item>Insert Left</DropdownMenu.Item>
        <DropdownMenu.Item>Insert Right</DropdownMenu.Item>
        <DropdownMenu.Separator />

        <Tooltip side="right" sideOffset={10} content="Upcoming Feature">
          <DropdownMenu.Item disabled>Sort A - Z</DropdownMenu.Item>
        </Tooltip>

        <Tooltip side="right" sideOffset={10} content="Upcoming Feature">
          <DropdownMenu.Item disabled>Sort Z - A</DropdownMenu.Item>
        </Tooltip>
        <DropdownMenu.Separator />

        <Tooltip side="right" sideOffset={10} content="Upcoming Feature">
          <DropdownMenu.Item disabled>Filter by this column</DropdownMenu.Item>
        </Tooltip>

        <Tooltip side="right" sideOffset={10} content="Upcoming Feature">
          <DropdownMenu.Item disabled>Group by this column</DropdownMenu.Item>
        </Tooltip>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Hide Column</DropdownMenu.Item>
        <DropdownMenu.Item onClick={handelDeleteColumn} color="red">
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
