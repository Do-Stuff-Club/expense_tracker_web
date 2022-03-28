// ===================================================================
//                             Imports
// ===================================================================
import Input from '@mui/material/Input';
import React, {
    useRef,
    useState,
    MouseEvent,
    ChangeEvent,
    RefObject,
} from 'react';
import { useTreeItem } from '../misc/hooks/useTreeItem.hook';
import styles from './styles/treeItem.component.module.scss';

type TreeItemType = { id: number; name: string; parentId?: number };
type TreeItemProps = {
    treeItem: TreeItemType;
    updateTreeItemAction: CallableFunction;

    isRootItem?: boolean;
    expandable?: boolean;
    children?: JSX.Element[];
};

// ===================================================================
//                            Component
// ===================================================================
/**
 * Renders editable tree item
 *
 * @param {TreeItemProps} props - Tree view props for single item
 * @returns {Element} tree view for a single item
 */
const TreeItem = (props: TreeItemProps): JSX.Element => {
    // props extraction
    const {
        treeItem,
        treeItem: { name },
        isRootItem,
        expandable,
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

    // state
    const [expanded, setExpanded] = useState(false);

    // refs
    const treeItemChildrenRef = useRef<HTMLDivElement>(null);
    const treeItemIndicatorRef = useRef<HTMLDivElement>(null);

    //#region user action handlers
    /**
     * Handles tree item indicator click event
     *
     * @param {MouseEvent} e - Mouse click event
     */
    const onTreeItemIndicatorClick = (e: MouseEvent): void => {
        e.preventDefault();

        // expand/collapse the section by changing the physical height
        if (treeItemChildrenRef.current) {
            if (!expanded)
                treeItemChildrenRef.current.style.height = `${treeItemChildrenRef.current.scrollHeight}px`;
            else treeItemChildrenRef.current.style.height = '0';
        }

        // expand/collapse the section
        if (treeItemIndicatorRef.current) {
            treeItemIndicatorRef.current.classList.toggle(styles['expanded']);
        }

        // toggle tree item
        setExpanded(!expanded);
    };

    const onTreeItemNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
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
        <div className={styles['et-tree-item-container']}>
            <div className={styles['et-tree-item-content']}>
                <div className={styles['et-tree-item']}>
                    <div className={styles['et-tree-item-indicator']}>
                        <TreeItemIndicator
                            expanded={expanded}
                            expandable={expandable}
                            isRootItem={isRootItem}
                            iconRef={treeItemIndicatorRef}
                            onIconClick={onTreeItemIndicatorClick}
                        />
                    </div>
                    <div className={styles['et-tree-item-name']}>
                        {isEditing ? (
                            <Input
                                className={styles['et-tree-item-name-input']}
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
                            className={`${styles['et-tree-item-edit']} ${
                                styles['et-tree-item-action']
                            } ${
                                isEditing
                                    ? styles['et-tree-item-action-active']
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
                                    ? styles['et-tree-item-action-active']
                                    : ''
                            }`}
                        ></div>
                        <div
                            title='Delete'
                            className={`${styles['et-tree-item-delete']} ${styles['et-tree-item-action']}`}
                        ></div>
                    </div>
                </div>
                <div
                    ref={treeItemChildrenRef}
                    className={`${styles['et-tree-item-children-container']} ${
                        expanded ? styles['expanded'] : ''
                    }`}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

//#region Helper component
type TreeItemIndicatorProps = {
    expanded: boolean;
    expandable?: boolean;
    isRootItem?: boolean;
    iconRef: RefObject<HTMLDivElement>;
    onIconClick: (e: MouseEvent) => void;
};
/**
 * Renders tree item indicator, chevron right/down, etc
 *
 * @param {TreeItemIndicatorProps} props - Tree item indicator props
 * @returns {Element} Tree item indicator (icon)
 */
const TreeItemIndicator = (props: TreeItemIndicatorProps): JSX.Element => {
    const {
        expandable,
        expanded,
        isRootItem,
        iconRef: treeItemIndicatorRef,
        onIconClick: onTreeItemIndicatorClick,
    } = props;

    if (expandable) {
        // if has children (aka can be expanded) render chevron-right icon
        return (
            <div
                ref={treeItemIndicatorRef}
                onClick={onTreeItemIndicatorClick}
                className={`${styles['et-tree-item-indicator-icon']} ${
                    styles['icon-chevron-right']
                } ${expanded ? styles['expanded'] : ''}`}
            />
        );
    } else if (!isRootItem) {
        // if has no children and is not a root item render bottom left corner
        return (
            <div
                className={`${styles['et-tree-item-indicator-icon']} ${styles['icon-child-tree-item']}`}
            />
        );
    }
    return <></>;
};
//#endregion

export default TreeItem;
