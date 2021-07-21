// ===================================================================
//                             Imports
// ===================================================================
import { Map, Set } from 'immutable';

// ===================================================================
//                              Types
// ===================================================================
export interface Tag {
    name: string;
    id: number;
    parentId?: number;
    childIds?: ReadonlySet<number>;
}

export interface TagState {
    // Basic construction functions
    fromTags: (tags: ReadonlyArray<Tag>) => TagState;
    addTag: (tag: Tag, state: TagState) => TagState; // Adds new tag if given tag is not in TagState
    updateTag: (tag: Tag, state: TagState) => TagState; // Updates if given tag is in TagState
    deleteTag: (tag: Tag, state: TagState) => TagState; // Deletes if given tag is in TagState
    // Lookup functions
    getTagById: (id: number, state: TagState) => Tag | undefined;
}

// ===================================================================
//                           Implementation
// ===================================================================
export class MapTagState implements TagState {
    private map: Map<number, Tag>;
    private rootTags: Set<number>;

    constructor();
    constructor(map: Map<number, Tag>, rootTags: Set<number>);
    constructor(map?: Map<number, Tag>, rootTags?: Set<number>) {
        if (map === undefined && rootTags === undefined) {
            this.map = Map<number, Tag>();
            this.rootTags = Set<number>();
        } else if (map !== undefined && rootTags !== undefined) {
            this.map = map;
            this.rootTags = rootTags;
        } else {
            //FIXME throw error
            this.map = Map<number, Tag>();
            this.rootTags = Set<number>();
        }
    }

    fromTags(tags: ReadonlyArray<Tag>): TagState {
        let newMap = Map<number, Tag>();
        let newRoots = Set<number>();

        tags.forEach((tag) => {
            newMap = newMap.set(tag.id, tag);
            if (tag.parentId) newRoots = newRoots.add(tag.id);
        });

        return new MapTagState(newMap, newRoots);
    }

    addTag(tag: Tag, state: TagState): TagState {
        // Do a cast since typescript does not have abstract types
        // Lint wants us to cast to unkown before MapTagState
        const castState = (state as unknown) as MapTagState;

        // Return unchanged state if ID is in tagstate
        if (castState.getTagById(tag.id) != undefined) return state;

        const newMap = castState.map.set(tag.id, tag);
        const newRoots = tag.parentId
            ? castState.rootTags
            : castState.rootTags.add(tag.id);

        return new MapTagState(newMap, newRoots);
    }

    updateTag(tag: Tag, state: TagState): TagState {
        // Do a cast since typescript does not have abstract types
        // Lint wants us to cast to unkown before MapTagState
        const castState = (state as unknown) as MapTagState;

        // Return unchanged state if ID is not in tagstate
        if (castState.getTagById(tag.id) == undefined) return state;

        const newMap = castState.map.set(tag.id, tag);

        let newRoots: Set<number>;
        if (tag.parentId) {
            // Tag is not a root- remove from array if needed
            newRoots = castState.rootTags.delete(tag.id);
        } else {
            // Tag is root- add to set if needed
            newRoots = castState.rootTags.add(tag.id);
        }

        return new MapTagState(newMap, newRoots);
    }

    deleteTag(tag: Tag, state: TagState): TagState {
        // Do a cast since typescript does not have abstract types
        // Lint wants us to cast to unkown before MapTagState
        const castState = (state as unknown) as MapTagState;

        const newMap = castState.map.delete(tag.id);
        const newRoots = castState.rootTags.delete(tag.id);

        return new MapTagState(newMap, newRoots);
    }

    getTagById(id: number): Tag | undefined {
        return this.map.get(id);
    }
}
