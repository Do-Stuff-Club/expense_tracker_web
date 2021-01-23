import axios from "axios";
import qs from "qs";
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { AuthHeaders } from "../user/types";
import { Category, Tag, TagActionTypes } from "./types";

export interface FetchTagParams {
  user_id: number;
  headers: AuthHeaders;
}

export const fetchTags = (
  params: FetchTagParams
): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  try {
    console.log("fetchTags!");
    console.log(params);
    const response = await axios({
      method: "get",
      baseURL: "https://expense-tracker-test-api.herokuapp.com/",
      url: "/categories",
      params: { user_id: params.user_id },
      headers: params.headers,
    });
    console.log(response);
    const categories: ReadonlyArray<Category> = response.data.map(
      (category: any) => {
        const obj = JSON.parse(category);
        const tags: ReadonlyArray<Tag> = obj.tags.map((tag: any) => ({
          id: tag.id,
          name: tag.name,
        }));
        return {
          id: obj.id,
          name: obj.name,
          required: obj.required,
          tags: tags,
        };
      }
    );

    dispatch({
      type: TagActionTypes.FETCH,
      payload: {
        authHeaders: {
          client: response.headers["client"],
          expiry: response.headers["expiry"],
          uid: response.headers["uid"],
          "access-token": response.headers["access-token"],
          "token-type": response.headers["token-type"],
        },
        tags: {
          categories: categories,
        },
      },
    });

    return Promise.resolve("a fancy message"); // FIXME
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return Promise.reject(error);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message); // FIXME
    }
  }
};

export interface NewCategoryParams {
  name: string;
  required: boolean;
  tags: ReadonlyArray<string>;
  headers: AuthHeaders;
}

export const newCategory = (
  params: NewCategoryParams
): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  try {
    console.log("new Category!");
    // Format nested params correctly
    // FIXME maybe let's move off axios since it has this stupid bug
    axios.interceptors.request.use((config) => {
      window.console.log(config);

      config.paramsSerializer = (params) => {
        return qs.stringify(params, {
          arrayFormat: "brackets",
          encode: false,
        });
      };

      return config;
    });
    console.log(params);
    const response = await axios({
      method: "post",
      baseURL: "https://expense-tracker-test-api.herokuapp.com/",
      url: "/categories",
      params: {
        category: {
          name: params.name,
          required: params.required,
          tags_attributes: params.tags.map((tag) => ({ name: tag })),
        },
      },
      headers: params.headers,
    });
    console.log(response);

    dispatch({
      type: TagActionTypes.CREATE_CATEGORY,
      payload: {
        authHeaders: {
          client: response.headers["client"],
          expiry: response.headers["expiry"],
          uid: response.headers["uid"],
          "access-token": response.headers["access-token"],
          "token-type": response.headers["token-type"],
        },
        tags: response.data,
      },
    });

    return Promise.resolve("a fancy message"); // FIXME
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return Promise.reject(error);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message); // FIXME
    }
  }
};

export interface DeleteCategoryParams {
  id: number;
  headers: AuthHeaders;
}

export const deleteCategory = (
  params: DeleteCategoryParams
): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  try {
    console.log("delete Category!");
    console.log(params);
    const response = await axios({
      method: "delete",
      baseURL: "https://expense-tracker-test-api.herokuapp.com/",
      url: "/categories/" + params.id,
      headers: params.headers,
    });
    console.log(response);
    const categories: ReadonlyArray<Category> = response.data.map(
      (category: any) => {
        const obj = JSON.parse(category);
        const tags: ReadonlyArray<Tag> = obj.tags.map((tag: any) => ({
          id: tag.id,
          name: tag.name,
        }));
        return {
          id: obj.id,
          name: obj.name,
          required: obj.required,
          tags: tags,
        };
      }
    );

    dispatch({
      type: TagActionTypes.FETCH, //FIXME cahnge to delete type?
      payload: {
        authHeaders: {
          client: response.headers["client"],
          expiry: response.headers["expiry"],
          uid: response.headers["uid"],
          "access-token": response.headers["access-token"],
          "token-type": response.headers["token-type"],
        },
        tags: {
          categories: categories, //FIXME type the axios response
        },
      },
    });

    return Promise.resolve("a fancy message"); // FIXME
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return Promise.reject(error);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message); // FIXME
    }
  }
};

export interface EditCategoryParams {
  category: Category;
  headers: AuthHeaders;
}
export const editCategory = (
  params: EditCategoryParams
): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  try {
    console.log("edit Category!");
    // Format nested params correctly
    // FIXME maybe let's move off axios since it has this stupid bug
    axios.interceptors.request.use((config) => {
      window.console.log(config);

      config.paramsSerializer = (params) => {
        return qs.stringify(params, {
          arrayFormat: "brackets",
          encode: false,
        });
      };

      return config;
    });
    console.log(params);
    const response = await axios({
      method: "post",
      baseURL: "https://expense-tracker-test-api.herokuapp.com/",
      url: "/categories",
      params: {
        category: {
          name: params.category.name,
          required: params.category.required,
        },
      },
      headers: params.headers,
    });
    console.log(response);

    dispatch({
      type: TagActionTypes.EDIT_CATEGORY,
      payload: {
        authHeaders: {
          client: response.headers["client"],
          expiry: response.headers["expiry"],
          uid: response.headers["uid"],
          "access-token": response.headers["access-token"],
          "token-type": response.headers["token-type"],
        },
        tags: response.data,
      },
    });

    return Promise.resolve("a fancy message"); // FIXME
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return Promise.reject(error);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message); // FIXME
    }
  }
};

