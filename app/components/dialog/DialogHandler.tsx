import { useAppSelector } from '@/hooks/reduxHandlers';
import React from 'react';
import CreateDialogHandler from './createUpdateDelete/CreateDialogHandler';
import { UpdateDialogHandler } from './createUpdateDelete/UpdateDialogHandler';
import { DeleteDialogHandler } from './createUpdateDelete/DeleteDialogHandler';

// Component to handle all dialog types
export default function DialogHandler() {
  const dialogData = useAppSelector((state) => state.dialog);

  // Properly type the dialog prop in dialog handlers
  switch (dialogData.actionType) {
    case 'CREATE':
      return <CreateDialogHandler dialog={dialogData} />;
    case 'UPDATE':
      return <UpdateDialogHandler dialog={dialogData} />;
    case 'DELETE':
      return <DeleteDialogHandler dialog={dialogData} />;
    default:
      return null;
  }
}
