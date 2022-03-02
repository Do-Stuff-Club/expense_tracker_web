// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
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

    // console.log(tag);
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
                    <div className={styles['et-tag-name']}>{name}</div>
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

//TODO: move this ot a utils or other helpers folder
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

//TODO: move this ot a utils or other helpers folder
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

export default TagComponent;
