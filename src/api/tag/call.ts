// ===================================================================
//                             Imports
// ===================================================================
import {
    AllTagsData,
    CreateTagParams,
    DeleteTagParams,
    MoveTagParams,
    OneTagData,
    TagResponse,
    UpdateTagParams,
} from './types';
import { Tag } from '../../redux/tags/types';
import { get, httpDelete, post, put } from '../../services/httpClient';
// ===================================================================
//                       Helper Functions
// ===================================================================

/**
 * Converts a tag API call response data to a tag object.
 *
 * @param {TagResponse} resp - response object from the API call
 * @returns {Tag} tag object that can be sent to the Redux store
 */
function tagFromResponse(resp: TagResponse): Tag {
    return {
        id: resp.id,
        name: resp.name,
        parentId: resp.parent_id,
        childIds: resp.children_ids ? resp.children_ids : [],
    };
}

// ===================================================================
//                             API Calls
// ===================================================================

/**
 * API call to fetch all tag information.
 *
 * @returns {Promise<AllTagsData>} promise with data to send to Redux, if successful.
 */
export async function getTagsCall(): Promise<AllTagsData> {
    try {
        const data = await get<Array<string>>('/tags', {});

        const tags = data.map((tag: string) =>
            tagFromResponse(JSON.parse(tag)),
        );

        return Promise.resolve({
            tags,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * API call to create a new tag.
 *
 * @param {CreateTagParams} params - input parameters from the page
 * @returns {Promise<OneTagData>} promise with data to send to Redux, if successful.
 */
export async function createTagCall(
    params: CreateTagParams,
): Promise<OneTagData> {
    try {
        const recordParams: Record<string, string> = {
            name: params.name,
        };
        if (params.parentId)
            recordParams['parent_id'] = params.parentId.toString();
        const paramString = new URLSearchParams(recordParams);

        const data = await post<TagResponse>(
            `/tags/?${paramString}`,
            {},
            undefined,
        );
        const tag = tagFromResponse(data);

        return Promise.resolve({
            tag: tag,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * API call to update a tag.
 *
 * @param {UpdateTagParams} params - input parameters from the page
 * @returns {Promise<OneTagData>} promise with data to send to Redux, if successful.
 */
export async function updateTagCall(
    params: UpdateTagParams,
): Promise<OneTagData> {
    try {
        const data = await put<TagResponse>(
            `/tags/${params.id}?name=${params.name}&=${params.parentId}`,
            {},
            undefined,
        );

        const tag = tagFromResponse(data);

        return Promise.resolve({
            tag: tag,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * API call to move a tag.
 *
 * @param {MoveTagParams} params - input parameters from the page
 * @returns {Promise<OneTagData>} promise with data to send to Redux, if successful.
 */
export async function moveTagCall(params: MoveTagParams): Promise<OneTagData> {
    try {
        const data = await put<TagResponse>(
            `/tags/${params.id}?name=${params.name}&parent_id=${params.new_parent_id}`,
            {},
            undefined,
        );

        const tag = tagFromResponse(data);

        return Promise.resolve({
            tag: tag,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * API call to delete a tag.
 *
 * @param {DeleteTagParams} params - input parameters from the page
 * @returns {Promise<OneTagData>} promise with data to send to Redux, if successful.
 */
export async function deleteTagCall(
    params: DeleteTagParams,
): Promise<OneTagData> {
    try {
        const data = await httpDelete<TagResponse>(
            `/tags/${params.id}`,
            {},
            undefined,
        );
        const tag = tagFromResponse(data);

        return Promise.resolve({
            tag: tag,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}
