import { CALL_API, Schemas, } from '../../middleware/api';
import {
  GET_REPORT_DETAIL, GET_REPORT_DETAIL_FAILURE, GET_REPORT_DETAIL_START,
  GET_REPORT_LIST_START, GET_REPORT_LIST_FAILURE, GET_REPORT_LIST,
  GET_LAST_EXAM_RPT_REQUEST,
  GET_LAST_EXAM_RPT_SUCCESS,
  GET_LAST_EXAM_RPT_FAILURE
} from './types';
import { REQ_METHOD } from '../enum';

enum REQ_URLS {
  GET_RPT_LIST = '/api/wechat_records',
  GET_RPT_DETIAL = '/api/wechat_report',
  GET_LAST_RPT = '/api/wechat_last_exam',
};

export const fetchReportDetail = (reportId: string) => ({
  [CALL_API]: {
    types: [GET_REPORT_DETAIL_START, GET_REPORT_DETAIL, GET_REPORT_DETAIL_FAILURE],
    endpoint: REQ_URLS.GET_RPT_DETIAL,
    schema: Schemas.REPORT,
    params: { exam_id: reportId },
  }
});

export const fetchRecordList = (patientId: string) => ({
  [CALL_API]: {
    types: [GET_REPORT_LIST_START, GET_REPORT_LIST, GET_REPORT_LIST_FAILURE],
    method: REQ_METHOD.GET,
    endpoint: REQ_URLS.GET_RPT_LIST,
    schema: Schemas.REPO_ARRAY,
    params: { pid: patientId },
  }
});

export const fetchLastReprt = (pid: string) => ({
  [CALL_API]: {
    types: [
      GET_LAST_EXAM_RPT_REQUEST,
      GET_LAST_EXAM_RPT_SUCCESS,
      GET_LAST_EXAM_RPT_FAILURE
    ],
    method: REQ_METHOD.GET,
    endpoint: REQ_URLS.GET_LAST_RPT,
    schema: Schemas.REPORT,
    params: { pid }
  }
});