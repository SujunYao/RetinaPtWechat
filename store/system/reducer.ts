import token from './token';
import sessionStore from './sessionStorage';
import offlineAccessList from '../../navigation/offlineAccessRoutes';
import {
  SystemState,
  SystemActionTypes,
  UPDATE_SESSION,
  GET_MOBILE_REQUEST,
  GET_MOBILE_SUCCESS,
  GET_MOBILE_FAILURE,
  GET_VERIFY_CODE_REQUEST,
  GET_VERIFY_CODE_SUCCESS,
  GET_VERIFY_CODE_FAILURE,
  CLEAR_VC_TIMEOUT,
  UPDATE_VC_TIMEOUT,
  VALIDATE_VERIFY_CODE_REQUEST,
  VALIDATE_VERIFY_CODE_SUCCESS,
  VALIDATE_VERIFY_CODE_FAILURE,
  CLEAR_REQ_STATUS,
  BIND_MOBILE_REQUEST,
  BIND_MOBILE_SUCCESS,
  BIND_MOBILE_FAILURE,
  UNBIND_MOBILE_REQUEST,
  UNBIND_MOBILE_SUCCESS,
  UNBIND_MOBILE_FAILURE,
  GET_PID_REQUEST,
  GET_PID_SUCCESS,
  GET_PID_FAILURE,
  SHOW_MSG_TOAST,
  APPT_GO_REFRESH,
  UPDATE_MOBILE
} from './types'
import { REGISTER_STATE, PWD_STATE, REQ_STATUS } from '../enum';

const urlTokenVals = token();
const sessionStoreVals = sessionStore.getSessionStore();

const openID = urlTokenVals.openID || sessionStoreVals.openID || '';
const loggedIn = urlTokenVals.noNeedLogin || sessionStoreVals.noNeedLogin || sessionStoreVals.logined || false;
const routeParams = urlTokenVals.rRouteParams || sessionStoreVals.rRouteParams || {};
const routeName = urlTokenVals.rRouteName || sessionStoreVals.rRouteName || '';
const lockRoute = urlTokenVals.lockRoute || sessionStoreVals.lockRoute || false;
const readonly = !openID;
const keepToken = urlTokenVals.keepToken || sessionStoreVals.keepToken || '';
const vcTimeOut = sessionStoreVals.clock || undefined;

const initialState: SystemState = {
  loggedIn,
  openID,
  routeParams,
  hasRegister: false,
  routeName,
  readonly,
  keepToken,
  lockRoute,
  mobile: '',
  mobileBindWithOpenID: '',
  pid: '',
  hasPwd: false,
  hasHealthRecord: false,
  isFetching: false,
  hasClock: false,
  lastReqVerifyCodeState: REQ_STATUS.IDLE,
  lastReqValidateVCState: REQ_STATUS.IDLE,
  lastReqBindMobileState: REQ_STATUS.IDLE,
  lastReqUnbindMobileState: REQ_STATUS.IDLE,
  reqGetPid: REQ_STATUS.IDLE,
  reqGetMobileInfo: REQ_STATUS.IDLE,
  vcTimeOut,
  toast: { showToast: false, msg: '', hideActionBtn: false },
  apptState: {
    goRefresh: false,
    from: ''
  }
}

if (urlTokenVals.openID) {
  sessionStore.setSessionStore(urlTokenVals);
}

