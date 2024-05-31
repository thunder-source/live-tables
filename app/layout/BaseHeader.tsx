import { useAppDispatch, useAppSelector } from '@/hooks/reduxHandlers';
import { toggleSideBar } from '@/store/features/mainState';
import React from 'react';
import clsx from 'clsx';
import { Avatar, IconButton, Spinner } from '@radix-ui/themes';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { TbLayoutSidebarLeftExpand, TbLayoutSidebarLeftCollapse } from 'react-icons/tb';
import HeaderTableNavigationMenu from '@/components/layout/base/HeaderTableNavigationMenu';
import { useParams } from 'next/navigation';

export default function BaseHeader() {
  const { bases } = useAppSelector((state) => state.sidebar);
  const { sidebar } = useAppSelector((state) => state.mainState);
  const dispatch = useAppDispatch();
  const param = useParams();
  let activeBase = null;
  if (typeof param?.baseId === 'string') {
    activeBase = bases[param.baseId];
  }

  return (
    <header className={clsx(' w-full bg-accent-a6')}>
      <div className="flex items-center justify-between  p-3 px-4">
        <div className="left flex items-center gap-4">
          <IconButton
            onClick={() => {
              dispatch(toggleSideBar());
            }}
            size="3"
            variant="soft"
            className="cursor-pointer rounded-full"
          >
            {sidebar.isSideBarOpen ? (
              <TbLayoutSidebarLeftCollapse size={25} />
            ) : (
              <TbLayoutSidebarLeftExpand size={25} />
            )}
          </IconButton>
          <h4 className="max-w-96 font-bold ">{activeBase?.name} </h4>
        </div>
        <div className="right flex items-center gap-4">
          <div className="mr-8 flex items-center gap-2">
            <Spinner />
            <h6 className="text-sm text-gray-11">All changes Saved</h6>
          </div>
          <IconButton size="3" variant="soft" className="rounded-full">
            <IoIosNotificationsOutline size={25} />
          </IconButton>
          <Avatar
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            fallback="A"
            className="h-10 w-10 rounded-full transition-all duration-500"
          />
        </div>
      </div>
      {activeBase && <HeaderTableNavigationMenu base={activeBase} />}
    </header>
  );
}