export interface NewTagParams {
  name: string;
  category: Category;
  headers: AuthHeaders;
}
export const newTag = (
  params: NewTagParams
): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  try {
    console.log("new Tag!");
    // Format nested params correctly
    // FIXME maybe let's move off axios since it has this stupid bug
    axios.interceptors.request.use((config) => {
      window.console.log(config);

      config.paramsSerializer = (params) => {
        return qs.stringify(params, {
          arrayFormat: "brackets",
          encode: false,
        });
      };

      return config;
    });
    console.log(params);
    const response = await axios({
      method: "post",
      baseURL: "https://expense-tracker-test-api.herokuapp.com/",
      url: "/categories/" + params.category.id + "/tags",
      params: {
        tag: {
          name: params.name,
        },
      },
      headers: params.headers,
    });
    const obj = response.data;
    console.log(obj);
    const tags: ReadonlyArray<Tag> = obj.tags.map((tag: any) => ({
      id: tag.id,
      name: tag.name,
    }));
    const category = {
      id: obj.id,
      name: obj.name,
      required: obj.required,
      tags: tags,
    };

    dispatch({
      type: TagActionTypes.EDIT_CATEGORY,
      payload: {
        authHeaders: {
          client: response.headers["client"],
          expiry: response.headers["expiry"],
          uid: response.headers["uid"],
          "access-token": response.headers["access-token"],
          "token-type": response.headers["token-type"],
        },
        category: category,
      },
    });

    return Promise.resolve("a fancy message"); // FIXME
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return Promise.reject(error);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message); // FIXME
    }
  }
};

export interface DeleteTagParams {
  id: number;
  category: Category;
  headers: AuthHeaders;
}
export const deleteTag = (
  params: DeleteTagParams
): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  try {
    console.log("delete Tag!");
    // Format nested params correctly
    // FIXME maybe let's move off axios since it has this stupid bug
    axios.interceptors.request.use((config) => {
      window.console.log(config);

      config.paramsSerializer = (params) => {
        return qs.stringify(params, {
          arrayFormat: "brackets",
          encode: false,
        });
      };

      return config;
    });
    console.log(params);
    const response = await axios({
      method: "delete",
      baseURL: "https://expense-tracker-test-api.herokuapp.com/",
      url: "/categories/" + params.category.id + "/tags/" + params.id,
      headers: params.headers,
    });
    const obj = response.data;
    console.log(obj);
    const tags: ReadonlyArray<Tag> = obj.tags.map((tag: any) => ({
      id: tag.id,
      name: tag.name,
    }));
    const category = {
      id: obj.id,
      name: obj.name,
      required: obj.required,
      tags: tags,
    };

    dispatch({
      type: TagActionTypes.EDIT_CATEGORY,
      payload: {
        authHeaders: {
          client: response.headers["client"],
          expiry: response.headers["expiry"],
          uid: response.headers["uid"],
          "access-token": response.headers["access-token"],
          "token-type": response.headers["token-type"],
        },
        category: category,
      },
    });

    return Promise.resolve("a fancy message"); // FIXME
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return Promise.reject(error);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message); // FIXME
    }
  }
};

export interface EditTagParams {
  tag: Tag;
  category: Category;
  headers: AuthHeaders;
}
export const editTag = (
  params: EditTagParams
): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  try {
    console.log("edit Tag!");
    // Format nested params correctly
    // FIXME maybe let's move off axios since it has this stupid bug
    axios.interceptors.request.use((config) => {
      window.console.log(config);

      config.paramsSerializer = (params) => {
        return qs.stringify(params, {
          arrayFormat: "brackets",
          encode: false,
        });
      };

      return config;
    });
    console.log(params);
    const response = await axios({
      method: "patch",
      baseURL: "https://expense-tracker-test-api.herokuapp.com/",
      url: "/categories/" + params.category.id + "/tags/" + params.tag.id,
      params: {
        tag: {
          name: params.tag.name,
        },
      },
      headers: params.headers,
    });
    const obj = response.data;
    console.log(obj);
    const tags: ReadonlyArray<Tag> = obj.tags.map((tag: any) => ({
      id: tag.id,
      name: tag.name,
    }));
    const category = {
      id: obj.id,
      name: obj.name,
      required: obj.required,
      tags: tags,
    };

    dispatch({
      type: TagActionTypes.EDIT_CATEGORY,
      payload: {
        authHeaders: {
          client: response.headers["client"],
          expiry: response.headers["expiry"],
          uid: response.headers["uid"],
          "access-token": response.headers["access-token"],
          "token-type": response.headers["token-type"],
        },
        category: category,
      },
    });

    return Promise.resolve("a fancy message"); // FIXME
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return Promise.reject(error);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message); // FIXME
    }
  }
};
