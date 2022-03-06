// ===================================================================
//                             Imports
// ===================================================================
import React, { useRef } from 'react';
import { Tag } from '../../redux/tags/types';
import styles from './styles/tag.component.module.scss';
import icons from '../../assets/icons.png';

type TagProps = {
    tag: Tag;
    tags: Record<number, Tag>;
    root: boolean;
};

// ===================================================================
//                            Component
// ===================================================================

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

    const tagRef = useRef<HTMLDivElement>(null);

    const onItemClick = (): void => {
        if (tagRef.current) {
            focusTag(tagRef.current);
        }
    };

    const focusTag = (tagElement: HTMLDivElement): void => {
        tagElement.focus();
    };

    return (
        <div className={styles['et-tag-container']}>
            <div className={styles['et-tag-content']}>
                <div
                    ref={tagRef}
                    onClick={onItemClick}
                    className={styles['et-tag-item']}
                    tabIndex={0}
                >
                    <div className={styles['et-tag-tree-item-indicator']}>
                        {childIds.length > 0 ? (
                            <ChevronRight />
                        ) : (
                            !root && <ChildTreeItemIcon />
                        )}
                    </div>
                    <div className={styles['et-tag-name']}>{name}</div>
                    <div className={styles['et-tag-item-actions']}>
                        <div
                            title='Edit'
                            className={`${styles['et-tag-item-edit']} ${styles['et-tag-item-action']}`}
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
