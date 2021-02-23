import {
  ReportAction, ReportState,
  GET_REPORT_DETAIL, GET_REPORT_LIST,
  GET_LAST_EXAM_RPT_REQUEST,
  GET_LAST_EXAM_RPT_SUCCESS,
  GET_LAST_EXAM_RPT_FAILURE
} from './types';
import { REQ_STATUS, GENDER } from '../enum';

const initialState: ReportState = {
  list: [],
  detail: null,
  lastExamInfo: {
    patient: {
      name: '',
      gender: GENDER.OTHER,
      birthday: '',
      icon: '',
    },
    exam: {},
    reservation: {}
  },
  reqGetLastRptInfo: REQ_STATUS.IDLE,
};

export const reportReducer: (state: ReportState, action: ReportAction) => ReportState = (
  state = initialState, action
) => {
  switch (action.type) {
    case GET_REPORT_LIST:
      return { ...state, list: action?.response.records };
    case GET_REPORT_DETAIL:
      return { ...state, detail: action.response };
    case GET_LAST_EXAM_RPT_REQUEST: {
      return {
        ...state,
        isFetching: true,
        reqGetLastRptInfo: REQ_STATUS.LOADING
      }
    }
    case GET_LAST_EXAM_RPT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        lastExamInfo: action.response,
        reqGetLastRptInfo: REQ_STATUS.SUCCESSED,
      }
    }
    case GET_LAST_EXAM_RPT_FAILURE: {
      return {
        ...state,
        isFetching: false,
        reqGetLastRptInfo: REQ_STATUS.FAILED,
      }
    }
    default:
      return state;
  }
};
