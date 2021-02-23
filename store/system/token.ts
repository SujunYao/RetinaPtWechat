import { TOKEN_PARAMS, ROUTE } from './types';
import { NO_LOGIN_VALS, REDIRECT_VALS, URL_PARAMS } from '../enum';

const TOKEN_REGEX = new RegExp("[?&]token(=([^&#]*)|&|#|$)");

/**
 * analysis the token value (bas64 => string);
 * @Sujun
 * **/
const getToken = (): string | null => {
  const results = TOKEN_REGEX.exec(location.href);
  if (!results) return null;
  if (!results[2]) return null;
  let _bStr = decodeURIComponent(results[2].replace(/\+/g, '')); // base 64 code;
  if (Math.ceil(_bStr.length / 4) > 0) {
    _bStr.padEnd(Math.ceil(_bStr.length / 4), '=');
  }
  return atob(_bStr);
}

/**
 * analysis the hash and route params
 * @Sujun
 * **/
const getTgtRouteName = (URL: string): ROUTE => {
  const res: ROUTE = { routeName: '', routeParams: {} };
  const [hash, params] = URL.split('?');
  res.routeName = hash || '';
  const routeParams = new URLSearchParams(params);
  routeParams.forEach((value, key) => {
    res.routeParams[key] = value;
  });
  return res;
};

export default (): TOKEN_PARAMS => {
  const res = {
    openID: '',
    noNeedLogin: false,
    lockRoute: false,
    rRouteName: '',
    keepToken: '',
    rRouteParams: {}
  }
  const tokenVal = getToken();
  if (tokenVal) {
    const [paramsStr, hashStr] = tokenVal.split('#');
    const tokenParams = new URLSearchParams(paramsStr);
    res.openID = tokenParams.get(URL_PARAMS.OPENID) || '';
    res.noNeedLogin = tokenParams.get(URL_PARAMS.NO_NEED_LOGIN) === NO_LOGIN_VALS.TRUE;
    res.lockRoute = tokenParams.get(URL_PARAMS.LOCK_ROUTE) === REDIRECT_VALS.FALSE;
    const route = getTgtRouteName(hashStr || '');
    res.rRouteName = route.routeName;
    res.rRouteParams = route.routeParams;
    // Hide the security data in URL;
    tokenParams.delete(URL_PARAMS.OPENID);
    tokenParams.delete(URL_PARAMS.NO_NEED_LOGIN);
    res.keepToken = Buffer.from(decodeURIComponent(tokenParams.toString()) || '', 'binary').toString('base64');
  }
  return res;
};