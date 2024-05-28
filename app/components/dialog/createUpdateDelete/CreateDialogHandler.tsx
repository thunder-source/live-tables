import React from 'react';
import { DialogState } from '@/store/features/dialog';
import TableCreateDialogHandler from '../table/TableCreateDialogHandler';
import BaseCreateDialogHandler from '../base/BaseCreateDialogHandler';

const CreateDialogHandler: React.FC<{ dialog: DialogState }> = ({ dialog }) => {
  switch (dialog.entityType) {
    case 'TABLE':
      return <TableCreateDialogHandler dialog={dialog} />;
    case 'BASE':
      return <BaseCreateDialogHandler dialog={dialog} />;
    default:
      return null;
  }
};

export default CreateDialogHandler;
