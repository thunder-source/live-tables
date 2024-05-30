import { useAppDispatch, useAppSelector } from '@/hooks/reduxHandlers';
import { toggleSideBar } from '@/store/features/mainState';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Avatar, IconButton } from '@radix-ui/themes';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { TbLayoutSidebarLeftExpand, TbLayoutSidebarLeftCollapse } from 'react-icons/tb';
import HeaderTableNavigationMenu from '@/components/layout/base/HeaderTableNavigationMenu';
import { useParams } from 'next/navigation';
import { BaseConfig } from '@/types';

export default function BaseHeader() {
  const dispatch = useAppDispatch();
  const param = useParams();
  const { sidebar } = useAppSelector((state) => state.mainState);
  const { bases } = useAppSelector((state) => state.sidebar);
  const [activeBase, setActiveBase] = useState<BaseConfig | null>(null);

  useEffect(() => {
    if (typeof param.baseId === 'string' && bases) {
      setActiveBase(bases[param.baseId]);
    }
  }, [bases, param]);

  return (
    <header className={clsx(' w-full bg-accent-a3')}>
      <div className="flex items-center justify-between bg-accent-a3 p-4">
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
