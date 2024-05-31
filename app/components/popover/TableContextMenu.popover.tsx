import { Avatar, Box, Button, ContextMenu, Flex, Popover, Text, TextArea } from '@radix-ui/themes';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function TableContextMenu({ children }: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content width="360px">
        <Flex gap="3">
          <Avatar
            size="2"
            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
            fallback="A"
            radius="full"
          />
          <Box flexGrow="1">
            <TextArea placeholder="Write a comment…" style={{ height: 80 }} />
            <Flex gap="3" mt="3" justify="between">
              <Flex align="center" gap="2" asChild>
                <Text as="label" size="2">
                  <Text>Send to group</Text>
                </Text>
              </Flex>

              <Popover.Close>
                <Button size="1">Comment</Button>
              </Popover.Close>
            </Flex>
          </Box>
        </Flex>
      </Popover.Content>
      <ContextMenu.Root>
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
    </Popover.Root>
  );
}
