import {
  SET_PWD_REQUEST,
  SET_PWD_SUCCESS,
  SET_PWD_FAILURE,
  GET_HEALTH_RECORD_REQUEST,
  GET_HEALTH_RECORD_SUCCESS,
  GET_HEALTH_RECORD_FAILURE,
  CLEAR_REQ_STATUS,
  UPDATE_HEALTH_RECORD_PARAMS,
  UPDATE_HEALTH_RECORD_REQUEST,
  UPDATE_HEALTH_RECORD_SUCCESS,
  UPDATE_HEALTH_RECORD_FAILURE,
} from './types';
import { REQ_METHOD } from '../enum';
import { CALL_API, Schemas } from '../../middleware/api'

interface SET_PWD_PARAM {
  openid: string,
  password: string,
}

interface UPDATE_HEALTH_RECORD_PARAM {

}

enum REQ_URLS {
  SET_PWD = '/api/patient_pwd',
  GET_HEALTH_RECORD = '/api/health_record',
  UPDATE_HEALTH_RECORD = '/api/health_record',
  UPDATE_PWD = '',
}

export const setUserPwd = (params: SET_PWD_PARAM) => ({
  [CALL_API]: {
    types: [
      SET_PWD_REQUEST,
      SET_PWD_SUCCESS,
      SET_PWD_FAILURE
    ],
    endpoint: REQ_URLS.SET_PWD,
    schema: Schemas.USER,
    params,
  }
});

export const clearUserReqStatus = () => ({
  type: CLEAR_REQ_STATUS
});

export const getHealthRecord = (pid: string) => ({
  [CALL_API]: {
    types: [
      GET_HEALTH_RECORD_REQUEST,
      GET_HEALTH_RECORD_SUCCESS,
      GET_HEALTH_RECORD_FAILURE,
    ],
    method: REQ_METHOD.GET,
    endpoint: REQ_URLS.GET_HEALTH_RECORD,
    schema: Schemas.USER,
    params: { pid }
  }
});

export const updateHelthRecord = (params: UPDATE_HEALTH_RECORD_PARAMS) => ({
  [CALL_API]: {
    types: [
      UPDATE_HEALTH_RECORD_REQUEST,
      UPDATE_HEALTH_RECORD_SUCCESS,
      UPDATE_HEALTH_RECORD_FAILURE,
    ],
    method: REQ_METHOD.POST,
    endpoint: REQ_URLS.UPDATE_HEALTH_RECORD,
    schema: Schemas.USER,
    params
  }
});