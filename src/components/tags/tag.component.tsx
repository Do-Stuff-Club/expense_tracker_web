// ===================================================================
//                             Imports
// ===================================================================
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Input from '@mui/material/Input';

import { Tag } from '../../redux/tags/types';
import styles from './styles/tag.component.module.scss';

type TagProps = {
    tag: Tag;
    tags: Record<number, Tag>;
    root: boolean;
};

// ===================================================================
//                            Component
// ===================================================================

//TODO: refactor this component
/**
 * Renders hierarchical view of a single tag
 *
 * @param {TagProps} props - Tag component props
 * @returns {Element} a hierarchical view of a single tag
 */
const TagComponent = (props: TagProps): JSX.Element => {
    const {
        tag,
        tag: { name, childIds },
        tags,
        root,
    } = props;

    const editTagNameInputRef = useRef<HTMLInputElement>(null);

    const [selectedTag, setSelectedTag] = useState<Tag | undefined>(undefined);
    const [isEditing, setIsEditing] = useState(false);

    // focus the tag name input once input gets rendered
    useEffect(() => {
        editTagNameInputRef?.current?.focus();
    }, [isEditing]);

    const onEditClick = (): void => {
        // set current tag as selected
        setSelectedTag(tag);

        // enable editing
        setIsEditing(true);
    };

    const onTagNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();

        const name = e.target.value;
        if (selectedTag) setSelectedTag({ ...selectedTag, name });
    };

    const onTagNameInputBlur = (): void => {
        setSelectedTag(undefined);
        setIsEditing(false);
    };

    return (
        <div className={styles['et-tag-container']}>
            <div className={styles['et-tag-content']}>
                <div className={styles['et-tag-item']}>
                    <div className={styles['et-tag-tree-item-indicator']}>
                        {childIds.length > 0 ? (
                            <ChevronRight />
                        ) : (
                            !root && <ChildTreeItemIcon />
                        )}
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
                        <TagComponent
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

//#region Private methods
//TODO: move this to a utils or other helpers folder
const ChevronRight = (): JSX.Element => {
    return (
        <svg
            className={styles['et-tag-tree-item-indicator-icon']}
            focusable='false'
            aria-hidden='true'
            viewBox='0 0 24 24'
        >
            <path d='M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'></path>
        </svg>
    );
};

//TODO: move this to a utils or other helpers folder
const ChildTreeItemIcon = (): JSX.Element => {
    return (
        <svg
            className={styles['et-tag-tree-item-indicator-icon']}
            focusable='false'
            aria-hidden='true'
            viewBox='0 0 24 24'
        >
            <polyline points='14,0 14,14 28,14' fill='none' stroke='black' />
        </svg>
    );
};
//#endregion

export default TagComponent;
