import { Separator, Skeleton } from '@radix-ui/themes';
import clsx from 'clsx';
import React from 'react';

export default function HeaderToolsControllerSkeleton() {
    return (
        <div className="flex h-10 w-full items-center gap-6 border-b border-accent-a6 bg-accent-1 px-6 py-2">
            <Skeleton className={clsx(' px-2 w-fit h-full  text-accent-12')}>Views</Skeleton>

            <Separator orientation="vertical" className="-mx-1" />

            <Skeleton className=" px-2 w-fit h-full  ">Grid View</Skeleton>

            <Skeleton className={clsx(' px-2 w-fit h-full ')}>Hidden Fields</Skeleton>

            <Skeleton className={clsx(' px-2 w-fit h-full  ')}> Filter</Skeleton>
            <Skeleton className=" px-2 w-fit h-full  ">Group</Skeleton>

            <Skeleton className=" px-2 w-fit h-full  ">Sort</Skeleton>

            <Skeleton className=" px-2 w-fit h-full  "> Color</Skeleton>

            <Skeleton className=" px-2 w-fit h-full  text-accent-12"> Row Height</Skeleton>

            <Skeleton className=" px-2 w-fit h-full "> Share and sync</Skeleton>
        </div>
    );
}
