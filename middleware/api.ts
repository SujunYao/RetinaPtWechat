import { normalize, NormalizedSchema, Schema, schema } from 'normalizr'
import { camelizeKeys } from 'humps'
import { Middleware } from 'redux';
import { REQ_METHOD } from '../store/enum';
import { RootState } from '../store/root';
import { SystemState } from '../store/system/types'

const URLS = {
  TUNE: 'http://retina.voxelcloud.net.cn',
  DEV: 'http://192.168.12.225:4600' // //'http://192.168.0.33:4600'
};

const API_HOST = (process.env.NODE_ENV === 'tune' && URLS.TUNE)
  || (process.env.NODE_ENV !== 'production' && URLS.DEV)
  || process.env.HOST_NAME?.replace(/^\s*|\s*$/g, "") || 'http://127.0.0.1:7000';

const generateAuthorization = (openID: string, pid?: string): string => {
  return 'Basic ' + btoa(`${pid || 'null'}:${openID}`);
};

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (endpoint: string, schema: Schema<any>, systemStore: SystemState, method: REQ_METHOD, reqParams: { [key: string]: any }) => {
  const { openID, pid } = systemStore;
  const baseHeaders: HeadersInit_ = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: openID && generateAuthorization(openID, pid) || '',
  }
  const config: RequestInit = {
    method,
    credentials: 'include',
    headers: baseHeaders,
  }
  if (method !== REQ_METHOD.GET && method !== REQ_METHOD.DELETE) {
    config.body = JSON.stringify(reqParams);
  } else {
    const paramsStr = new URLSearchParams(Object.entries(reqParams));
    endpoint += '?' + paramsStr;
  }
  // set cros options for dev/tune;
  config.mode = 'cors';
  config.headers = {
    ...baseHeaders,
    'Access-Control-Allow-Methods': 'GET,DELETE,POST,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Accept,Content-Type,x-requested-with',
  }

  return fetch(API_HOST && (API_HOST + endpoint) || endpoint, config)
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json)
        }
        const camelizedJson = camelizeKeys(json);
        return Object.assign({},
          camelizedJson
          // normalize(camelizedJson, schema),
        )
      })
    )
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr

// backend's API may return results with uppercase letters while the query
// doesn't contain any. For example, "someuser" could result in "SomeUser"
// leading to a frozen UI as it wouldn't find "someuser" in the entities.
// That's why we're forcing lower cases down there.

const userSchema = new schema.Entity('users', {}, {
  idAttribute: user => user.login.toLowerCase()
});

const openIDSchema = new schema.Entity('openID', {}, {
  idAttribute: sys => sys.openid
});


const sysSchema = new schema.Entity('system', {
  openID: openIDSchema,
  // hasPwd: hasPwdSchema,
  // hasPwd: false,
  // hasHealthRecord: false,
}, {
  idAttribute: sys => sys.openid
});

const repoSchema = new schema.Entity('repos', {
  owner: userSchema
}, {
  idAttribute: repo => repo.fullName.toLowerCase()
})

const reportSchema = new schema.Entity('reports', {}, {
  idAttribute: resp => resp.exam.id,
});

// Schemas for API responses.
export const Schemas = {
  USER: userSchema,
  SYSTEM: sysSchema,
  USER_ARRAY: [userSchema],
  REPO: repoSchema,
  REPO_ARRAY: [repoSchema],
  REPORT: reportSchema,
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API'

const api: Middleware<{}, RootState> = store => next => action => {
  const callAPI = action[CALL_API]
  const { system } = store.getState();
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, types, params, method = REQ_METHOD.POST } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (types.some(type => typeof type !== 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = (data: { type: any; response?: { [key: string]: any }; error?: string | null; }) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, schema, system, method, params).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}
// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default api;
