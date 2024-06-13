'use client';
import { Avatar } from '@radix-ui/themes';
import React, { useCallback, useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, MenuItemStyles, menuClasses } from 'react-pro-sidebar';
import { IoReorderThreeOutline } from 'react-icons/io5';
import logo from '../assets/mainLogo.jpg';
import { usePathname, useRouter } from 'next/navigation';
import { links } from '../data/constants';
import { Reorder, motion } from 'framer-motion';
import { BsDatabaseAdd } from 'react-icons/bs';
import SidebarBaseMenuItem from '@/components/sidebar/SidebarBaseMenuItem';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHandlers';
import { updateBaseOrder } from '@/store/features/sideBarBasesTables';
import debounce from '@/utils/debounce';
import { openDialog } from '@/store/features/dialog';
import { setSidebarState, toggleSideBar } from '@/store/features/mainState';

const menuItemStyles: MenuItemStyles = {
  root: {
    fontSize: '16px',
    fontWeight: 400,
    overflow: 'hidden',
  },
  icon: {
    // color: 'var(--gray-12)',
    [`&.${menuClasses.disabled}`]: {
      color: 'var(--gray-a7)',
    },
    // [`&.${menuClasses.active}`]: {
    //   color: 'var(--accent-9)',
    // },
  },
  SubMenuExpandIcon: {
    color: 'var(--gray-12)',
  },
  subMenuContent: ({ level }) => ({
    backgroundColor: level === 0 ? 'var(--accent-1)' : 'var(--accent-1)',
  }),
  button: {
    [`&.${menuClasses.disabled}`]: {
      color: 'var(--gray-a7)',
    },
    '&:hover': {
      backgroundColor: 'var(--accent-a3)',
      // color: 'var(--accent-10)',
    },
    [`&.${menuClasses.active}`]: {
      backgroundColor: 'var(--accent-a3)',
      // color: 'var(--accent-10)',
    },
  },
  label: ({ open }) => ({
    fontWeight: open ? 600 : undefined,
  }),
};

export default function SideBar() {
  const { baseOrder, bases } = useAppSelector((state) => state.sidebar);
  const { sidebar } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = React.useState(sidebar.sidebarActiveWidth === 80);
  const [baseItemsOrder, setBaseItemsOrder] = useState(baseOrder);
  const pathName = usePathname();
  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reorderBase = useCallback(
    debounce((newOrder: string[]) => {
      // console.log('update base order', newOrder);
      dispatch(updateBaseOrder(newOrder));
    }, 500),
    [baseItemsOrder],
  );

  useEffect(() => {
    // This is to update the baseItemsOrder whenever the baseOrder changes like curd in bases
    if (baseOrder !== baseItemsOrder) {
      setBaseItemsOrder(baseOrder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseOrder]);

  const handleBaseReorderEnd = (newOrder: string[]) => {
    setBaseItemsOrder(newOrder);
    reorderBase(newOrder);
  };

  const createBaseHandler = () => {
    dispatch(openDialog({ actionType: 'CREATE', entityType: 'BASE', entityId: 'CREATE_BASE' }));
  };

  return (
    <Sidebar
      className="relative z-50 select-none   transition-all duration-500 "
      collapsed={collapsed}
      toggled={sidebar.isSideBarOpen}
      transitionDuration={500}
      onBackdropClick={() => {
        dispatch(toggleSideBar());
      }}
      breakPoint="all"
      backgroundColor={'var(--accent-1)'}
      rootStyles={{
        color: 'var(--gray-12)',
        borderColor: 'var(--accent-a7)',
      }}
    >
      <div className="">
        <Menu menuItemStyles={menuItemStyles} className="bg-accent-a1">
          <MenuItem
            onClick={() => {
              if (collapsed) {
                dispatch(setSidebarState({ isSideBarOpen: true, sidebarActiveWidth: 250 }));
              } else {
                dispatch(setSidebarState({ isSideBarOpen: true, sidebarActiveWidth: 80 }));
              }
              setCollapsed(!collapsed);
            }}
            icon={<IoReorderThreeOutline size={35} />}
          >
            <span className={`ml-12 truncate text-2xl  ${collapsed && 'hidden'}`}>Live Tables</span>
          </MenuItem>
        </Menu>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center "
        >
          <Avatar
            fallback={collapsed ? 'LT' : 'LIVE TABLES'}
            className={` mx-auto rounded-full transition-all  duration-500 ${collapsed ? 'my-2 h-12 w-12' : 'my-4 mb-6 h-48 w-48'}`}
            src={logo.src}
            alt="logo"
          />
        </motion.div>
      </div>

      <Menu menuItemStyles={menuItemStyles}>
        {links.map(({ activeIcon: ActiveIcon, icon: Icon, name, to }) => {
          return (
            <MenuItem
              key={to}
              onClick={() => {
                router.push(to, { scroll: false });
              }}
              className={`${pathName === to && 'bg-accent-a4'} capitalize`}
              active={pathName === to}
              icon={pathName === to ? <ActiveIcon size={25} /> : <Icon size={25} />}
            >
              {name}
            </MenuItem>
          );
        })}
        <Reorder.Group
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0 }}
          onReorder={setBaseItemsOrder}
          values={baseItemsOrder}
        >
          {baseItemsOrder.map((id: string) => {
            if (!bases[id]) return null;
            return (
              <SidebarBaseMenuItem
                key={id}
                base={bases[id]}
                handleBaseReorderEnd={() => handleBaseReorderEnd(baseItemsOrder)}
              />
            );
          })}
        </Reorder.Group>
        <MenuItem icon={<BsDatabaseAdd size={25} />} onClick={createBaseHandler}>
          Create Base
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
