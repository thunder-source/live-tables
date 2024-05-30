'use client';
import BaseHeader from '@/layout/BaseHeader';
import React, { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <BaseHeader />
      <div>{children}</div>
    </>
  );
}
