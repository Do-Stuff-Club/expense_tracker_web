export interface TagTree {
    name: string;
    id: number;
    parentId?: number;
    childrenIds?: ReadonlyArray<number>;
}

export interface TagState {
    map: Map<number, TagTree>;
    rootIds: ReadonlyArray<number>
}

// === Crafting tree ===

export const crafts: TagTree = {
    name: 'Crafts',
    id: 0,
    childrenIds: [1, 2],
}

export const sewing: TagTree = {
    name: 'Sewing',
    id: 1,
    parentId: 0,
}

export const crochet: TagTree = {
    name: 'Crocheting',
    id: 2,
    parentId: 0,
}

// === Utilities tree ===
export const utils: TagTree = {
    name: 'Utilities',
    id: 3,
    childrenIds: [4, 5, 6]
}

export const elec: TagTree = {
    name: 'electricity',
    id: 4,
    parentId: 3,
    childrenIds: [7]
}

export const gas: TagTree = {
    name: 'gas',
    id: 5,
    parentId: 3,
}

export const internet: TagTree = {
    name: 'internet',
    id: 6,
    parentId: 3,
}

export const solar: TagTree = {
    name: 'solar',
    parentId: 4,
    id: 7,
}

// Exported tree
export const dummyTree: TagState = {
    map: new Map([
        [crafts.id, crafts],
        [sewing.id, sewing],
        [crochet.id, crochet],
        [utils.id, utils],
        [elec.id, elec],
        [gas.id, gas],
        [internet.id, internet],
        [solar.id, solar],
    ]),
    rootIds: [crafts.id, utils.id]
}