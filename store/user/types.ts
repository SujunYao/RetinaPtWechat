import { GENDER, SMOKE, REGISTER_STATE, PWD_STATE, REQ_STATUS } from '../enum';

/**
 * Interfaces 
 * @Sujun
 * **/
export interface UserState {
  pid: string
  bgEmpty: number | null
  bgFull: number | null
  bgLow: number | null
  birthday: string
  bpHigh: number | null
  bpLow: number | null
  gender: GENDER
  height: number | null
  icon: string
  isSmoke: SMOKE
  location: string
  mobile: string
  name: string
  iDNumber: string
  smokeYears: number | null | string
  weight: number | null,
  isFetching: boolean,
  reqSetPwdState: REQ_STATUS,
  reqGetHealthRecordState: REQ_STATUS,
  reqUpdateHealthRecordState: REQ_STATUS,
}

export interface WECHAT_BIND_PARAMS {
  openid: string
  mobile: string
  password?: string
}

export interface CHECK_MOBILE_PARAMS {
  moblie: StringConstructor
}

export interface CHECK_MOBILE_RES {
  patient_status: REGISTER_STATE,
  pwd_status: PWD_STATE,
  openid: string
}

export interface GET_PID_PARAMS {
  openid: string
}

export interface PID_RES {
  pid: string
}

export interface SEND_VERIFY_CODE_PARAMS {
  mobile: string
}

interface VERIFY_CODE_LIFE_CYS {
  triggerTime: Date
}

export interface WECHAT_UNBIND_PARAMS {
  openid: string
}

export interface VERIFY_CODE_PARAMS {
  code: string
  mobile: string
}

export interface SET_PWD_PARAMS {
  password: string
  openid: string
}

export interface UPDATE_HEALTH_RECORD_PARAMS {
  pid: string
  name: string
  gender: GENDER
  birthday: string
  ID_number: string
  height?: number | null
  bg_empty?: number | null
  bg_full?: number | null
  bg_low?: number | null
  bp_high?: number | null
  bp_low?: number | null
  is_smoke?: SMOKE
  smoke_years?: number | null
  weight?: number | null
}

export interface GET_HEALTH_RECORD_PARAMS {
  pid: string
}

export interface GET_HEALTH_RECORD_RES {
  bg_empty: number | null
  bg_full: number | null
  bg_low: number | null
  birthday: string
  bp_high: number | null
  bp_low: number | null
  gender: GENDER
  height: number | null
  icon: string
  is_smoke: SMOKE
  location: string
  mobile: string
  name: string
  smoke_years: number | null
  weight: number | null,
  ID_number: string,
}

export interface SET_PWD_RES {
  error_message: string,
  pid: string
}

export interface UPDATE_HEALTH_RECORD_RES {
  error_message: string,
  status: number,
}

/**
 * Action Names
 * **/
export const WECHAT_BIND = 'WECHAT_BIND'
export const CHECK_MOBILE = 'CHECK_MOBILE'
export const GET_PID = 'GET_PID'
export const SEND_VERIFY_CODE = 'SEND_VERIFY_CODE'
export const UPDATE_SESSION = 'WECHAT_BIND'
export const CLEAR_REQ_STATUS = 'CLEAR_REQ_STATUS'

/**
 * Request status;
 * **/
export const SET_PWD_REQUEST = 'SET_PWD_REQUEST';
export const SET_PWD_SUCCESS = 'SET_PWD_SUCCESS';
export const SET_PWD_FAILURE = 'SET_PWD_FAILURE';

export const GET_HEALTH_RECORD_REQUEST = 'GET_HEALTH_RECORD_REQUEST';
export const GET_HEALTH_RECORD_SUCCESS = 'GET_HEALTH_RECORD_SUCCESS';
export const GET_HEALTH_RECORD_FAILURE = 'GET_HEALTH_RECORD_FAILURE';

export const UPDATE_HEALTH_RECORD_REQUEST = 'UPDATE_HEALTH_RECORD_REQUEST';
export const UPDATE_HEALTH_RECORD_SUCCESS = 'UPDATE_HEALTH_RECORD_SUCCESS';
export const UPDATE_HEALTH_RECORD_FAILURE = 'UPDATE_HEALTH_RECORD_FAILURE';

export const LOGOUT = 'LOGOUT';

/**
 * Action interface Types
 * @Sujun
 * **/
interface WechatBindAction {
  type: typeof WECHAT_BIND
  payload: PID_RES
}

interface CheckMobileAction {
  type: typeof CHECK_MOBILE
  payload: CHECK_MOBILE_RES
}

interface GetPIDAction {
  type: typeof GET_PID
  payload: PID_RES
}

interface SendVerifyCodeAction {
  type: typeof SEND_VERIFY_CODE
  payload: VERIFY_CODE_LIFE_CYS
}

interface setPwdAction {
  type: typeof CLEAR_REQ_STATUS | typeof SET_PWD_REQUEST | typeof SET_PWD_SUCCESS | typeof SET_PWD_FAILURE,
  payload: SET_PWD_RES
}

interface getHealthRecordAction {
  type: typeof GET_HEALTH_RECORD_REQUEST | typeof GET_HEALTH_RECORD_SUCCESS | typeof GET_HEALTH_RECORD_FAILURE,
  response: GET_HEALTH_RECORD_RES
}

interface updateHealthRecordAction {
  type: typeof UPDATE_HEALTH_RECORD_REQUEST | typeof UPDATE_HEALTH_RECORD_SUCCESS | typeof UPDATE_HEALTH_RECORD_FAILURE,
  response: UPDATE_HEALTH_RECORD_RES
}

interface logoutAction {
  type: typeof LOGOUT,
}

export type UserActionTypes = WechatBindAction | logoutAction | CheckMobileAction | GetPIDAction | SendVerifyCodeAction | setPwdAction | getHealthRecordAction | updateHealthRecordAction;