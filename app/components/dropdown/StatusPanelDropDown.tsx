import { Button, DropdownMenu } from '@radix-ui/themes';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function StatusPanelDropDown({ children }: Props) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          variant="ghost"
          className="m-0 flex w-full cursor-pointer justify-end rounded-radius_2  p-0 text-accent-12"
        >
          <DropdownMenu.TriggerIcon className="mr-1" />
          {children}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" className="rounded-sm">
        <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
        <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Share</DropdownMenu.Item>
        <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
