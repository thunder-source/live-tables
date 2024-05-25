'use client';
import { Avatar } from '@radix-ui/themes';
import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, MenuItemStyles, menuClasses } from 'react-pro-sidebar';
import { IoReorderThreeOutline } from 'react-icons/io5';
import logo from '../assets/mainLogo.jpg';
// import sidebarbg from '../assets/sidebarbg.jpg';
import { usePathname, useRouter } from 'next/navigation';
import { dynamicBaseLinks, links } from '../data/constants';
import { Reorder } from 'framer-motion';
import { BsDatabaseAdd } from 'react-icons/bs';
import SidebarBaseMenuItem from '@/components/sidebar/SidebarBaseMenuItem';

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
    backgroundColor: level === 0 ? 'var(--accent-a1)' : 'transparent',
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
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [baseItems, setBaseItems] = useState(dynamicBaseLinks);
  const pathName = usePathname();
  const router = useRouter();

  return (
    <Sidebar
      className="select-none backdrop-blur-3xl"
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
        <Avatar
          fallback={collapsed ? 'LT' : 'LIVE TABLES'}
          className={` mx-auto rounded-full transition-all duration-500   ${collapsed ? 'my-2 h-12 w-12' : 'my-4 mb-6 h-48 w-48'}`}
          src={logo.src}
          alt="logo"
        />
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
              onReorder={setBaseItems}
              values={baseItems}
            >
              {baseItems.map((item) => {
                return <SidebarBaseMenuItem key={item.to} item={item} />;
              })}
            </Reorder.Group>
            <MenuItem icon={<BsDatabaseAdd size={25} />}> Create Base</MenuItem>
          </Menu>
        </div>
      </div>
    </Sidebar>
  );
}
