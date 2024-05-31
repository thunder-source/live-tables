'use client';
import BaseHeader from '@/layout/BaseHeader';
import React, { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='h-28 bg-red-50/10'>
        <BaseHeader />
      </div>
      <div>{children}</div>
    </>
  );
}
