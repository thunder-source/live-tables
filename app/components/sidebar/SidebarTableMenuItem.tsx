import React, { FC, SVGProps, useState } from 'react';
import { useMotionValue, Reorder } from 'framer-motion';
import { useRaisedShadow } from '@/hooks/use-raised-shadow';
import { MenuItem } from 'react-pro-sidebar';
import { usePathname, useRouter } from 'next/navigation';
import SidebarTableContextMenu from '../contextMenu/SidebarTableContextMenu';

export type SidebarTableMenuItemProps = {
  activeIcon: FC<SVGProps<SVGSVGElement>>;
  icon: FC<SVGProps<SVGSVGElement>>;
  name: string;
  to: string;
};

export default function SidebarTableMenuItem({ item }: { item: SidebarTableMenuItemProps }) {
  const { activeIcon: ActiveIcon, icon: Icon, name, to } = item;
  const [isDragging, setIsDragging] = useState(false);
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const pathName = usePathname();
  const router = useRouter();

  return (
    <Reorder.Item
      onPointerDown={() => setIsDragging(false)}
      onPointerMove={() => setIsDragging(true)}
      onPointerUp={(e) => {
        // Right-click
        // Prevent navigation and allow default context menu behavior
        if (e.button !== 2) {
          if (!isDragging) {
            router.push(to, { scroll: false });
          }
          setIsDragging(false);
        }
      }}
      as="div"
      className="relative z-50"
      value={item}
      id={to}
      style={{ boxShadow, y }}
    >
      <SidebarTableContextMenu>
        <MenuItem
          className={`${pathName === to && 'bg-accent-a4'} truncate capitalize`}
          icon={
            pathName === to ? (
              <ActiveIcon className="h-7 w-7" />
            ) : (
              <Icon className="h-[25px] w-[25px]" />
            )
          }
        >
          {name}
        </MenuItem>
      </SidebarTableContextMenu>
    </Reorder.Item>
  );
}
