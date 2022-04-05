// ===================================================================
//                             Imports
// ===================================================================
import Input from '@mui/material/Input';
import TreeItem from '@mui/lab/TreeItem';

import React, { ChangeEvent } from 'react';
import { useTreeItem } from '../misc/hooks/useTreeItem.hook';
import styles from './styles/treeItem.component.module.scss';

// Needed for customizing lab component themes see https://mui.com/components/about-the-lab/#typescript
import type {} from '@mui/lab/themeAugmentation';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type TreeItemType = { id: number; name: string; parentId?: number };
type TreeItemProps = {
    treeItem: TreeItemType;
    updateTreeItemAction: CallableFunction;

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
    } = props;

    // hooks
    const [
        selectedTreeItem,
        isEditing,
        editTreeItem,
        updateTreeItem,
        changeTreeItemName,
        editTreeItemNameInputRef,
        isAdding,
        addTreeItem,
    ] = useTreeItem<TreeItemType, CallableFunction>(treeItem, {
        updateTreeItemAction,
    });

    //#region user action handlers
    const onTreeItemNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.stopPropagation();
        e.preventDefault();

        const name = e.target.value;
        changeTreeItemName(name);
    };

    const onTreeItemNameInputBlur = (): void => {
        updateTreeItem();
    };

    const onEditClick = (): void => {
        editTreeItem();
    };

    const onAddClick = (): void => {
        addTreeItem();
    };
    //#endregion

    return (
        <ThemeProvider theme={theme}>
            <div className={styles['et-tree-item-container']}>
                <TreeItem
                    className={styles['et-tree-item']}
                    nodeId={treeItem.id.toString()}
                    label={
                        <>
                            <div className={styles['et-tree-item-name']}>
                                {isEditing ? (
                                    <Input
                                        className={
                                            styles['et-tree-item-name-input']
                                        }
                                        inputRef={editTreeItemNameInputRef}
                                        value={selectedTreeItem?.name}
                                        onChange={onTreeItemNameChange}
                                        onBlur={onTreeItemNameInputBlur}
                                    />
                                ) : (
                                    name
                                )}
                            </div>
                            <div className={styles['et-tree-item-actions']}>
                                <div
                                    onClick={onEditClick}
                                    title='Edit'
                                    className={`${
                                        styles['et-tree-item-edit']
                                    } ${styles['et-tree-item-action']} ${
                                        isEditing
                                            ? styles[
                                                  'et-tree-item-action-active'
                                              ]
                                            : ''
                                    }`}
                                ></div>
                                <div
                                    onClick={onAddClick}
                                    title='Add'
                                    className={`${styles['et-tree-item-add']} ${
                                        styles['et-tree-item-action']
                                    } ${
                                        isAdding
                                            ? styles[
                                                  'et-tree-item-action-active'
                                              ]
                                            : ''
                                    }`}
                                ></div>
                                <div
                                    title='Delete'
                                    className={`${styles['et-tree-item-delete']} ${styles['et-tree-item-action']}`}
                                ></div>
                            </div>
                        </>
                    }
                >
                    {children}
                </TreeItem>
            </div>
        </ThemeProvider>
    );
};

export default TreeItemComponent;
