// ===================================================================
//                             Imports
// ===================================================================
import Input from '@mui/material/Input';
import TreeItem from '@mui/lab/TreeItem';

import React, { ChangeEvent, useState, MouseEvent, KeyboardEvent } from 'react';
import { TreeItemState, useTreeItem } from '../misc/hooks/useTreeItem.hook';
import styles from './styles/treeItem.component.module.scss';

// Needed for customizing lab component themes see https://mui.com/components/about-the-lab/#typescript
import type {} from '@mui/lab/themeAugmentation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

type TreeItemType = { id: number; name: string; parentId?: number };
type ChildTreeItemType = { id: number; name: string; parentId: number };
type TreeItemProps = {
    treeItem: TreeItemType;
    updateTreeItemAction: CallableFunction;
    createTreeItemAction: CallableFunction;
    removeTreeItemAction: CallableFunction;

    isRootItem?: boolean;
    expandable?: boolean;
    children?: JSX.Element[];
};

/**
 * Custom theme for the tree item
 */
const theme = createTheme({
    components: {
        MuiTreeItem: {
            styleOverrides: {
                content: {
                    padding: 'padding: 0.2em 0',
                    width: '100%',
                    alignItems: 'center',

                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',

                        [`& .${styles['et-tree-item-actions']}`]: {
                            visibility: 'visible',
                        },
                    },

                    '&:focus-within': {
                        backgroundColor: 'rgba(0, 0, 0, 0.12)',

                        [`& .${styles['et-tree-item-actions']}`]: {
                            visibility: 'visible',
                        },
                    },

                    '&.Mui-selected': {
                        [`& .${styles['et-tree-item-actions']}`]: {
                            visibility: 'visible',
                        },
                    },
                },
                label: {
                    display: 'flex',
                },
            },
        },
    },
});

// ===================================================================
//                            Component
// ===================================================================
/**
 * Renders editable tree item
 *
 * @param {TreeItemProps} props - Tree view props for single item
 * @returns {Element} tree view for a single item
 */
