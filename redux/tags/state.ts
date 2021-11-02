// ===================================================================
//                             Imports
// ===================================================================
import { Tag, TagState } from './types';
import produce, { castDraft } from 'immer';

// ===================================================================
//                             Functions
// ===================================================================
export const defaultTagState: TagState = {
    map: {},
    rootIds: [],
};

/**
 * Adds a new tag into a TagState. The updated TagState is returned. Does not mutate state. If the tag ID is already in the tag state, the existing tag is updated.
 *
 * @param {TagState} base initial tag state
 * @param {Tag} tag tag to add
 *
 * @returns {TagState} updated tag state
 */
export const setTagInState = produce((draft: TagState, tag: Tag) => {
    const castedDraft = castDraft(draft);
    let oldParent;
    if (castedDraft.map[tag.id]) {
        oldParent = castedDraft.map[tag.id].parentId;
    }
    castedDraft.map[tag.id] = castDraft(tag);

    // if old parent is not equal to tag's parent, then must delete tag from old parent
    if (oldParent && tag.parentId && oldParent !== tag.parentId) {
        castedDraft.map[oldParent].childIds = castedDraft.map[
            oldParent
        ].childIds.filter((id) => id != tag.id);
    }

    // FIXME clean up this mess
    if (
        tag.parentId && // Check that tag has parent
        castedDraft.map[tag.parentId] && // Check that parent is not null (due to bug in server closure_tree plugin)
        !castedDraft.map[tag.parentId].childIds.includes(tag.id) // Check to update the parent when creating a child tag
    ) {
        castedDraft.map[tag.parentId].childIds.push(tag.id);
    }

    // if tag has no parent and not included in root ids, add to root
    if (tag.parentId == undefined && !castedDraft.rootIds.includes(tag.id)) {
        castedDraft.rootIds.push(tag.id);
    }

    // if tag has parent and included in tag ids, remove from root ids
    if (tag.parentId != undefined && castedDraft.rootIds.includes(tag.id)) {
        castedDraft.rootIds = castedDraft.rootIds.filter((id) => id != tag.id);
    }
});

/**
 * Removes a tag from TagState. The updated TagState is returned. Does not mutate state. If hte tag ID is not in the Tag State, this function returns an unchanged version of the tag state.
 *
 * @param {TagState} base initial tag state
 * @param {Tag} tag tag to remove
 *
 * @returns {TagState} updated tag state
 */
export const removeTagInState = produce((draft: TagState, tag: Tag) => {
    const castedDraft = castDraft(draft);

    // delete tag from its parents' children if it has a parent
    if (tag.parentId != undefined) {
        castedDraft.map[tag.parentId].childIds = castedDraft.map[
            tag.parentId
        ].childIds.filter((id) => id != tag.id);
    }

    // delete tag itself
    delete castedDraft.map[tag.id];

    castedDraft.rootIds = draft.rootIds.filter((id) => id != tag.id);
});

/**
 * Returns true if the specified id is in the TagState, and false otherwise
 *
 * @param {TagState} state tag state
 * @param {number} id id to check
 *
 * @returns {boolean} true if [id] is in [state], false otherwise
 */
export const containsId = (state: TagState, id: number): boolean => {
    return id in state.map;
};
