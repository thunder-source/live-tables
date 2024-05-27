import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createBase,
  updateBase,
  deleteBase,
  createTable,
  updateTable,
  deleteTable,
  updateBaseOrder,
  updateTableOrder,
} from '@/store/features/sideBarBasesTables';
import { RootState } from '@/store/app';
import { BaseConfig, TableConfig, BaseConfigSchema, TableConfigSchema } from '@/types';
import { generateBaseId, generateTableId, generateBaseName, generateTableName } from '@/utils';
import toast from 'react-hot-toast';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const SidebarBaseTable: React.FC = () => {
  const dispatch = useDispatch();
  const bases = useSelector((state: RootState) => state.sidebar.bases);
  const baseOrder = useSelector((state: RootState) => state.sidebar.baseOrder);

  const [baseForm, setBaseForm] = useState<BaseConfig>({
    id: '',
    name: '',
    tables: {},
    tableOrder: [],
  });
  const [tableForm, setTableForm] = useState<TableConfig>({ id: '', name: '', config: {} });
  const [selectedBaseId, setSelectedBaseId] = useState<string>('');

  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBaseForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTableForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateBaseId = () => {
    setBaseForm((prev) => ({ ...prev, id: generateBaseId() }));
  };

  const handleGenerateTableId = () => {
    setTableForm((prev) => ({ ...prev, id: generateTableId() }));
  };

  const handleGenerateBaseName = () => {
    setBaseForm((prev) => ({ ...prev, name: generateBaseName() }));
  };

  const handleGenerateTableName = () => {
    setTableForm((prev) => ({ ...prev, name: generateTableName() }));
  };

  const handleAddBase = () => {
    const result = BaseConfigSchema.safeParse(baseForm);
    if (result.success) {
      dispatch(createBase(baseForm));
      setBaseForm({ id: '', name: '', tables: {}, tableOrder: [] });
    } else {
      toast.error('Invalid Base Data');
    }
  };

  const handleUpdateBase = () => {
    const result = BaseConfigSchema.safeParse(baseForm);
    if (result.success) {
      dispatch(updateBase(baseForm));
    } else {
      toast.error('Invalid Base Data');
    }
  };

  const handleDeleteBase = (id: string) => {
    dispatch(deleteBase({ id }));
  };

  const handleAddTable = () => {
    const result = TableConfigSchema.safeParse(tableForm);
    if (result.success) {
      dispatch(createTable({ baseId: selectedBaseId, table: tableForm }));
      setTableForm({ id: '', name: '', config: {} });
    } else {
      toast.error('Invalid Table Data');
    }
  };

  const handleUpdateTable = () => {
    const result = TableConfigSchema.safeParse(tableForm);
    if (result.success) {
      dispatch(updateTable({ baseId: selectedBaseId, table: tableForm }));
    } else {
      toast.error('Invalid Table Data');
    }
  };

  const handleDeleteTable = (baseId: string, tableId: string) => {
    dispatch(deleteTable({ baseId, tableId }));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === 'base-list' && destination.droppableId === 'base-list') {
      const newBaseOrder = Array.from(baseOrder);
      const [movedBase] = newBaseOrder.splice(source.index, 1);
      newBaseOrder.splice(destination.index, 0, movedBase);
      dispatch(updateBaseOrder(newBaseOrder));
    } else if (source.droppableId !== 'base-list' && destination.droppableId !== 'base-list') {
      const baseId = source.droppableId;
      const newTableOrder = Array.from(bases[baseId].tableOrder);
      const [movedTable] = newTableOrder.splice(source.index, 1);
      newTableOrder.splice(destination.index, 0, movedTable);
      dispatch(updateTableOrder({ baseId, tableOrder: newTableOrder }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="h-screen overflow-auto p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Base Configuration</h2>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              name="id"
              value={baseForm.id}
              onChange={handleBaseChange}
              placeholder="Base ID"
              className="flex-grow border p-2"
            />
            <button onClick={handleGenerateBaseId} className="bg-gray-500 px-4 py-2 text-white">
              Generate Base ID
            </button>
            <input
              type="text"
              name="name"
              value={baseForm.name}
              onChange={handleBaseChange}
              placeholder="Base Name"
              className="flex-grow border p-2"
            />
            <button onClick={handleGenerateBaseName} className="bg-gray-500 px-4 py-2 text-white">
              Generate Base Name
            </button>
            <button onClick={handleAddBase} className="bg-blue-500 px-4 py-2 text-white">
              Add Base
            </button>
            <button onClick={handleUpdateBase} className="bg-green-500 px-4 py-2 text-white">
              Update Base
            </button>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold">Table Configuration</h2>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              name="id"
              value={tableForm.id}
              onChange={handleTableChange}
              placeholder="Table ID"
              className="flex-grow border p-2"
            />
            <button onClick={handleGenerateTableId} className="bg-gray-500 px-4 py-2 text-white">
              Generate Table ID
            </button>
            <input
              type="text"
              name="name"
              value={tableForm.name}
              onChange={handleTableChange}
              placeholder="Table Name"
              className="flex-grow border p-2"
            />
            <button onClick={handleGenerateTableName} className="bg-gray-500 px-4 py-2 text-white">
              Generate Table Name
            </button>
            <input
              type="text"
              name="config"
              value={JSON.stringify(tableForm.config)}
              onChange={(e) =>
                handleTableChange({
                  ...e,
                  target: { ...e.target, name: 'config', value: JSON.parse(e.target.value) },
                })
              }
              placeholder="Table Config"
              className="flex-grow border p-2"
            />
            <select
              onChange={(e) => setSelectedBaseId(e.target.value)}
              value={selectedBaseId}
              className="flex-grow border p-2"
            >
              <option value="">Select Base</option>
              {Object.keys(bases).map((baseId) => (
                <option key={baseId} value={baseId}>
                  {bases[baseId].name}
                </option>
              ))}
            </select>
            <button onClick={handleAddTable} className="bg-blue-500 px-4 py-2 text-white">
              Add Table
            </button>
            <button onClick={handleUpdateTable} className="bg-green-500 px-4 py-2 text-white">
              Update Table
            </button>
          </div>
        </div>

        <Droppable droppableId="base-list" type="BASE">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {baseOrder.map((baseId, index) => (
                <Draggable key={baseId} draggableId={baseId} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-4 rounded border p-4"
                    >
                      <h2 className="cursor-grab text-lg font-bold">{bases[baseId].name}</h2>
                      <button
                        onClick={() => handleDeleteBase(baseId)}
                        className="mb-2 bg-red-500 px-4 py-2 text-white"
                      >
                        Delete Base
                      </button>
                      <Droppable droppableId={'base-list'} type="TABLE">
                        {(provided) => (
                          <ul ref={provided.innerRef} {...provided.droppableProps}>
                            {bases[baseId].tableOrder.map((tableId, index) => (
                              <Draggable key={tableId} draggableId={tableId} index={index}>
                                {(provided) => (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="mb-2 rounded border bg-gray-100/10 p-2"
                                  >
                                    <div className="flex items-center justify-between">
                                      <strong>
                                        {bases[baseId].tables[tableId].name}
                                        {tableId}
                                      </strong>
                                      <button
                                        onClick={() => handleDeleteTable(baseId, tableId)}
                                        className="bg-red-500 px-2 py-1 text-white"
                                      >
                                        Delete Table
                                      </button>
                                    </div>
                                    <pre className="bg-gray-200/10 p-2">
                                      {JSON.stringify(
                                        bases[baseId].tables[tableId].config,
                                        null,
                                        2,
                                      )}
                                    </pre>
                                  </li>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default SidebarBaseTable;
