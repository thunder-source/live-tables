'use client';
import React, { ReactNode } from 'react';
import SideBar from './layout/Sidebar';
import clsx from 'clsx';
import { useAppSelector } from './hooks/reduxHandlers';
import BaseHeader from './layout/BaseHeader';
import { useParams } from 'next/navigation';

export default function DynamicLayout({ children }: { children: ReactNode }) {
  const { sidebar } = useAppSelector((state) => state.main);
  const param = useParams();
  return (
    <div className="flex h-screen w-screen">
      <SideBar />
      <div
        className={clsx('w-screen transition-all duration-500', {
          'pl-[0px]': sidebar.isSideBarOpen === false,
          'pl-[250px] ': sidebar.sidebarActiveWidth === 250 && sidebar.isSideBarOpen,
          'pl-[80px] ': sidebar.sidebarActiveWidth === 80 && sidebar.isSideBarOpen,
        })}
      >
        {param.baseId === undefined && <BaseHeader />}
        {children}
      </div>
    </div>
  );
}
