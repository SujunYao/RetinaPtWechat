import { types } from '@babel/core';
import { REQ_STATUS, REGISTER_STATE, PWD_STATE } from '../enum';
export interface SystemState {
  [key: string]: any,
  loggedIn: boolean
  openID: string
  routeName: string
  routeParams: { [key: string]: any },
  readonly: boolean
  lockRoute: boolean
  keepToken: string | undefined
  pid: string,
  mobile?: string,
  mobileBindWithOpenID?: string,
  hasPwd: boolean,
  isFetching: boolean,
  toast: { showToast: boolean, msg: string, hideActionBtn: boolean },
  hasHealthRecord: boolean,
  hasRegister: boolean,
  apptState: { goRefresh: boolean, from: string },
};


export interface ROUTE {
  routeName: string,
  routeParams: { [key: string]: any }
};

export interface TOKEN_PARAMS {
  openID: string,
  noNeedLogin: boolean,
  lockRoute: boolean,
  rRouteName?: string,
  keepToken?: string,
  rRouteParams?: { [key: string]: any },
};

export interface CLOCK_PARAMS {
  clock?: number | undefined,
}

export const UPDATE_SESSION = 'UPDATE_SESSION';
export const CLEAR_VC_TIMEOUT = 'CLEAR_VC_TIMEOUT';
export const UPDATE_VC_TIMEOUT = 'UPDATE_VC_TIMEOUT';
export const CLEAR_REQ_STATUS = 'CLEAR_REQ_STATUS';
export const SWITCH_SHOW_APPT = 'SWITCH_SHOW_APPT';
export const SHOW_MSG_TOAST = 'SHOW_MSG_TOAST';
export const APPT_GO_REFRESH = 'APPT_GO_REFRESH';
export const UPDATE_MOBILE = 'UPDATE_MOBILE';

/**
 * Request status;
 * **/
export const UNBIND_MOBILE_REQUEST = 'UNBIND_MOBILE_REQUEST';
export const UNBIND_MOBILE_SUCCESS = 'UNBIND_MOBILE_SUCCESS';
export const UNBIND_MOBILE_FAILURE = 'UNBIND_MOBILE_FAILURE';

export const BIND_MOBILE_REQUEST = 'BIND_MOBILE_REQUEST';
export const BIND_MOBILE_SUCCESS = 'BIND_MOBILE_SUCCESS';
export const BIND_MOBILE_FAILURE = 'BIND_MOBILE_FAILURE';

export const VALIDATE_VERIFY_CODE_REQUEST = 'VALIDATE_VERIFY_CODE_REQUEST';
export const VALIDATE_VERIFY_CODE_SUCCESS = 'VALIDATE_VERIFY_CODE_SUCCESS';
export const VALIDATE_VERIFY_CODE_FAILURE = 'VALIDATE_VERIFY_CODE_FAILURE';

export const GET_MOBILE_REQUEST = 'GET_MOBILE_REQUEST';
export const GET_MOBILE_SUCCESS = 'GET_MOBILE_SUCCESS';
export const GET_MOBILE_FAILURE = 'GET_MOBILE_FAILURE';

export const GET_VERIFY_CODE_REQUEST = 'GET_VERIFY_CODE_REQUEST';
export const GET_VERIFY_CODE_SUCCESS = 'GET_VERIFY_CODE_SUCCESS';
export const GET_VERIFY_CODE_FAILURE = 'GET_VERIFY_CODE_FAILURE';

export const GET_PID_REQUEST = 'GET_PID_REQUEST';
export const GET_PID_SUCCESS = 'GET_PID_SUCCESS';
export const GET_PID_FAILURE = 'GET_PID_FAILURE';

/**
 * Response interface
 * **/
export interface SYS_REQ_RES {
  error_message?: string,
  patientStatus?: REGISTER_STATE,  // （1: true， 0： false);
  pwdStatus?: PWD_STATE, // （1: true， 0： false);
  openid?: string,
  timeout?: number,
  pid?: string,
  patientWechat?: REGISTER_STATE
}

export interface GET_PID_RES {
  pid: string,
}

interface UpdateSessionAction {
  type: typeof UPDATE_SESSION | typeof GET_MOBILE_REQUEST | typeof GET_MOBILE_SUCCESS | typeof GET_MOBILE_FAILURE
  | typeof GET_VERIFY_CODE_REQUEST | typeof GET_VERIFY_CODE_SUCCESS | typeof GET_VERIFY_CODE_FAILURE | typeof CLEAR_VC_TIMEOUT
  | typeof UPDATE_VC_TIMEOUT | typeof VALIDATE_VERIFY_CODE_REQUEST | typeof VALIDATE_VERIFY_CODE_SUCCESS | typeof VALIDATE_VERIFY_CODE_FAILURE
  | typeof CLEAR_REQ_STATUS | typeof BIND_MOBILE_REQUEST | typeof BIND_MOBILE_SUCCESS | typeof BIND_MOBILE_FAILURE
  | typeof UNBIND_MOBILE_REQUEST | typeof UNBIND_MOBILE_SUCCESS | typeof UNBIND_MOBILE_FAILURE,
  response: SYS_REQ_RES
};

interface showToast {
  type: typeof SHOW_MSG_TOAST,
  response: { show: boolean, msg: string, hideActionBtn: boolean }
}

interface getPidAction {
  type: typeof GET_PID_REQUEST | typeof GET_PID_SUCCESS | typeof GET_PID_FAILURE,
  response: GET_PID_RES
}

interface switchRefreshAPPT {
  type: typeof APPT_GO_REFRESH,
  response: { refresh: boolean, from: string }
}

interface cacheTheBindingMobile {
  type: typeof UPDATE_MOBILE,
  response: { mobile: string }
}

export type SystemActionTypes = UpdateSessionAction | cacheTheBindingMobile | switchRefreshAPPT | getPidAction | showToast;
