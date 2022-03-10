// ===================================================================
//                             Imports
// ===================================================================
import React, { ChangeEvent } from 'react';
import Input from '@mui/material/Input';

import TagContainer from '../../containers/tags/tag.container';

import { Tag } from '../../redux/tags/types';
import styles from './styles/tag.component.module.scss';
import { OneTagData, UpdateTagParams } from '../../api/tag/types';
import { useTreeItem } from '../misc/hooks/useTreeItem.hook';

type TagComponentProps = {
    tag: Tag;
    tags: Record<number, Tag>;
    root: boolean;

    // TODO: add other actions (add new tag, move tag, delete tag)
    updateTagAction: (data: UpdateTagParams) => Promise<OneTagData | undefined>;
};

// ===================================================================
//                            Component
// ===================================================================

//TODO: Create reusable tree item component
/**
 * Renders hierarchical view of a single tag
 *
 * @param {TagComponentProps} props - Tag component props
 * @returns {Element} a hierarchical view of a single tag
 */
const TagComponent = (props: TagComponentProps): JSX.Element => {
    const {
        tag,
        tag: { name, childIds },
        tags,
        root,
        updateTagAction,
    } = props;

    const [
        selectedTag,
        isEditing,
        editTag,
        updateTag,
        changeTagName,
        editTagNameInputRef,
    ] = useTreeItem<
        Tag,
        (data: UpdateTagParams) => Promise<OneTagData | undefined>
    >(tag, { updateTreeItemAction: updateTagAction });

    //#region action handlers
    const onEditClick = (): void => {
        editTag();
    };

    const onTagNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();

        const name = e.target.value;
        changeTagName(name);
    };

    const onTagNameInputBlur = (): void => {
        updateTag();
    };
    //#endregion

    /**
     * Renders tree item indicator, chevron right/down, etc
     *
     * @returns {Element} Tree item indicator (icon)
     */
    const TreeItemIndicator = (): JSX.Element => {
        if (childIds.length > 0) {
            // if has children (aka can be expanded) render chevron-right icon
            return (
                <div
                    className={`${styles['et-tag-tree-item-indicator-icon']} ${styles['icon-chevron-right']}`}
                />
            );
        } else if (!root) {
            // if has no children and is not a root item render bottom left corner
            return (
                <div
                    className={`${styles['et-tag-tree-item-indicator-icon']} ${styles['icon-child-tree-item']}`}
                />
            );
        }
        return <></>;
    };

    return (
        <div className={styles['et-tag-container']}>
            <div className={styles['et-tag-content']}>
                <div className={styles['et-tag-item']}>
                    <div className={styles['et-tag-tree-item-indicator']}>
                        <TreeItemIndicator />
                    </div>
                    <div className={styles['et-tag-name']}>
                        {isEditing ? (
                            <Input
                                className={styles['et-tag-name-input']}
                                inputRef={editTagNameInputRef}
                                value={selectedTag?.name}
                                onChange={onTagNameChange}
                                onBlur={onTagNameInputBlur}
                            />
                        ) : (
                            name
                        )}
                    </div>
                    <div className={styles['et-tag-item-actions']}>
                        <div
                            onClick={onEditClick}
                            title='Edit'
                            className={`${styles['et-tag-item-edit']} ${
                                styles['et-tag-item-action']
                            } ${
                                isEditing
                                    ? styles['et-tag-item-action-active']
                                    : ''
                            }`}
                        ></div>
                        <div
                            title='Add'
                            className={`${styles['et-tag-item-add']} ${styles['et-tag-item-action']}`}
                        ></div>
                        <div
                            title='Delete'
                            className={`${styles['et-tag-item-delete']} ${styles['et-tag-item-action']}`}
                        ></div>
                    </div>
                </div>
                <div className={styles['et-tag-children-container']}>
                    {childIds.map((id) => (
                        <TagContainer
                            key={id}
                            tag={tags[id]}
                            tags={tags}
                            root={false}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TagComponent;
