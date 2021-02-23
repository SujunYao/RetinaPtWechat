import { types } from '@babel/core';
import { REQ_STATUS, REGISTER_STATE, WEEK, GENDER, TIME, APPT_STATUS } from '../enum';
import { GET_LAST_EXAM_ACTION, GetReportListAction, GetReportDetailAction } from '../report/types';

export interface ApptState {
  [key: string]: any,
  showAPPT: boolean,
  patient: PATIENT,
  orgInfo: ORG,
  scope: SCOPE,
  reservation: RESERVATION,
  examMap: {
    [key: number]: any
  }
};

export interface PATIENT {
  name?: string,
  gender?: GENDER,
  birthday?: string,
  mobile?: string,
  contactMobile?: string,
}

export interface ORG {
  name?: string,
  address?: string,
}

export interface SCOPE_DAY {
  day: number,
  weekday: WEEK,
  available: Array<TIME>
}

export interface SCOPE_MONTHS {
  [key: number]: Array<SCOPE_DAY>
}

export interface SCOPE {
  [key: number]: SCOPE_MONTHS
}

export interface APPT_TIME {
  year?: number,
  month?: number,
  day?: number,
  weekday?: WEEK,
  available?: TIME
}

export interface UP_APPT_PARAMS {
  id?: number,
  exam_id: number,
  contact_mobile?: string,
  select_time: Array<APPT_TIME>,
  name?: string,
  org_id?: string,
}

export interface SCOPE_APPT_TIME {
  year?: number,
  month?: number,
  day?: number,
  weekday?: WEEK,
  available?: Array<TIME>
}

export interface RESERVATION {
  id?: number | string,
  status?: APPT_STATUS,
  selectTime?: Array<APPT_TIME>,
  confirmTime?: APPT_TIME
}

export const SWITCH_SHOW_APPT = 'SWITCH_SHOW_APPT';

/**
 * Request status;
 * **/
export const GET_ORG_INFO_REQUEST = 'GET_ORG_INFO_REQUEST';
export const GET_ORG_INFO_SUCCESS = 'GET_ORG_INFO_SUCCESS';
export const GET_ORG_INFO_FAILURE = 'GET_ORG_INFO_FAILURE';

export const GET_SCOPE_REQUEST = 'GET_SCOPE_REQUEST';
export const GET_SCOPE_SUCCESS = 'GET_SCOPE_SUCCESS';
export const GET_SCOPE_FAILURE = 'GET_SCOPE_FAILURE';

export const GET_APPT_REQUEST = 'GET_APPT_REQUEST';
export const GET_APPT_SUCCESS = 'GET_APPT_SUCCESS';
export const GET_APPT_FAILURE = 'GET_APPT_FAILURE';

export const UPDATE_APPT_REQUEST = 'UPDATE_APPT_REQUEST';
export const UPDATE_APPT_SUCCESS = 'UPDATE_APPT_SUCCESS';
export const UPDATE_APPT_FAILURE = 'UPDATE_APPT_FAILURE';


export const DELETE_APPT_REQUEST = 'DELETE_APPT_REQUEST';
export const DELETE_APPT_SUCCESS = 'DELETE_APPT_SUCCESS';
export const DELETE_APPT_FAILURE = 'DELETE_APPT_FAILURE';


export const CANCLE_REMOVE_REQUEST = 'CANCLE_REMOVE_REQUEST';
export const CANCLE_REMOVE_SUCCESS = 'CANCLE_REMOVE_SUCCESS';
export const CANCLE_REMOVE_FAILURE = 'CANCLE_REMOVE_FAILURE';
/**
 * Response interface
 * **/
export interface GET_APPT_RES {
  patient: {
    pid: string,
    name: string,
    mobile: string,
    contactMobile: string,
  },
  org: {
    id: number | string,
    name: string,
    address: string,
  },
  reservation: {
    id: number | string,
    status: APPT_STATUS,
    selectTime: Array<APPT_TIME>,
    confirmTime: APPT_TIME
  }
}

interface updateShowAppt {
  type: typeof SWITCH_SHOW_APPT,
  response: { show: boolean, examID: number, from: string }
}

interface getOrgInfoAction {
  type: typeof GET_ORG_INFO_REQUEST | typeof GET_ORG_INFO_SUCCESS | typeof GET_ORG_INFO_FAILURE,
  response: ORG
}

interface getAPPTAction {
  type: typeof GET_APPT_REQUEST | typeof GET_APPT_SUCCESS | typeof GET_APPT_FAILURE,
  response: GET_APPT_RES
}

interface getScopeAction {
  type: typeof GET_SCOPE_REQUEST | typeof GET_SCOPE_SUCCESS | typeof GET_SCOPE_FAILURE,
  response: { scope: SCOPE }
}

interface updateAPPTAction {
  type: typeof UPDATE_APPT_REQUEST | typeof UPDATE_APPT_SUCCESS | typeof UPDATE_APPT_FAILURE,
  response: { id: number, status: APPT_STATUS }
}

interface deleteAPPTAction {
  type: typeof DELETE_APPT_REQUEST | typeof DELETE_APPT_SUCCESS | typeof DELETE_APPT_FAILURE,
  response: { id: number, status: APPT_STATUS }
}

interface cancelDeleteAPPT {
  type: typeof CANCLE_REMOVE_REQUEST | typeof CANCLE_REMOVE_SUCCESS | typeof CANCLE_REMOVE_FAILURE,
  response: { id: number, status: APPT_STATUS }
}

export type ApptActionTypes = updateShowAppt | GetReportDetailAction | cancelDeleteAPPT | deleteAPPTAction | GET_LAST_EXAM_ACTION | GetReportListAction | getOrgInfoAction | getScopeAction | getAPPTAction | updateAPPTAction;
