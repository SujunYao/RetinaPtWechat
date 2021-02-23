import {
  SWITCH_SHOW_APPT,
  GET_ORG_INFO_REQUEST,
  GET_ORG_INFO_SUCCESS,
  GET_ORG_INFO_FAILURE,
  GET_SCOPE_REQUEST,
  GET_SCOPE_SUCCESS,
  GET_SCOPE_FAILURE,
  GET_APPT_REQUEST,
  GET_APPT_SUCCESS,
  GET_APPT_FAILURE,
  UP_APPT_PARAMS,
  UPDATE_APPT_REQUEST,
  UPDATE_APPT_SUCCESS,
  UPDATE_APPT_FAILURE,
  DELETE_APPT_REQUEST,
  DELETE_APPT_SUCCESS,
  DELETE_APPT_FAILURE,
  CANCLE_REMOVE_REQUEST,
  CANCLE_REMOVE_SUCCESS,
  CANCLE_REMOVE_FAILURE
} from './types';
import { CALL_API, Schemas } from '../../middleware/api'
import { schema } from 'normalizr';
import { APPT_STATUS, REQ_METHOD } from '../enum';

enum REQ_URLS {
  GET_ORG_INFO = '/api/transfer_org',
  GET_SCOPE = '/api/scope',
  GET_APPT = '/api/get_reserve',
  UPDATE_APPT = '/api/patient_reserve',
  DELETE_APPT = '/api/transfer_reserve',
  CANCEL_DELETE_APPT = '/api/restore_reserve',
}


export const switchShowAPPT = (show: boolean, examID?: number, from?:string) => {
  return {
    type: SWITCH_SHOW_APPT,
    response: { show, examID, from }
  }
};

export const cancelDelete = ({ id, status }: { id: number, status: APPT_STATUS }) => ({
  [CALL_API]: {
    types: [
      CANCLE_REMOVE_REQUEST,
      CANCLE_REMOVE_SUCCESS,
      CANCLE_REMOVE_FAILURE
    ],
    method: REQ_METHOD.DELETE,
    endpoint: REQ_URLS.CANCEL_DELETE_APPT,
    schema: Schemas.SYSTEM,
    params: { id, status }
  }
});

export const getOrgInfo = (examID: number) => ({
  [CALL_API]: {
    types: [
      GET_ORG_INFO_REQUEST,
      GET_ORG_INFO_SUCCESS,
      GET_ORG_INFO_FAILURE
    ],
    endpoint: REQ_URLS.GET_ORG_INFO,
    schema: Schemas.SYSTEM,
    params: { exam_id: examID }
  }
});

export const cancelAPPT = (id: number) => ({
  [CALL_API]: {
    types: [
      DELETE_APPT_REQUEST,
      DELETE_APPT_SUCCESS,
      DELETE_APPT_FAILURE
    ],
    method: REQ_METHOD.DELETE,
    endpoint: REQ_URLS.DELETE_APPT,
    schema: Schemas.SYSTEM,
    params: { id }
  }
});

export const getScope = (examID: number) => ({
  [CALL_API]: {
    types: [
      GET_SCOPE_REQUEST,
      GET_SCOPE_SUCCESS,
      GET_SCOPE_FAILURE
    ],
    method: REQ_METHOD.POST,
    endpoint: REQ_URLS.GET_SCOPE,
    schema: Schemas.SYSTEM,
    params: { exam_id: examID }
  }
});


export const updateAPPT = (params: UP_APPT_PARAMS) => ({
  [CALL_API]: {
    types: [
      UPDATE_APPT_REQUEST,
      UPDATE_APPT_SUCCESS,
      UPDATE_APPT_FAILURE
    ],
    method: REQ_METHOD.POST,
    endpoint: REQ_URLS.UPDATE_APPT,
    schema: Schemas.SYSTEM,
    params,
  }
});

export const getAPPT = (apptID: number) => ({
  [CALL_API]: {
    types: [
      GET_APPT_REQUEST,
      GET_APPT_SUCCESS,
      GET_APPT_FAILURE
    ],
    method: REQ_METHOD.GET,
    endpoint: REQ_URLS.GET_APPT,
    schema: Schemas.SYSTEM,
    params: { id: apptID }
  }
})