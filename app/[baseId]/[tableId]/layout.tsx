'use client';
import BaseHeader from '@/layout/BaseHeader';
import React, { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <BaseHeader />
      {children}
    </div>
  );
}
