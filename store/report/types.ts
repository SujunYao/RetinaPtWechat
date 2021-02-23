import { APPT_STATUS, GENDER, WEEK, TIME, REQ_METHOD, REQ_STATUS } from '../enum';

export type ReservationStatus = '' | 'confirming' | 'confirmed' | 'expired';
export type ReservationAvailable = 'morning' | 'afternoon';
export interface ReservationTime {
  year: number;
  month: number;
  day: number;
  weekday: string;
  available: ReservationAvailable;
}
export interface Reservation {
  id: number | '';
  status: ReservationStatus;
  selectTime: ReservationTime[];
  confirmTime: ReservationTime | {};
  orgAddress?: string;
}

export interface ReportList {
  id: number;
  examTime: string;
  disease: string;
  transferReexam: string;
  reservation: Reservation;
}

export interface ReportDetail {
  patient: {
    pid: string;
    name: string;
    gender: GENDER;
    birthday: string;
    history: string;
    mobile: string;
  };
  exam: {
    id: number;
    examTime: string;
    disease: string;
    transferReexam: string;
    comment: string;
    uploader: {
      name: string;
      org: string;
    };
    viewer: {
      name: string;
      org: string;
    };
    checkTime: string;
  };
  photo: {
    photoList: Array<{
      tag: string;
      imageLink: string;
      imageSize: string;
      thumbLink: string;
      thumbSize: string;
    }>;
    quality: string;
    lesion: string[];
  };
  reservation: Reservation;
}

interface APPT_TIME {
  year: number,
  month: number,
  day: number,
  weekday: ReservationStatus,
  available: ReservationAvailable
}

export interface EXAM_INFO_RES {
  patient: {
    name: string,
    gender: GENDER,
    birthday: string,
    icon: string,
    mobile?: string,
    contactMobile?: string,
  },
  exam: {
    id?: number,
    examTime?: string,
    disease?: string,
    transferReexam?: string,
  },
  reservation: {
    id?: number,
    status?: APPT_STATUS,
    selectTime?: Array<APPT_TIME>
    confirmTime?: APPT_TIME
  }
}

export interface ReportState {
  list: ReportList[];
  detail: ReportDetail | null;
  lastExamInfo: EXAM_INFO_RES,
  reqGetLastRptInfo: REQ_STATUS,
}

export const GET_REPORT_DETAIL_START = 'GET_REPORT_DETAIL_START';
export const GET_REPORT_DETAIL = 'GET_REPORT_DETAIL';
export const GET_REPORT_DETAIL_FAILURE = 'GET_REPORT_DETAIL_FAILURE';
export interface GetReportDetailAction {
  type: typeof GET_REPORT_DETAIL;
  response: ReportDetail;
}

export const GET_REPORT_LIST_START = 'GET_REPORT_LIST_START';
export const GET_REPORT_LIST = 'GET_REPORT_LIST';
export const GET_REPORT_LIST_FAILURE = 'GET_REPORT_LIST_FAILURE';
export interface GetReportListAction {
  type: typeof GET_REPORT_LIST;
  response: { records: ReportList[] };
}

export const GET_LAST_EXAM_RPT_REQUEST = 'GET_LAST_EXAM_RPT_REQUEST';
export const GET_LAST_EXAM_RPT_SUCCESS = 'GET_LAST_EXAM_RPT_SUCCESS';
export const GET_LAST_EXAM_RPT_FAILURE = 'GET_LAST_EXAM_RPT_FAILURE';
export interface GET_LAST_EXAM_ACTION {
  type: typeof GET_LAST_EXAM_RPT_REQUEST | typeof GET_LAST_EXAM_RPT_SUCCESS | typeof GET_LAST_EXAM_RPT_FAILURE,
  response: EXAM_INFO_RES
}

export type ReportAction = GetReportDetailAction | GetReportListAction | GET_LAST_EXAM_ACTION;
