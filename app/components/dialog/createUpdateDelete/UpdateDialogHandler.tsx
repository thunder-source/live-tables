import React from 'react';
import { DialogState } from '@/store/features/dialog';
import TableUpdateDialogHandler from '../table/TableUpdateDialogHandler';
import BaseUpdateDialogHandler from '../base/BaseUpdateDialogHandler';

export const UpdateDialogHandler: React.FC<{ dialog: DialogState }> = ({ dialog }) => {
  switch (dialog.entityType) {
    case 'TABLE':
      return <TableUpdateDialogHandler dialog={dialog} />;
    case 'BASE':
      return <BaseUpdateDialogHandler dialog={dialog} />;
    default:
      return null;
  }
};
