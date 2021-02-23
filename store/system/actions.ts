import {
  GET_MOBILE_REQUEST,
  GET_MOBILE_SUCCESS,
  GET_MOBILE_FAILURE,
  GET_VERIFY_CODE_REQUEST,
  GET_VERIFY_CODE_SUCCESS,
  GET_VERIFY_CODE_FAILURE,
  UPDATE_VC_TIMEOUT,
  VALIDATE_VERIFY_CODE_REQUEST,
  VALIDATE_VERIFY_CODE_SUCCESS,
  VALIDATE_VERIFY_CODE_FAILURE,
  CLEAR_REQ_STATUS,
  BIND_MOBILE_REQUEST,
  BIND_MOBILE_SUCCESS,
  BIND_MOBILE_FAILURE,
  CLEAR_VC_TIMEOUT,
  UNBIND_MOBILE_REQUEST,
  UNBIND_MOBILE_SUCCESS,
  UNBIND_MOBILE_FAILURE,
  SWITCH_SHOW_APPT,
  GET_PID_REQUEST,
  GET_PID_SUCCESS,
  GET_PID_FAILURE,
  SHOW_MSG_TOAST,
  APPT_GO_REFRESH,
  UPDATE_MOBILE
} from './types';
import { CALL_API, Schemas } from '../../middleware/api'
import { schema } from 'normalizr';
import { REQ_METHOD } from '../enum';
import { LOGOUT } from '../user/types';

enum REQ_URLS {
  GET_MOBILE_INFO = '/api/wechat_mobile',
  GET_VERIFY_CODE = '/api/send_auth',
  VALIDATE_VERIFY_CODE = '/api/verify_code',
  BIND_MOBILE = '/api/wechat_bind',
  UNBIND_MOBILE = '/api/wechat_unbind',
  GET_PID = '/api/wechat_pid',
}


// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
export const fetchMobile = (mobile: string) => ({
  [CALL_API]: {
    types: [
      GET_MOBILE_REQUEST,
      GET_MOBILE_SUCCESS,
      GET_MOBILE_FAILURE
    ],
    endpoint: REQ_URLS.GET_MOBILE_INFO,
    schema: Schemas.SYSTEM,
    params: { mobile }
  }
});

export const fetchVerifyCode = (mobile: string) => ({
  [CALL_API]: {
    types: [
      GET_VERIFY_CODE_REQUEST,
      GET_VERIFY_CODE_SUCCESS,
      GET_VERIFY_CODE_FAILURE
    ],
    endpoint: REQ_URLS.GET_VERIFY_CODE,
    schema: Schemas.SYSTEM,
    params: { mobile }
  }
});

export const getPID = (openid: string) => ({
  [CALL_API]: {
    types: [
      GET_PID_REQUEST,
      GET_PID_SUCCESS,
      GET_PID_FAILURE
    ],
    method: REQ_METHOD.POST,
    endpoint: REQ_URLS.GET_PID,
    schema: Schemas.SYSTEM,
    params: { openid }
  }
});

export const updateTimeout = (count: number) => ({
  type: UPDATE_VC_TIMEOUT,
  response: { timeout: count }
});

export const logout = () => ({
  type: LOGOUT,
  response: {}
})

export const switchRefreshAPPT = (refresh: boolean, from?: string) => ({
  type: APPT_GO_REFRESH,
  response: { refresh, from }
});


export const fetchValidateVerfiyCode = (params: { mobile: string, code: string }) => ({
  [CALL_API]: {
    types: [
      VALIDATE_VERIFY_CODE_REQUEST,
      VALIDATE_VERIFY_CODE_SUCCESS,
      VALIDATE_VERIFY_CODE_FAILURE
    ],
    endpoint: REQ_URLS.VALIDATE_VERIFY_CODE,
    schema: Schemas.SYSTEM,
    params
  }
});

export const showMSGToast = ({ show, msg, hideActionBtn = false }: { show: boolean, msg?: string, hideActionBtn?: boolean }) => ({
  type: SHOW_MSG_TOAST,
  response: { show, msg, hideActionBtn }
});

export const clearReqStatus = () => ({
  type: CLEAR_REQ_STATUS,
});

export const clearClock = () => ({
  type: CLEAR_VC_TIMEOUT,
});

export const showAppointment = (show: boolean) => ({
  type: SWITCH_SHOW_APPT,
  response: { show }
});

export const updateMobile = (mobile: string) => ({
  type: UPDATE_MOBILE,
  response: { mobile }
});

export const fetchBindMobile = (params: { openid: string, password?: string, mobile: string }) => ({
  [CALL_API]: {
    types: [
      BIND_MOBILE_REQUEST,
      BIND_MOBILE_SUCCESS,
      BIND_MOBILE_FAILURE
    ],
    endpoint: REQ_URLS.BIND_MOBILE,
    schema: Schemas.SYSTEM,
    params
  }
});

export const fetchUnbindMobile = (openid: string) => ({
  [CALL_API]: {
    types: [
      UNBIND_MOBILE_REQUEST,
      UNBIND_MOBILE_SUCCESS,
      UNBIND_MOBILE_FAILURE
    ],
    endpoint: REQ_URLS.UNBIND_MOBILE,
    schema: Schemas.SYSTEM,
    params: { openid }
  }
});
