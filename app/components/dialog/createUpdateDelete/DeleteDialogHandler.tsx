import React from 'react';
import { DialogState } from '@/store/features/dialog';
import TableDeleteDialogHandler from '../table/TableDeleteDialogHandler';
import BaseDeleteDialogHandler from '../base/BaseDeleteDialogHandler';

export const DeleteDialogHandler: React.FC<{ dialog: DialogState }> = ({ dialog }) => {
  switch (dialog.entityType) {
    case 'TABLE':
      return <TableDeleteDialogHandler dialog={dialog} />;
    case 'BASE':
      return <BaseDeleteDialogHandler dialog={dialog} />;
    default:
      return null;
  }
};
