import { useAppDispatch } from '@/hooks/reduxHandlers';
import { openDialog } from '@/store/features/dialog';
import { BaseConfig } from '@/types';
import { DropdownMenu, TextField } from '@radix-ui/themes';
import React, { ReactNode, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5';


type Props = {
    children: ReactNode;
    base: BaseConfig;
    align?: 'center' | 'end' | 'start' | undefined;
    side?: 'top' | 'right' | 'bottom' | 'left' | undefined;
}

export default function TableSearchListDropDown(Props: Props) {
    const { children, base, align = 'start', side = 'bottom' } = Props;
    const dispatch = useAppDispatch()
    const [searchTable, setSearchTable] = useState('');

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                {children}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content size='2' align={align} side={side} variant="soft" className="w-52">

                <TextField.Root
                    className='focus-visible:outline-none out-of-range:'
                    value={searchTable}
                    onChange={(e) => {
                        setSearchTable(e.target.value);
                    }}
                    placeholder="Find a Table" autoFocus
                >
                    <TextField.Slot className=' '>
                        <IoSearchOutline />
                    </TextField.Slot>
                </TextField.Root>
                <TextField.Root placeholder="Search the docs…">
                    <TextField.Slot>
                        <IoSearchOutline height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>


                <DropdownMenu.Separator />

                <DropdownMenu.Item shortcut="⌘ C" onClick={() => {
                    dispatch(
                        openDialog({
                            actionType: 'CREATE',
                            entityType: 'TABLE',
                            additionalOptions: { tableOrder: base.tableOrder || [] },
                            entityId: base.id,
                        }),
                    );
                }}>

                    Create Table
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}