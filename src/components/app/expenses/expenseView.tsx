// ===================================================================
//                             Imports
// ===================================================================
import { Expense } from '../../../redux/expenses/types';
import React, { useState } from 'react';
import {
    DataGrid,
    GridColDef,
    GridSelectionModel,
    GridValueGetterParams,
} from '@mui/x-data-grid';
import { Tag } from '../../../redux/tags/types';

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
        valueGetter: (params: GridValueGetterParams) =>
            (params.row.tags as Tag[]).reduce(
                (acc: string, tag: Tag) => acc + ',' + tag.name,
                '',
            ),
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
