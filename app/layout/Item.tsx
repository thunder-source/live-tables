import * as React from 'react';
import { useMotionValue, Reorder } from 'framer-motion';
import { useRaisedShadow } from '@/hooks/use-raised-shadow';
import { MenuItem } from 'react-pro-sidebar';

interface Props {
  item: {
    item: string;
    key: string;
  };
}

export const Item = ({ item }: Props) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  return (
    <Reorder.Item
      className="relative z-50"
      as="div"
      value={item}
      id={item.key}
      style={{ boxShadow, y }}
    >
      <MenuItem>{item.item}</MenuItem>
    </Reorder.Item>
  );
};
