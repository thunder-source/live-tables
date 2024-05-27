'use client';
import { Avatar } from '@radix-ui/themes';
import React, { useCallback, useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, MenuItemStyles, menuClasses } from 'react-pro-sidebar';
import { IoReorderThreeOutline } from 'react-icons/io5';
import logo from '../assets/mainLogo.jpg';
// import sidebarbg from '../assets/sidebarbg.jpg';
import { usePathname, useRouter } from 'next/navigation';
import { links } from '../data/constants';
import { Reorder, motion } from 'framer-motion';
import { BsDatabaseAdd } from 'react-icons/bs';
import SidebarBaseMenuItem from '@/components/sidebar/SidebarBaseMenuItem';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHandlers';
import { updateBaseOrder } from '@/store/features/sideBarBasesTables';
import debounce from '@/utils/debounce';
import { openDialog } from '@/store/features/dialog';

const menuItemStyles: MenuItemStyles = {
  root: {
    fontSize: '16px',
    fontWeight: 400,
  },
  icon: {
    color: 'var(--accent-9)',
    [`&.${menuClasses.disabled}`]: {
      color: 'var(--gray-a7)',
    },
  },
  SubMenuExpandIcon: {
    color: 'var(--accent-9)',
  },
  subMenuContent: ({ level }) => ({
    backgroundColor: level === 0 ? 'var(--accent-2)' : 'transparent',
  }),
  button: {
    [`&.${menuClasses.disabled}`]: {
      color: 'var(--gray-a7)',
    },
    '&:hover': {
      backgroundColor: 'var(--accent-6)',
      color: 'var(--accent-10)',
    },
  },
  label: ({ open }) => ({
    fontWeight: open ? 600 : undefined,
  }),
};

export default function SideBar() {
  const { baseOrder, bases } = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [baseItemsOrder, setBaseItemsOrder] = useState(baseOrder);
  const pathName = usePathname();
  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reorderBase = useCallback(
    debounce((newOrder: string[]) => {
      console.log('update base order', newOrder);
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

  const handleReorderEnd = (newOrder: string[]) => {
    setBaseItemsOrder(newOrder);
    reorderBase(newOrder);
  };

  const createBaseHandler = () => {
    dispatch(openDialog({ actionType: 'CREATE', entityType: 'BASE', entityId: 'CREATE_BASE' }));
  };

  return (
    <Sidebar
      className="relative z-50 select-none backdrop-blur-3xl"
      collapsed={collapsed}
      toggled={toggled}
      transitionDuration={500}
      onBackdropClick={() => setToggled(false)}
      //   image={sidebarbg.src}
      breakPoint="md"
      backgroundColor={'var(--accent-a2)'}
      rootStyles={{
        color: 'var(--accent-9)',
        borderColor: 'var(--accent-a7)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Menu menuItemStyles={menuItemStyles} className="">
          <MenuItem
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            icon={<IoReorderThreeOutline size={35} />}
          >
            <span className={`ml-12 truncate text-2xl  ${collapsed && 'hidden'}`}>Live Tables</span>
          </MenuItem>
        </Menu>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mx-auto ">
          <Avatar
            fallback={collapsed ? 'LT' : 'LIVE TABLES'}
            className={` rounded-full transition-all duration-500   ${collapsed ? 'my-2 h-12 w-12' : 'my-4 mb-6 h-48 w-48'}`}
            src={logo.src}
            alt="logo"
          />
        </motion.div>
        <div style={{ flex: 1, marginBottom: '32px' }}>
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
                    handleReorderEnd={() => handleReorderEnd(baseItemsOrder)}
                  />
                );
              })}
            </Reorder.Group>
            <MenuItem icon={<BsDatabaseAdd size={25} />} onClick={createBaseHandler}>
              Create Base
            </MenuItem>
          </Menu>
        </div>
      </div>
    </Sidebar>
  );
}
