// ===================================================================
//                             Imports
// ===================================================================
import { Expense } from '../../redux/expenses/types';
import React, { useState } from 'react';
import Link from 'next/link';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import {
    ListItem,
    ListItemText,
    Collapse,
    List,
    ListItemSecondaryAction,
    IconButton,
} from '@material-ui/core';
import {
    DataGrid,
    GridColDef,
    GridRowData,
    GridRowParams,
    GridSelectionModel,
    GridValueGetterParams,
} from '@mui/x-data-grid';

// ===================================================================
//                       DataGrid Definitions
// ===================================================================
const columns: GridColDef[] = [
    {
        field: 'date',
        headerName: 'Date',
        width: 150,
        sortable: true,
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        sortable: true,
    },
    {
        field: 'cost',
        headerName: 'Price',
        width: 150,
        sortable: true,
    },
    {
        field: 'link',
        headerName: 'Link',
        width: 150,
    },
    {
        field: 'tags',
        headerName: 'Tags',
        width: 150,
    },
];

// ===================================================================
//                            Component
// ===================================================================
export interface ExpenseViewProps {
    expenses: ReadonlyArray<Expense>;
    onSelect?: (expense?: Expense) => void;
}

/**
 * React component that renders Expenses.
 *
 * FIXME add a bit more detail as needed as you develop this
 *
 * @param {ExpenseViewProps} props - React properties for ExpenseView
 * @returns {Element} a list view of all tags
 */
export default function ExpenseView(props: ExpenseViewProps): JSX.Element {
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>(
        [],
    );
    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={props.expenses}
                pageSize={5}
                rowsPerPageOptions={[5]}
                onRowClick={(gridRowParams) => {
                    if (
                        selectionModel.length == 1 &&
                        selectionModel[0] == gridRowParams.id
                    ) {
                        setSelectionModel([]);
                        if (props.onSelect) props.onSelect();
                    } else {
                        setSelectionModel([gridRowParams.id]);
                        if (props.onSelect)
                            props.onSelect(gridRowParams.row as Expense); // Type cast is due to poor generic typings on datagrid
                    }
                }}
                selectionModel={selectionModel}
            ></DataGrid>
        </div>
    );
}
