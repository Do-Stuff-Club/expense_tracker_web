import { RefObject, useEffect, useRef, useState } from 'react';

export enum TreeItemState {
    DEFAULT, // Default state
    EDIT, // Edit mode
    CREATE, // Creating new child tag
    // TODO should delete be in here?
}

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
    ChildTreeItemType extends { id: number; name: string; parentId: number },
    UpdateActionType extends CallableFunction
>(
    treeItem: TreeItemType,
    childTreeItem: ChildTreeItemType,
    actions: {
        updateTreeItemAction: UpdateActionType;
        createTreeItemAction: UpdateActionType;
    },
): [
    TreeItemType | undefined,
    ChildTreeItemType | undefined,
    TreeItemState,
    () => void,
    () => void,
    () => void,
    () => void,
    (name: string) => void,
    RefObject<HTMLInputElement>,
    RefObject<HTMLInputElement>,
    () => void,
    (name: string) => void,
    () => void,
    () => void,
] => {
    // used for auto focusing
    const editTreeItemNameInputRef = useRef<HTMLInputElement>(null);
    const createTreeItemNameInputRef = useRef<HTMLInputElement>(null);

    // states
    const [selectedTreeItem, setSelectedTreeItem] = useState<
        TreeItemType | undefined
    >(undefined);
    const [selectedChildTreeItem, setSelectedChildTreeItem] = useState<
        ChildTreeItemType | undefined
    >(undefined);
    const [state, setState] = useState(TreeItemState.DEFAULT);

    // focus the tree item name input once input gets rendered
    useEffect(() => {
        editTreeItemNameInputRef?.current?.focus();
    }, [state == TreeItemState.EDIT]);
    useEffect(() => {
        createTreeItemNameInputRef?.current?.focus();
    }, [state == TreeItemState.CREATE]);

    // TODO: Can be a separate hook
    //#region Update tree item name

    /**
     * Enables edit mode for changing the name of the tree item
     */
    const editTreeItem = (): void => {
        // set current item as selected
        setSelectedTreeItem(treeItem);

        // enable editing
        setState(TreeItemState.EDIT);
    };

    /**
     * Cancels edit mode for changing the name of the tree item
     */
    const cancelEditTreeItem = (): void => {
        // set current item as selected
        setSelectedTreeItem(undefined); // FIXME double check this

        // disable editing
        setState(TreeItemState.DEFAULT);
    };

    /**
     * Adds new tree item
     */
    const addTreeItem = (): void => {
        // set current item as selected
        setSelectedTreeItem(treeItem);
        setSelectedChildTreeItem(childTreeItem);

        setState(TreeItemState.CREATE);
    };

    /**
     * Cancels add mode for creating new child tree item
     */
    const cancelCreateTreeItem = (): void => {
        // set current item as selected
        setSelectedTreeItem(undefined); // FIXME double check this
        setSelectedChildTreeItem(undefined); // FIXME double check this

        // disable editing
        setState(TreeItemState.DEFAULT);
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
     * Changes name of the tree item
     *
     * @param {string} name - New name of the tree item
     */
    const changeCreateItemName = (name: string): void => {
        if (selectedChildTreeItem)
            setSelectedChildTreeItem({ ...childTreeItem, name });
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
                parentId: selectedTreeItem.parentId,
            });
        }

        // unselect the tree item and close editing mode
        setSelectedTreeItem(undefined);
        setState(TreeItemState.DEFAULT);
    };

    //#endregion

    /**
     * Creates the tree item by called a store action
     */
    const createTreeItem = (): void => {
        const { createTreeItemAction } = actions;
        // TODO gotta review this condition and figure out if error messages are needed
        if (selectedChildTreeItem && selectedChildTreeItem.name.trim() != '')
            createTreeItemAction({
                name: selectedChildTreeItem.name,
                parentId: selectedChildTreeItem.parentId,
            });
        console.log(selectedChildTreeItem?.parentId);

        // unselect the tree item and close editing mode
        setSelectedTreeItem(undefined);
        setSelectedChildTreeItem(undefined);
        setState(TreeItemState.DEFAULT);
    };

    return [
        selectedTreeItem,
        selectedChildTreeItem,

        state,
        editTreeItem,
        cancelEditTreeItem,
        updateTreeItem,
        createTreeItem,
        changeItemName,
        editTreeItemNameInputRef,
        createTreeItemNameInputRef,

        addTreeItem,
        changeCreateItemName,
        cancelCreateTreeItem,
        deleteTreeItem,
    ];
};