const TreeItemComponent = (props: TreeItemProps): JSX.Element => {
    // props extraction
    const {
        treeItem,
        treeItem: { name },
        children,
        updateTreeItemAction,
        createTreeItemAction,
        removeTreeItemAction,
    } = props;

    // hooks
    const [
        selectedTreeItem,
        selectedChildTreeItem,
        state,
        editTreeItem,
        cancelEditTreeItem,
        updateTreeItem,
        createTreeItem,
        changeTreeItemName,
        editTreeItemNameInputRef,
        createTreeItemNameInputRef,
        addTreeItem,
        changeCreateItemName,
        cancelCreateTreeItem,
        deleteTreeItem,
    ] = useTreeItem<TreeItemType, ChildTreeItemType, CallableFunction>(
        treeItem,
        { name: '', id: -1, parentId: treeItem.id },
        {
            updateTreeItemAction,
            createTreeItemAction,
        },
    );

    // state
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    //#region user action handlers
    //#region framework action handlers
    /**
     * Edit input blur handler
     */
    const onTreeItemNameInputBlur = (): void => {
        cancelEditTreeItem(); // FIXME review this
    };

    /**
     * Prevent onBlurs from occuring before button clicks when editing a tree item.
     * Without this, onBlur() gets called before onClick() handlers for edit submit and cancel,
     * rendering those buttons useless.
     *
     * @param {MouseEvent} e - The event object for MouseDown
     */
    const onTreeItemEditMouseDown = (e: MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
    };

    /**
     * Submit edits when pressing "Enter"
     * TODO maybe factor this out into a custom hook?
     *
     * @param {KeyboardEvent} e - The event object for KeyPress
     */
    const onTreeItemEditKeyPress = (e: KeyboardEvent<HTMLDivElement>): void => {
        if (e.key === 'Enter') onTreeItemNameInputSubmit();
    };

    /**
     * Cancel edits when pressing "ESC"
     *
     * Needs to be KeyDown instead of KeyPress:
     * https://stackoverflow.com/questions/46878707/how-do-i-detect-the-keyboardevent-for-the-escape-key
     *
     * TODO maybe factor this out into a custom hook?
     *
     * @param {KeyboardEvent} e - The event object for KeyDown
     */
    const onTreeItemEditEsc = (e: KeyboardEvent<HTMLDivElement>): void => {
        if (e.key === 'Escape') onTreeItemNameInputCancel();
    };

    /**
     * Show delete prompt when pressing "DEL"
     *
     * Needs to be KeyDown instead of KeyPress:
     * https://stackoverflow.com/questions/46878707/how-do-i-detect-the-keyboardevent-for-the-escape-key
     *
     * TODO maybe factor this out into a custom hook?
     *
     * @param {KeyboardEvent} e - The event object for KeyDown
     */
    const onTreeItemDel = (e: KeyboardEvent<HTMLDivElement>): void => {
        console.log(e.key);
        if (e.key === 'Delete') onDeleteClick();
    };

    /**
     * Edit input submit handler
     */
    const onTreeItemNameInputSubmit = (): void => {
        updateTreeItem();
    };

    /**
     * Edit input submit handler
     */
    const onTreeItemNameInputCancel = (): void => {
        cancelEditTreeItem();
    };

    /**
     * Edit icon click handler
     */
    const onEditClick = (): void => {
        editTreeItem();
    };

    /**
     * Add icon click handler
     */
    const onAddClick = (): void => {
        addTreeItem();
    };

    /**
     * Delete icon click handler
     */
    const onDeleteClick = (): void => {
        deleteTreeItem();

        // show the confirmation dialog
        openDeleteDialog();
    };
    //#endregion

    /**
     * Updates the name of the selected tree item
     *
     * @param {ChangeEvent<HTMLInputElement>} e - input Event
     */
    const onTreeItemNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.stopPropagation();
        e.preventDefault();

        const name = e.target.value;
        changeTreeItemName(name);
    };

    //#region create tree item
    /**
     * Create input submit handler
     */
    const onCreateTreeItemNameInputSubmit = (): void => {
        createTreeItem();
    };

    /**
     * Create input submit handler
     */
    const onCreateTreeItemNameInputCancel = (): void => {
        console.log('cancel create');
        cancelCreateTreeItem();
    };

    const onTreeItemCreateKeyPress = (
        e: KeyboardEvent<HTMLDivElement>,
    ): void => {
        if (e.key === 'Enter') onCreateTreeItemNameInputSubmit();
    };

    /**
     * Cancel edits when pressing "ESC"
     *
     * Needs to be KeyDown instead of KeyPress:
     * https://stackoverflow.com/questions/46878707/how-do-i-detect-the-keyboardevent-for-the-escape-key
     *
     * TODO maybe factor this out into a custom hook?
     *
     * @param {KeyboardEvent} e - The event object for KeyDown
     */
    const onTreeItemCreateEsc = (e: KeyboardEvent<HTMLDivElement>): void => {
        if (e.key === 'Escape') onCreateTreeItemNameInputCancel();
    };

    const onTreeItemCreateMouseDown = (e: MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
    };

    const onCreateTreeItemNameChange = (
        e: ChangeEvent<HTMLInputElement>,
    ): void => {
        console.log('changing child name');
        e.stopPropagation();
        e.preventDefault();

        const name = e.target.value;
        changeCreateItemName(name);
    };

    const onCreateTreeItemNameInputBlur = (): void => {
        cancelEditTreeItem(); // FIXME review this
    };

    //#endregion

    //#region delete tree item

    /**
     * Opens a confirmation dialog for delete action
     */
    const openDeleteDialog = (): void => {
        setShowDeleteDialog(true);
    };

    /**
     * Closes the confirmation dialog
     */
    const closeDeleteDialog = (): void => {
        setShowDeleteDialog(false);
    };

    /**
     * Removes tree item
     */
    const removeTreeItem = (): void => {
        // close the dialog
        closeDeleteDialog();

        //remove tree item
        removeTreeItemAction(treeItem.id);
    };
    //#endregion

    //#endregion
    const createChild = (
        <div
            className={styles['et-tree-item-container']}
            key={treeItem.id.toString() + '_new_child'}
        >
            <TreeItem
                className={styles['et-tree-item']}
                nodeId={treeItem.id.toString() + '_new_child'}
                label={
                    <>
                        <div
                            className={styles['et-tree-item-name']}
                            onKeyPress={onTreeItemCreateKeyPress} // Handler for Enter
                            onKeyDown={onTreeItemCreateEsc} // Handler for ESC
                        >
                            <Input
                                className={styles['et-tree-item-name-input']}
                                inputRef={createTreeItemNameInputRef}
                                value={selectedChildTreeItem?.name}
                                onChange={onCreateTreeItemNameChange}
                                onBlur={onCreateTreeItemNameInputBlur}
                            />
                        </div>
                        <div
                            className={styles['et-tree-item-actions']}
                            onMouseDown={onTreeItemCreateMouseDown}
                            onKeyPress={onTreeItemCreateKeyPress}
                        >
                            <div
                                onClick={onCreateTreeItemNameInputSubmit}
                                title='Submit'
                                className={`${styles['et-tree-item-edit-done']} ${styles['et-tree-item-action']} 
                                            `}
                            ></div>
                            <div
                                onClick={onCreateTreeItemNameInputCancel}
                                title='Cancel'
                                className={`${styles['et-tree-item-edit-cancel']} ${styles['et-tree-item-action']}`}
                            ></div>
                        </div>
                    </>
                }
            ></TreeItem>
        </div>
    );
    const treeChildren =
        state == TreeItemState.CREATE
            ? [createChild, ...(children || [])] // funny trick since children can be undefined
            : children;

    console.log(state);
    return (
        <ThemeProvider theme={theme}>
            <div className={styles['et-tree-item-container']}>
                <TreeItem
                    className={styles['et-tree-item']}
                    nodeId={treeItem.id.toString()}
                    label={
                        <>
                            {state == TreeItemState.EDIT ? (
                                <>
                                    <div
                                        className={styles['et-tree-item-name']}
                                        onKeyPress={onTreeItemEditKeyPress} // Handler for Enter
                                        onKeyDown={onTreeItemEditEsc} // Handler for ESC
                                    >
                                        <Input
                                            className={
                                                styles[
                                                    'et-tree-item-name-input'
                                                ]
                                            }
                                            inputRef={editTreeItemNameInputRef}
                                            value={selectedTreeItem?.name}
                                            onChange={onTreeItemNameChange}
                                            onBlur={onTreeItemNameInputBlur}
                                        />
                                    </div>
                                    <div
                                        className={
                                            styles['et-tree-item-actions']
                                        }
                                        onMouseDown={onTreeItemEditMouseDown}
                                        onKeyPress={onTreeItemEditKeyPress}
                                    >
                                        <div
                                            onClick={onTreeItemNameInputSubmit}
                                            title='Submit'
                                            className={`${styles['et-tree-item-edit-done']} ${styles['et-tree-item-action']} 
                                            `}
                                        ></div>
                                        <div
                                            onClick={onTreeItemNameInputCancel}
                                            title='Cancel'
                                            className={`${styles['et-tree-item-edit-cancel']} ${styles['et-tree-item-action']}`}
                                        ></div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        className={styles['et-tree-item-name']}
                                        onDoubleClick={onEditClick}
                                        onKeyDown={onTreeItemDel}
                                        tabIndex={0}
                                    >
                                        {name}
                                    </div>
                                    <div
                                        className={
                                            styles['et-tree-item-actions']
                                        }
                                    >
                                        <div
                                            onClick={onEditClick}
                                            title='Edit'
                                            className={`${styles['et-tree-item-edit']} ${styles['et-tree-item-action']} `}
                                        ></div>
                                        <div
                                            onClick={onAddClick}
                                            title='Add'
                                            className={`${styles['et-tree-item-add']} ${styles['et-tree-item-action']}`}
                                        ></div>
                                        <div
                                            onClick={onDeleteClick}
                                            title='Delete'
                                            className={`${styles['et-tree-item-delete']} ${styles['et-tree-item-action']}`}
                                        ></div>
                                        <Dialog
                                            open={showDeleteDialog}
                                            onClose={closeDeleteDialog}
                                        >
                                            <DialogTitle>Warning</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    {`Are you sure you want to delete '${name}' tag. This action is permanent`}
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button
                                                    variant='outlined'
                                                    onClick={closeDeleteDialog}
                                                >
                                                    No
                                                </Button>
                                                <Button
                                                    onClick={removeTreeItem}
                                                    variant='outlined'
                                                    color='warning'
                                                >
                                                    Yes
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                </>
                            )}
                        </>
                    }
                >
                    {treeChildren}
                </TreeItem>
            </div>
        </ThemeProvider>
    );
};

export default TreeItemComponent;
