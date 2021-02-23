
import React, { useRef, useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, View, ScrollView, Text, Image, ImageBackground, Animated } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../types';

import Colors from '../constants/Colors';
import ShellStyles from '../constants/Shell';
import Icon from '../components/Icons';
import I18n from '../i18n/i18n';
import Styles from '../constants/Login';

import {
  fetchMobile,
  fetchVerifyCode,
  updateTimeout,
  fetchValidateVerfiyCode,
  clearReqStatus,
  fetchUnbindMobile,
  fetchBindMobile,
  clearClock,
  updateMobile,
} from '../store/system/actions';
import { HEALTH_REC_VIEW_MDOE, REQ_STATUS } from '../store/enum';
import { ROOT_STATE } from '../store/interface';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
};


enum INVALID_STATES {
  INP_MOBILE_INVALID = 'INP_MOBILE_INVALID',
  INP_VC_CODE_INVALID = 'INP_VC_CODE_INVALID',
  REQ_VC_CODE_FAILED = 'REQ_VC_CODE_FAILED',
  // SINGED_IN_OTHER_PLATFORM = 'SINGED_IN_OTHER_PLATFORM',
  NO_SET_PWD = 'NO_SET_PWD',
  NO_REGISTER = 'NO_REGISTER',
  INP_PWD_INVALID = 'INP_PWD_INVALID',
}

enum AREAS {
  MOBILE = 'mobile',
  CLEARBTN = 'clearBtn',
  SECONDINP = 'secondInp',
  SWITCH_VIEW_PWD_BTN = 'switchViewPWDBtn'
}

enum LOGIN_MODE {
  VC = 'verification code',
  PWD = 'password'
}

const MSGS: { [key: string]: { [key: string]: string } } = {
  INP_MOBILE_INVALID: {
    TITLE: 'login-title-invalid-phone-num',
    DESC: 'login-desc-invalid-phone-num'
  },
  INP_VC_CODE_INVALID: {
    TITLE: 'login-title-ver-code-err',
    DESC: 'login-desc-ver-code-err'
  },
  REQ_VC_CODE_FAILED: {
    TITLE: 'login-title-ver-code-send-err',
    DESC: 'login-desc-ver-code-err'
  },
  NO_SET_PWD: {
    TITLE: 'login-title-no-set-pwd',
    DESC: 'login-desc-no-set-pwd'
  },
  NO_REGISTER: {
    TITLE: 'login-title-no-register',
    DESC: 'login-desc-no-register',
  },
  INP_PWD_INVALID: {
    TITLE: 'login-title-pwd-invalid',
    DESC: 'login-desc-pwd-invalid',
  }
}

let counter: NodeJS.Timeout;

