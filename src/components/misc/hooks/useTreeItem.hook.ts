import { RefObject, useEffect, useRef, useState } from 'react';

/* eslint-disable jsdoc/no-undefined-types */
/**
 * Custom hook that takes care of tree item actions
 *
 * @param {TreeItemType} treeItem - Current tree item
 * @param {{updateTreeItemAction: UpdateActionType}} actions - Store actions (Edit, add, delete, etc)
 * @param {UpdateActionType} actions.updateTreeItemAction - Update action for the specific tree item
 * @returns { [TreeItemType | undefined, boolean, () => void, () => void, (name: string) => void, RefObject<HTMLInputElement>]} - Array of necessary objects and functions
 */
export const useTreeItem = <
    TreeItemType extends { id: number; name: string; parentId?: number },
    UpdateActionType extends CallableFunction
>(
    treeItem: TreeItemType,
    actions: {
        updateTreeItemAction: UpdateActionType;
    },
): [
    TreeItemType | undefined,
    boolean,
    () => void,
    () => void,
    () => void,
    (name: string) => void,
    RefObject<HTMLInputElement>,
    () => void,
    () => void,
] => {
    // used for auto focusing
    const editTreeItemNameInputRef = useRef<HTMLInputElement>(null);

    // states
    const [selectedTreeItem, setSelectedTreeItem] = useState<
        TreeItemType | undefined
    >(undefined);
    const [isEditing, setIsEditing] = useState(false);

    // focus the tree item name input once input gets rendered
    useEffect(() => {
        editTreeItemNameInputRef?.current?.focus();
    }, [isEditing]);

    // TODO: Can be a separate hook
    //#region Update tree item name

    /**
     * Enables edit mode for changing the name of the tree item
     */
    const editTreeItem = (): void => {
        // set current item as selected
        setSelectedTreeItem(treeItem);

        // enable editing
        setIsEditing(true);
    };

    /**
     * Cancels edit mode for changing the name of the tree item
     */
    const cancelEditTreeItem = (): void => {
        // set current item as selected
        setSelectedTreeItem(undefined); // FIXME double check this

        // enable editing
        setIsEditing(false);
    };

    /**
     * Adds new tree item
     */
    const addTreeItem = (): void => {
        // set current item as selected
        setSelectedTreeItem(treeItem);
    };

    /**
     * Deletes selected tree item
     */
    const deleteTreeItem = (): void => {
        // set current item as selected
        setSelectedTreeItem(treeItem);
    };

    /**
     * Changes name of the tree item
     *
     * @param {string} name - New name of the tree item
     */
    const changeItemName = (name: string): void => {
        if (selectedTreeItem)
            setSelectedTreeItem({ ...selectedTreeItem, name });
    };

    /**
     * Updates the tree item by called a store action
     */
    const updateTreeItem = (): void => {
        const { updateTreeItemAction } = actions;

        //TODO: Needs to be updated! Currently only updates item name
        // update the item
        if (selectedTreeItem && selectedTreeItem.name !== treeItem.name) {
            updateTreeItemAction({
                id: selectedTreeItem.id,
                name: selectedTreeItem.name,
                parent_id: selectedTreeItem.parentId,
            });
        }

        // unselect the tree item and close editing mode
        setSelectedTreeItem(undefined);
        setIsEditing(false);
    };

    //#endregion

    return [
        selectedTreeItem,

        isEditing,
        editTreeItem,
        cancelEditTreeItem,
        updateTreeItem,
        changeItemName,
        editTreeItemNameInputRef,

        addTreeItem,
        deleteTreeItem,
    ];
};