export function systemReducer(
  state = initialState,
  action: SystemActionTypes
): SystemState {
  switch (action.type) {
    case UPDATE_MOBILE: {
      return {
        ...state,
        mobile: action.response.mobile,
      };
    }
    case APPT_GO_REFRESH: {
      return {
        ...state,
        apptState: {
          ...state.apptState,
          goRefresh: action.response.refresh,
          from: action.response.from,
        }
      }
    }
    case UPDATE_SESSION: {
      return {
        ...state,
        ...action.response
      }
    }
    case SHOW_MSG_TOAST: {
      return {
        ...state,
        toast: {
          showToast: action.response.show || false,
          msg: action.response.msg || '',
          hideActionBtn: action.response.hideActionBtn || false,
        }
      }
    }
    case CLEAR_VC_TIMEOUT: {
      return {
        ...state,
        vcTimeOut: undefined
      }
    }
    case UPDATE_VC_TIMEOUT: {
      sessionStore.setSessionStoreClock({ clock: action.response.timeout });
      return {
        ...state,
        hasClock: action.response.timeout && action.response.timeout > 0,
        vcTimeOut: action.response.timeout
      }
    }
    case CLEAR_REQ_STATUS: {
      return {
        ...state,
        lastReqValidateVCState: REQ_STATUS.IDLE,
        lastReqBindMobileState: REQ_STATUS.IDLE,
        lastReqUnbindMobileState: REQ_STATUS.IDLE,
      }
    }
    case GET_MOBILE_REQUEST:
    case GET_VERIFY_CODE_REQUEST:
    case VALIDATE_VERIFY_CODE_REQUEST:
    case UNBIND_MOBILE_REQUEST:
    case GET_PID_REQUEST: {
      return {
        ...state,
        isFetching: true,
        reqGetPid: REQ_STATUS.LOADING,
        reqGetMobileInfo: REQ_STATUS.LOADING
      }
    }
    case BIND_MOBILE_REQUEST: {
      return {
        ...state,
        isFetching: true,
        lastReqBindMobileState: REQ_STATUS.LOADING,
        pid: 'DEF',
      }
    }
    case GET_PID_FAILURE: {
      return {
        ...state,
        isFetching: false,
        reqGetPid: REQ_STATUS.FAILED
      }
    }
    case GET_PID_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        pid: action.response.pid,
        reqGetPid: REQ_STATUS.SUCCESSED
      }
    }
    case GET_MOBILE_SUCCESS: {
      const { patientStatus, pwdStatus, openid, patientWechat } = action.response;
      return {
        ...state,
        mobileBindWithOpenID: openid,
        hasPwd: pwdStatus === PWD_STATE.SETED,
        hasRegister: patientWechat === REGISTER_STATE.HAS,
        hasHealthRecord: patientStatus === REGISTER_STATE.HAS,
        reqGetMobileInfo: REQ_STATUS.SUCCESSED,
        isFetching: false,
      }
    }
    case GET_MOBILE_FAILURE: {
      return {
        ...state,
        isFetching: false,
        reqGetMobileInfo: REQ_STATUS.FAILED,
      }
    }
    case GET_VERIFY_CODE_SUCCESS: {
      return {
        ...state,
        vcTimeOut: 60,
        lastReqVerifyCodeState: REQ_STATUS.SUCCESSED,
        isFetching: false
      }
    }
    case GET_VERIFY_CODE_FAILURE: {
      return {
        ...state,
        lastReqVerifyCodeState: REQ_STATUS.FAILED,
        isFetching: false
      }
    }
    case VALIDATE_VERIFY_CODE_SUCCESS: {
      return {
        ...state,
        lastReqValidateVCState: REQ_STATUS.SUCCESSED,
        isFetching: false
      }
    }
    case VALIDATE_VERIFY_CODE_FAILURE: {
      return {
        ...state,
        lastReqValidateVCState: REQ_STATUS.FAILED,
        isFetching: false
      }
    }
    case BIND_MOBILE_SUCCESS: {
      sessionStore.setSessionStoreItem('LOGINED', true);
      return {
        ...state,
        loggedIn: true,
        pid: action.response.pid || '',
        lastReqBindMobileState: REQ_STATUS.SUCCESSED,
        isFetching: false
      }
    }
    case BIND_MOBILE_FAILURE: {
      return {
        ...state,
        lastReqBindMobileState: REQ_STATUS.FAILED,
        isFetching: false
      }
    }
    case UNBIND_MOBILE_SUCCESS: {
      sessionStore.setSessionStoreItem('LOGINED', false);
      return {
        ...state,
        loggedIn: false,
        // mobileBindWithOpenID: '',
        lastReqUnbindMobileState: REQ_STATUS.SUCCESSED,
        isFetching: false
      }
    }
    case UNBIND_MOBILE_FAILURE: {
      return {
        ...state,
        lastReqUnbindMobileState: REQ_STATUS.FAILED,
        isFetching: false
      }
    }
    default:
      return state
  }

}