const Login: React.FC<Props> = ({ navigation }) => {
  const {
    hasPwd,
    openID,
    hasHealthRecord,
    isFetching,
    mobileBindWithOpenID,
    lastReqBindMobileState,
    lastReqUnbindMobileState,
    lastReqValidateVCState,
    lastReqVerifyCodeState,
    reqGetMobileInfo,
    hasClock,
    hasRegister,
    keepToken,
    vcTimeOut,
  } = useSelector((state: ROOT_STATE) => state.system);


  const route = useRoute();
  /**
   * Initial the state and the selector data from the redux
   * **/
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [password, setPassword] = useState('');
  const [hidePwdVal, setHidePwdVal] = useState(true);

  const [inpFocus, setInpFocus] = useState(false);
  const [mobileInpFocus, setMobileInpFocus] = useState(false);
  const [clearFocus, setClearFocus] = useState(false);
  const [secondInpFocus, setSecondInpFocus] = useState(false);
  const [viewPwdBtnFocus, setViewPwdBtnFocus] = useState(false);
  const [inpInvalid, setInpInvalid] = useState(false);

  const [loginMode, setLoginMode] = useState(LOGIN_MODE.VC);
  const [activeSecondInp, setActiveSecondInp] = useState(false);
  const [stateCode, setStateCode] = useState('');
  const [count, setCount] = useState(0);
  const [listenUnBindReq, setListenUnBindReq] = useState(false);


  useEffect(() => {
    if (reqGetMobileInfo === REQ_STATUS.SUCCESSED) {
      if (inpInvalid) {
        return setStateCode(INVALID_STATES.INP_MOBILE_INVALID);
      }
      if (loginMode === LOGIN_MODE.PWD) {
        if (mobile && mobile.length === 11 && !hasRegister) return setStateCode(INVALID_STATES.NO_REGISTER);
        if (mobile && mobile.length === 11 && !hasPwd) return setStateCode(INVALID_STATES.NO_SET_PWD);
      }
      setStateCode('');
    }
  }, [hasPwd, hasRegister, reqGetMobileInfo, loginMode])

  useEffect(() => {
    if (!hasClock &&
      (vcTimeOut === 60 && lastReqVerifyCodeState === REQ_STATUS.SUCCESSED
        || (lastReqVerifyCodeState === REQ_STATUS.IDLE && activeSecondInp && vcTimeOut > 0))) {
      let clock = vcTimeOut;
      const timer = () => {
        clock--;
        dispatch(updateTimeout(clock))
        if (clock <= 0) {
          counter && clearInterval(counter);
        }
      };
      counter = setInterval(timer, 1000);
    }
    setCount(vcTimeOut);
  }, [vcTimeOut, hasClock, activeSecondInp, lastReqVerifyCodeState]);

  useEffect(() => {
    if (loginMode === LOGIN_MODE.VC) {
      switch (lastReqValidateVCState) {
        case REQ_STATUS.FAILED: {
          dispatch(clearReqStatus());
          return setStateCode(INVALID_STATES.INP_VC_CODE_INVALID);
        }
        case REQ_STATUS.SUCCESSED: {
          return navNextStep();
        }
      }
    }
  }, [lastReqValidateVCState, loginMode]);

  useEffect(() => {
    if (lastReqUnbindMobileState === REQ_STATUS.SUCCESSED && route.name === 'Login' && listenUnBindReq) {
      navNextStep();
      setListenUnBindReq(false);
    }
  }, [lastReqUnbindMobileState, listenUnBindReq]);

  useEffect(() => {
    if (lastReqBindMobileState === REQ_STATUS.SUCCESSED) {
      clearInterval(counter);
      dispatch(clearClock());
      dispatch(updateMobile(mobile));
      setActiveSecondInp(false);
      transfromYOutAnim();
      setLoginMode(LOGIN_MODE.VC);
      setMobile('');
      setVerifyCode('');
      setPassword('');
      if (mobileBindWithOpenID && openID && openID !== mobileBindWithOpenID) {
        return navigation.navigate('Info', { token: keepToken || '' });
      }
      if (!hasPwd && !hasRegister) {
        return navigation.navigate('SetPwd', { token: keepToken || '' });
      }
      if (!hasHealthRecord) {
        return navigation.navigate('HealthRecord', { token: keepToken || '', mode: HEALTH_REC_VIEW_MDOE.COMPLETE, from: 'Login' });
      }
      navigation.navigate('Home', { token: keepToken || '', subRoute: 'Main' });
    } else if (lastReqBindMobileState === REQ_STATUS.FAILED) {
      setStateCode(loginMode === LOGIN_MODE.PWD && INVALID_STATES.INP_PWD_INVALID || INVALID_STATES.INP_VC_CODE_INVALID);
    }
    dispatch(clearReqStatus());
  }, [lastReqBindMobileState, openID, mobileBindWithOpenID])

  /***
   * Formatter/calc class
   * @Sujun
   * **/
  const calcDisableGoNext = (): boolean => {
    let disabled = true;
    if (!mobile) {
      disabled = true;
    } else if (loginMode === LOGIN_MODE.VC) {
      disabled = inpInvalid || !verifyCode || stateCode === INVALID_STATES.INP_VC_CODE_INVALID
    } else {
      disabled = inpInvalid || !password || stateCode === INVALID_STATES.INP_PWD_INVALID
        || !hasPwd || !hasRegister;
    }
    return disabled;
  };

  const formatDesc = () => I18n.t(MSGS[stateCode].DESC);
  /**
   * Eevent Handlers
   * @Sujun 
   * **/
  // Handler for change the mobile value from the input field;
  const inpMobile = (mobile: string) => {
    if (mobile.length >= 11) {
      const invalid = !mobile.startsWith('1') || mobile.length !== 11;
      setInpInvalid(mobile && invalid || false);
      if (invalid && mobile) {
        setStateCode(INVALID_STATES.INP_MOBILE_INVALID);
      } else {
        mobile && dispatch(fetchMobile(mobile));
        if (stateCode === INVALID_STATES.INP_MOBILE_INVALID) {
          setStateCode('');
        }
      }
    } else {
      setStateCode('');
    }
    setMobile(mobile);
  };

  const validateMobile = (mobile: string): boolean => (!mobile.startsWith('1') || mobile.length !== 11);

  const sendVRCode = () => {
    if (mobile && !inpInvalid) {
      setActiveSecondInp(true);
      transfromYInAnim();
      dispatch(fetchMobile(mobile));
      if (vcTimeOut === undefined || vcTimeOut === 0) {
        dispatch(fetchVerifyCode(mobile));
      }
    }
  };

  const login = () => {
    if (!calcDisableGoNext()) {
      if (inpInvalid) {
        return setStateCode(INVALID_STATES.INP_MOBILE_INVALID);
      }
      switch (loginMode) {
        case LOGIN_MODE.VC:
          if (verifyCode.length < 6) {
            return setStateCode(INVALID_STATES.INP_VC_CODE_INVALID);
          }
          // if (stateCode !== INVALID_STATES.SINGED_IN_OTHER_PLATFORM) {
          setStateCode('');
          // }
          dispatch(fetchValidateVerfiyCode({ mobile, code: verifyCode }));
          break;
        case LOGIN_MODE.PWD:
          navNextStep();
          // dispatch(fetchBindMobile({mobile, code: verifyCode}));
          break;
      }

      // const curSecInpVal = loginMode === LOGIN_MODE.VC && verifyCode || password;
    }
  };

  const calcFocus = (area: AREAS, tgtVal: boolean) => {
    let res = false;
    switch (area) {
      case AREAS.MOBILE:
        setMobileInpFocus(tgtVal);
        if (tgtVal || secondInpFocus || clearFocus || viewPwdBtnFocus) {
          res = true;
        }
        break;
      case AREAS.CLEARBTN:
        setClearFocus(tgtVal);
        if (mobileInpFocus || secondInpFocus || tgtVal || viewPwdBtnFocus) {
          res = true;
        }
        break;
      case AREAS.SECONDINP:
        setSecondInpFocus(tgtVal);
        if (mobileInpFocus || tgtVal || clearFocus || viewPwdBtnFocus) {
          res = true;
        }
        break;
      case AREAS.SWITCH_VIEW_PWD_BTN:
        setViewPwdBtnFocus(tgtVal);
        if (mobileInpFocus || secondInpFocus || clearFocus || tgtVal) {
          res = true;
        }
        break;
    }
    setInpFocus(res);
  }

  const swithLoginMode = () => {
    const tgtMode = loginMode === LOGIN_MODE.VC && LOGIN_MODE.PWD || LOGIN_MODE.VC;
    dispatch(clearReqStatus());
    if (tgtMode === LOGIN_MODE.PWD) {
      setActiveSecondInp(false);
      transfromYOutAnim();
      setVerifyCode('');
      transfromYInAnim();
    } else {
      setPassword('');
      transfromYOutAnim();
    }
    setLoginMode(tgtMode);
  }

  const navNextStep = () => {
    if (openID && mobileBindWithOpenID && openID !== mobileBindWithOpenID && lastReqUnbindMobileState === REQ_STATUS.IDLE) {
      setListenUnBindReq(true);
      dispatch(fetchUnbindMobile(mobileBindWithOpenID));
      return;
    }
    if (lastReqBindMobileState === REQ_STATUS.IDLE) {
      const params = loginMode === LOGIN_MODE.PWD && { openid: openID, mobile, password } || { openid: openID, mobile };
      dispatch(fetchBindMobile(params));
    }
  };

  /**
   * Animatations for the screen
   * @Sujun
   * **/
  const transfromYAnim = useRef(new Animated.Value(48)).current;
  const transfromYInAnim = () => {
    Animated.timing(transfromYAnim, {
      toValue: 96,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const transfromYOutAnim = () => {
    Animated.timing(transfromYAnim, {
      toValue: 48,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  /**
   * Render for the login screen
   * @Sujun
   * **/
  return <ScrollView
    style={Styles.con}
    stickyHeaderIndices={[0]}
    showsVerticalScrollIndicator={false} >
    <View style={ShellStyles.stickyShdow} />
    <View style={ShellStyles.stickyShdowMark} />
    <View style={Styles.mainCon}>
      <View style={Styles.bgCon}>
        <ImageBackground source={require("../assets/images/bg.png")} style={Styles.bg} />
      </View>
      <View style={Styles.headerCon}>
        {!stateCode && <Image style={Styles.voxelcloudLogo} source={require("../assets/images/logo.svg")} />}
        {stateCode && MSGS[stateCode] && <Text style={Styles.msgTitle}>{I18n.t(MSGS[stateCode].TITLE)}</Text> || <Text style={Styles.title}>{I18n.t('login-title')}</Text>}
        {stateCode && MSGS[stateCode] && <Text style={Styles.msgDesc}>{formatDesc()}</Text> || <Text style={Styles.desc}>{I18n.t('login-desc')}</Text>}
        <Animated.View style={[
          inpFocus && Styles.inpConFocus || Styles.inpCon,
          {
            height: transfromYAnim
          }
        ]}
        >
          <View style={Styles.mobileInpCon}>
            <TextInput
              underlineColorAndroid='transparent'
              style={[Styles.mobileInp, {
                backgroundColor: inpFocus && 'rgba(255, 255, 255, 1)' || 'rgba(69, 79, 91, 1)',
                color: inpFocus && 'rgba(69, 79, 91, 1)' || 'rgba(255, 255, 255, 0.3)'
              }]}
              keyboardType='phone-pad'
              onChangeText={text => inpMobile(text)}
              value={mobile}
              placeholder={loginMode === LOGIN_MODE.VC && I18n.t('login-ph-mobile') || I18n.t('login-ph-mobile-pw-mode')}
              onFocus={() => calcFocus(AREAS.MOBILE, true)}
              onBlur={() => calcFocus(AREAS.MOBILE, false)}
              placeholderTextColor={inpFocus && 'rgba(0, 0, 0, 0.26)' || 'rgba(255, 255, 255, 0.3)'} />
            {mobile
              && <TouchableOpacity
                style={inpFocus && Styles.clearValBtn || Styles.hideValBtn}
                onFocus={() => calcFocus(AREAS.CLEARBTN, true)}
                onBlur={() => calcFocus(AREAS.CLEARBTN, false)}
                onPress={() => {
                  calcFocus(AREAS.CLEARBTN, false);
                  inpMobile('');
                }}
              >
                <Icon name='ic_close_24px' size={14} color="rgba(0, 0, 0, 0.54)" />
              </TouchableOpacity>}
          </View>
          <Animated.View
            style={[
              Styles.secondInpCon,
              {
                height: transfromYAnim
              }
            ]}
          >
            <TextInput
              underlineColorAndroid='transparent'
              style={[
                inpFocus && Styles.secondInpFocus || Styles.secondInpNormal,
                {
                  display: loginMode === LOGIN_MODE.VC && 'flex' || 'none',
                }
              ]}
              keyboardType='number-pad'
              onChangeText={(val: string) => {
                if (stateCode === INVALID_STATES.INP_VC_CODE_INVALID) {
                  setStateCode('');
                }
                setVerifyCode(val);
              }}
              value={verifyCode}
              maxLength={6}
              onFocus={() => calcFocus(AREAS.SECONDINP, true)}
              onBlur={() => calcFocus(AREAS.SECONDINP, false)}
              placeholderTextColor={inpFocus && 'rgba(0, 0, 0, 0.26)' || 'rgba(255, 255, 255, 0.3)'}
              placeholder={I18n.t('login-ph-vr-code')} />
            <TextInput
              underlineColorAndroid='transparent'
              style={[
                inpFocus && Styles.secondInpFocus || Styles.secondInpNormal,
                {
                  display: loginMode === LOGIN_MODE.PWD && 'flex' || 'none',
                }
              ]}
              onChangeText={(val: string) => {
                if (stateCode === INVALID_STATES.INP_PWD_INVALID) {
                  setStateCode('');
                }
                setPassword(val);
              }}
              value={password}
              secureTextEntry={hidePwdVal}
              onFocus={() => calcFocus(AREAS.SECONDINP, true)}
              onBlur={() => calcFocus(AREAS.SECONDINP, false)}
              placeholderTextColor={inpFocus && 'rgba(0, 0, 0, 0.26)' || 'rgba(255, 255, 255, 0.3)'}
              placeholder={I18n.t('login-ph-pwd')} />
            {loginMode === LOGIN_MODE.VC
              && <TouchableOpacity
                style={Styles.inpRightAction}
                onPress={sendVRCode}
              >
                <Text style={[Styles.inpRightActionText, {
                  color: inpFocus && (count === 0 && 'rgba(35, 178, 190, 1)' || 'rgba(0, 0, 0, 0.26)') || (count === 0 && 'rgba(24, 255, 255, 1)' || 'rgba(255, 255, 255, 0.3)')
                }]}
                  onPress={() => count === 0 && sendVRCode()}>
                  {count !== undefined && (count > 0 && (I18n.t('login-ph-send-vc-again') + ' ' + count) || I18n.t('login-btn-send-vr-code')) || ''}
                </Text>
              </TouchableOpacity >
              || <TouchableOpacity style={[
                Styles.inpRightAction,
                {
                  opacity: inpFocus && 1 || 0,
                }
              ]}
                onFocus={() => calcFocus(AREAS.SWITCH_VIEW_PWD_BTN, true)}
                onBlur={() => calcFocus(AREAS.SWITCH_VIEW_PWD_BTN, false)}
                onPress={() => {
                  calcFocus(AREAS.SWITCH_VIEW_PWD_BTN, true);
                  setHidePwdVal(!hidePwdVal);
                }}
              >
                <Icon style={Styles.inpRightActionIcon} name={hidePwdVal && 'ic_remove_red_eye_24' || 'ic_visibility_off_24'} size={14} color="rgba(0, 0, 0, 0.54)" />
              </TouchableOpacity>}
          </Animated.View>
        </Animated.View>
        <View style={Styles.actionCon}>
          <TouchableOpacity>
            <Text
              style={Styles.switchLoginModeBtn}
              accessibilityRole='button'
              onPress={swithLoginMode}
            >
              {loginMode === LOGIN_MODE.VC && I18n.t('login-btn-switch-to-pwd-mode') || I18n.t('login-btn-switch-to-phone-vr-mode')}
            </Text>
          </TouchableOpacity>
          {loginMode === LOGIN_MODE.VC && !activeSecondInp &&
            <TouchableOpacity><Text
              style={validateMobile(mobile) && Styles.btnDisabled || Styles.btn}
              onPress={sendVRCode}
            >{I18n.t('login-btn-send-vr-code')}</Text></TouchableOpacity>
            || <TouchableOpacity><Text
              style={calcDisableGoNext() && Styles.btnDisabled || Styles.btn}
              onPress={login}
            >{I18n.t('login-btn-next-step')}</Text></TouchableOpacity>}
        </View>
      </View>
    </View>
  </ScrollView >
};

export default Login;
