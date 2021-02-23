import { TOKEN_PARAMS, CLOCK_PARAMS } from './types';
import { STOREAGE_KEYS, NO_LOGIN_VALS, REDIRECT_VALS } from '../enum';
import { types } from '@babel/core';

// interface SESSION_INP:{ typeof TOKEN_PARAMS | typeof CLOCK_PARAMS };

export default {
  getSessionStore: (): TOKEN_PARAMS & CLOCK_PARAMS & { logined: boolean } => {
    const openID = sessionStorage.getItem(STOREAGE_KEYS.OPENID) || '';
    const noNeedLogin = openID !== '' && sessionStorage.getItem(STOREAGE_KEYS.NO_NEED_LOGIN) === NO_LOGIN_VALS.TRUE;
    const rRouteName = sessionStorage.getItem(STOREAGE_KEYS.R_ROUTE) || '';
    const lockRoute = rRouteName !== '' && sessionStorage.getItem(STOREAGE_KEYS.LOCK_ROUTE) === REDIRECT_VALS.FALSE;
    const rRouteParams = JSON.parse(sessionStorage.getItem(STOREAGE_KEYS.R_ROUTE_PARAMS) || '{}');
    const keepToken = sessionStorage.getItem(STOREAGE_KEYS.KEEP_TOKEN) || '';
    const vcClock = sessionStorage.getItem(STOREAGE_KEYS.VC_CLOCK) || undefined;
    const logined = sessionStorage.getItem(STOREAGE_KEYS.LOGINED) === 'true' || false;
    return {
      openID,
      noNeedLogin,
      lockRoute,
      rRouteName,
      rRouteParams,
      keepToken,
      logined,
      clock: vcClock && parseInt(vcClock, 10) || undefined,
    };
  },

  setSessionStore: (data: TOKEN_PARAMS) => {
    sessionStorage.setItem(STOREAGE_KEYS.OPENID, data.openID || '');
    sessionStorage.setItem(STOREAGE_KEYS.NO_NEED_LOGIN, (data.noNeedLogin && NO_LOGIN_VALS.TRUE) || NO_LOGIN_VALS.FALSE);
    sessionStorage.setItem(STOREAGE_KEYS.LOCK_ROUTE, (data.lockRoute && REDIRECT_VALS.FALSE) || REDIRECT_VALS.TRUE);
    sessionStorage.setItem(STOREAGE_KEYS.R_ROUTE, data.rRouteName || '');
    sessionStorage.setItem(STOREAGE_KEYS.R_ROUTE_PARAMS, JSON.stringify(data.rRouteParams || {}));
    sessionStorage.setItem(STOREAGE_KEYS.KEEP_TOKEN, data.keepToken || '');
  },

  setSessionStoreItem: (key: string, value: any) => {
    switch (key) {
      case 'LOGINED':
        sessionStorage.setItem(STOREAGE_KEYS.LOGINED, value.toString());
        break;
    }
  },

  setSessionStoreClock: (data: CLOCK_PARAMS) => {
    sessionStorage.setItem(STOREAGE_KEYS.VC_CLOCK, data.clock && data.clock.toString() || '');
  }
};