import { TbHome, TbHomeFilled } from 'react-icons/tb';
import { IoChatbubbleEllipses, IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { SiWechat } from 'react-icons/si';
import { TbBrandWechat } from 'react-icons/tb';
import { TbTable, TbTableFilled } from 'react-icons/tb';
import { GrTest } from 'react-icons/gr';
import { SiTestinglibrary } from 'react-icons/si';
export const links = [
  {
    name: 'dashboard',
    to: '/',
    icon: TbHome,
    activeIcon: TbHomeFilled,
  },
  {
    name: 'chat',
    to: '/chat',
    icon: IoChatbubbleEllipsesOutline,
    activeIcon: IoChatbubbleEllipses,
  },
  {
    name: 'group chat',
    to: '/groupchat',
    icon: TbBrandWechat,
    activeIcon: SiWechat,
  },
  {
    name: 'testing',
    to: '/testing',
    icon: GrTest,
    activeIcon: SiTestinglibrary,
  },
];

export const dynamicTableLinks = [
  {
    name: 'Product',
    to: '/table/tblId12346789',
    icon: TbTable,
    activeIcon: TbTableFilled,
  },
  {
    name: 'Orders',
    to: '/table/tblId12346781',
    icon: TbTable,
    activeIcon: TbTableFilled,
  },
  {
    name: 'Inventory',
    to: '/table/tblId12346780',
    icon: TbTable,
    activeIcon: TbTableFilled,
  },
];
export const dynamicTableLinks1 = [
  {
    name: 'Product',
    to: '/table/tblId2346789',
    icon: TbTable,
    activeIcon: TbTableFilled,
  },
  {
    name: 'Orders',
    to: '/table/tblId123467',
    icon: TbTable,
    activeIcon: TbTableFilled,
  },
  {
    name: 'Inventory',
    to: '/table/tblId123480',
    icon: TbTable,
    activeIcon: TbTableFilled,
  },
];
export const dynamicTableLinks2 = [
  {
    name: 'Product',
    to: '/table/tbd12346789',
    icon: TbTable,
    activeIcon: TbTableFilled,
  },
  {
    name: 'Orders',
    to: '/table/tlId12346781',
    icon: TbTable,
    activeIcon: TbTableFilled,
  },
  {
    name: 'Inventory',
    to: '/table/tblId1246780',
    icon: TbTable,
    activeIcon: TbTableFilled,
  },
];

export const dynamicBaseLinks = [
  {
    name: 'E-commerce commerce commerce commerce',
    to: '/baseIdl12346789',
    tables: dynamicTableLinks,
  },
  {
    name: 'Portfolio',
    to: '/baseIdl123467892',
    tables: dynamicTableLinks1,
  },
  {
    name: 'Plans',
    to: '/baseIdl123467891',
    tables: dynamicTableLinks2,
  },
];
