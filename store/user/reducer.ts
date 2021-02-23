import {
  UserState,
  UserActionTypes,
  WECHAT_BIND,
  GET_PID,
  CLEAR_REQ_STATUS,
  SET_PWD_REQUEST,
  SET_PWD_SUCCESS,
  SET_PWD_FAILURE,
  GET_HEALTH_RECORD_REQUEST,
  GET_HEALTH_RECORD_SUCCESS,
  GET_HEALTH_RECORD_FAILURE,
  UPDATE_HEALTH_RECORD_REQUEST,
  UPDATE_HEALTH_RECORD_SUCCESS,
  UPDATE_HEALTH_RECORD_FAILURE,
  LOGOUT,
} from './types'


import { GENDER, SMOKE, REQ_STATUS } from '../enum';

const initialState: UserState = {
  pid: '',
  bgEmpty: null,
  bgFull: null,
  bgLow: null,
  birthday: '',
  bpHigh: null,
  bpLow: null,
  gender: GENDER.OTHER,
  height: null,
  icon: '',
  isSmoke: SMOKE.DEF,
  iDNumber: '',
  location: '',
  mobile: '',
  name: '',
  smokeYears: null,
  weight: null,
  isFetching: false,
  reqSetPwdState: REQ_STATUS.IDLE,
  reqGetHealthRecordState: REQ_STATUS.IDLE,
  reqUpdateHealthRecordState: REQ_STATUS.IDLE,
}

export function userReducer(
  state = initialState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case LOGOUT:{
      return {
        ...initialState,
      }
    }
    case WECHAT_BIND: {
      return {
        ...state,
        ...action.payload
      }
    }
    case CLEAR_REQ_STATUS: {
      return {
        ...state,
        reqSetPwdState: REQ_STATUS.IDLE
      }
    }
    case SET_PWD_REQUEST: {
      return {
        ...state,
        isFetching: true,
        reqSetPwdState: REQ_STATUS.LOADING
      }
    }
    case SET_PWD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        reqSetPwdState: REQ_STATUS.SUCCESSED,
      }
    }
    case SET_PWD_FAILURE: {
      return {
        ...state,
        isFetching: false,
        reqSetPwdState: REQ_STATUS.FAILED,
      }
    }
    case GET_HEALTH_RECORD_REQUEST: {
      return {
        ...state,
        isFetching: true,
        reqGetHealthRecordState: REQ_STATUS.LOADING
      }
    }
    case GET_HEALTH_RECORD_SUCCESS: {
      return {
        ...state,
        ...action.response,
        isFetching: false,
        reqUpdateHealthRecordState: REQ_STATUS.IDLE,
        reqGetHealthRecordState: REQ_STATUS.SUCCESSED,
      }
    }
    case GET_HEALTH_RECORD_FAILURE: {
      return {
        ...state,
        isFetching: false,
        reqGetHealthRecordState: REQ_STATUS.FAILED,
      }
    }
    case UPDATE_HEALTH_RECORD_REQUEST: {
      return {
        ...state,
        isFetching: true,
        reqUpdateHealthRecordState: REQ_STATUS.LOADING
      }
    }
    case UPDATE_HEALTH_RECORD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        reqUpdateHealthRecordState: REQ_STATUS.SUCCESSED,
      }
    }
    case UPDATE_HEALTH_RECORD_FAILURE: {
      return {
        ...state,
        isFetching: false,
        reqUpdateHealthRecordState: REQ_STATUS.FAILED,
      }
    }
    default:
      return state
  }
}