import {
  ApptState,
  ApptActionTypes,
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
  UPDATE_APPT_REQUEST,
  UPDATE_APPT_SUCCESS,
  UPDATE_APPT_FAILURE,
  DELETE_APPT_REQUEST,
  DELETE_APPT_SUCCESS,
  DELETE_APPT_FAILURE,
  CANCLE_REMOVE_REQUEST,
  CANCLE_REMOVE_SUCCESS,
  CANCLE_REMOVE_FAILURE
} from './types'

import { GET_LAST_EXAM_RPT_SUCCESS, GET_REPORT_LIST, GET_REPORT_DETAIL } from '../report/types';


import { APPT_STATUS, REGISTER_STATE, REQ_STATUS } from '../enum';

const initialState: ApptState = {
  showAPPT: false,
  patient: {},
  orgInfo: {},
  scope: {},
  reservation: {
    id: '',
    status: APPT_STATUS.NEW,
    selectTime: [],
    confirmTime: {},
  },
  examMap: {},
  from: '',
  reqCancelRemove: REQ_STATUS.IDLE
}

export function apptReducer(
  state = initialState,
  action: ApptActionTypes
): ApptState {
  switch (action.type) {
    case SWITCH_SHOW_APPT: {
      const { show, examID, from } = action.response;
      return {
        ...state,
        examID,
        showAPPT: show,
        from
      }
    }
    case GET_ORG_INFO_REQUEST:
    case GET_SCOPE_REQUEST:
    case GET_APPT_REQUEST:
    case UPDATE_APPT_REQUEST:
    case DELETE_APPT_REQUEST:
    case CANCLE_REMOVE_REQUEST: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case GET_REPORT_DETAIL: {
      return {
        ...state,
        patient: {
          ...state.patient,
          name: action.response.patient.name,
          mobile: action.response.patient.mobile,
          gender: action.response.patient.gender,
          birthday: action.response.patient.birthday,
        },
        examMap: {
          ...state.examMap,
          [action.response.exam.id]: action.response.reservation
        }
      }
    }
    case CANCLE_REMOVE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        removingID: '',
        removingStatus: '',
        reqCancelRemove: REQ_STATUS.SUCCESSED
      }
    }
    case DELETE_APPT_SUCCESS: {
      return {
        ...state,
        isfetching: false,
        removingID: action.response.id,
        patient: {
          ...state.patient,
          contactMobile: '',
        },
        removingStatus: action.response.status,
        reqCancelRemove: REQ_STATUS.IDLE
      }
    }
    case GET_REPORT_LIST: {
      const records = action.response.records;
      const examItems: { [key: number]: any } = {};
      records.forEach((rec) => {
        examItems[rec.id] = rec.reservation;
      })
      return {
        ...state,
        examMap: {
          ...state.examMap,
          ...examItems
        },
        showAPPT: false,
      }
    }
    case GET_LAST_EXAM_RPT_SUCCESS: {
      const { patient, exam, reservation } = action.response;
      return {
        ...state,
        patient: {
          ...state.patient,
          name: patient.name,
          gender: patient.gender,
          birthday: patient.birthday,
          mobile: patient.mobile,
        },
        examMap: {
          ...state.examMap,
          [`${exam.id}`]: reservation,
        }
      }
    }
    case GET_APPT_SUCCESS: {
      const { patient, org, reservation } = action.response;
      return {
        ...state,
        patient,
        orgInfo: org,
        isFetching: false,
        reservation
      }
    }
    case UPDATE_APPT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        reservation: {
          ...state.reservation,
          status: action.response.status,
          id: action.response.id,
        }
      }
    }
    case GET_SCOPE_SUCCESS: {
      const { scope } = action.response;
      return {
        ...state,
        isFetching: false,
        scope,
      }
    }
    case GET_ORG_INFO_SUCCESS: {
      const { name, address } = action.response;
      return {
        ...state,
        isFetching: false,
        orgInfo: { name, address }
      }
    }
    case GET_ORG_INFO_FAILURE:
    case GET_SCOPE_FAILURE:
    case GET_APPT_FAILURE:
    case UPDATE_APPT_FAILURE:
    case DELETE_APPT_FAILURE:
    case CANCLE_REMOVE_FAILURE: {
      return {
        ...state,
        isFetching: false,
      }
    }

    default:
      return state
  }

}