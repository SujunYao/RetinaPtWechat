import React, { useLayoutEffect, useState, useEffect } from 'react';
import { TouchableOpacity, View, ScrollView, Text, Image, ImageBackground, Animated } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../types';

import { FIELD_STATE, REQ_STATUS, THEME } from '../store/enum';
import { ROOT_STATE } from '../store/interface';
import { setUserPwd, clearUserReqStatus } from '../store/user/actions';
import Field from '../components/Field';
import ShellStyles from '../constants/Shell';
import I18n from '../i18n/i18n';
import Styles from '../constants/ReSetPwd';
import MessageBox from '../components/MessageBox';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ReSetPwd'
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
};

const validPWD = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;

const ReSetPwd: React.FC<Props> = ({ navigation }) => {

  const { openID, keepToken } = useSelector((state: ROOT_STATE) => state.system);
  const { reqSetPwdState } = useSelector((state: ROOT_STATE) => state.user)
  const [showMessageBox, setShowMessageBox] = useState(false);

  useEffect(() => {
    if (reqSetPwdState === REQ_STATUS.SUCCESSED) {
      setShowMessageBox(true);
      dispatch(clearUserReqStatus());
    }
  }, [reqSetPwdState]);

  const [pwd1, setPwd1] = useState('');
  const [inpState1, setInpState1] = useState(FIELD_STATE.DEF);
  const [inp1HelpTxt, setInp1HelpTxt] = useState(I18n.t('register-valid-desc'));
  const [pwd2, setPwd2] = useState('');
  const [inpState2, setInpState2] = useState(FIELD_STATE.DEF);
  const [inp2HelpTxt, setInp2HelpTxt] = useState(I18n.t('register-valid-desc'));
  const dispatch = useDispatch();

  const changePwd1 = (val: string) => {
    setPwd1(val);
    let invalide = !validPWD.test(val);
    let HelpTxt = I18n.t('register-valid-desc');
    if (pwd2 && pwd2 !== val) {
      if (!invalide) {
        HelpTxt = I18n.t('reset-pwd-txt-invalid-not-same');
      }
      invalide = true;
    }
    if (!invalide) {
      setInpState1(FIELD_STATE.FOCUS);
      setInp2HelpTxt(I18n.t('register-valid-desc'));
      if (inp2HelpTxt === I18n.t('reset-pwd-txt-invalid-not-same')) {
        setInpState2(FIELD_STATE.DEF);
        setInp2HelpTxt(I18n.t('register-valid-desc'));
      }
    } else {
      setInp1HelpTxt(HelpTxt);
      setInpState1(FIELD_STATE.WARN);
    }
  };

  const changePwd2 = (val: string) => {
    setPwd2(val);
    let invalide = !validPWD.test(val);
    let HelpTxt = I18n.t('register-valid-desc');
    if (pwd1 && pwd1 !== val) {
      if (!invalide) {
        HelpTxt = I18n.t('reset-pwd-txt-invalid-not-same');
      }
      invalide = true;
    }

    if (!invalide) {
      setInpState2(FIELD_STATE.FOCUS);
      setInp2HelpTxt(I18n.t('register-valid-desc'))
      if (inp1HelpTxt === I18n.t('reset-pwd-txt-invalid-not-same')) {
        setInpState1(FIELD_STATE.DEF);
        setInp1HelpTxt(I18n.t('register-valid-desc'));
      }
    } else {
      setInp2HelpTxt(HelpTxt);
      setInpState2(FIELD_STATE.WARN);
    }
  };

  const changePWD = () => {
    if (pwd1 && pwd2 && inpState1 !== FIELD_STATE.WARN && inpState2 !== FIELD_STATE.WARN) {
      dispatch(setUserPwd({ openid: openID, password: pwd1 }));
    }
  };

  return <>
    <ScrollView
      style={Styles.con}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false} >
      <View style={ShellStyles.stickyShdow} />
      <View style={ShellStyles.stickyShdowMark} />
      <View style={Styles.mainCon}>
        <Text style={Styles.title}>{I18n.t('reset-pwd-card-title')}</Text>
        <View style={Styles.cardCon}>
          <Field
            inpValue={pwd1}
            state={inpState1}
            onChangeText={changePwd1}
            label={I18n.t('reset-pwd-label-new-pwd')}
            helpTxt={inp1HelpTxt}
            theme={THEME.LIGHT}
            showClearBtn={true}
            showRightAction={true} />
          <Field
            inpValue={pwd2}
            state={inpState2}
            theme={THEME.LIGHT}
            onChangeText={changePwd2}
            label={I18n.t('reset-pwd-label-confirm-new-pwd')}
            helpTxt={inp2HelpTxt}
            showClearBtn={true}
            showRightAction={true} />
        </View>
        <TouchableOpacity onPress={changePWD} style={[Styles.saveBtn, {
          backgroundColor: (!pwd1 || !pwd2 || inpState1 === FIELD_STATE.WARN || inpState2 === FIELD_STATE.WARN) && 'rgba(236, 239, 241, 1)' || 'rgba(35, 178, 190, 1)',
        }]}>
          <Text style={[Styles.saveBtnTxt, {
            color: (!pwd1 || !pwd2 || inpState1 === FIELD_STATE.WARN || inpState2 === FIELD_STATE.WARN) && 'rgba(0, 0, 0, 0.26)' || 'rgba(255, 255, 255, 1)',
          }]}>{I18n.t('reset-pwd-btn-save')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    <MessageBox
      title={I18n.t('reset-pwd-msgbox-title')}
      desc={I18n.t('reset-pwd-msgbox-desc')}
      okBtnTxt={I18n.t('reset-pwd-msgbox-btn-ok')}
      okBtnClickFn={() => {
        navigation.navigate('Home', { token: keepToken || '', subRoute: 'Setting' });
      }}
      onCloseFn={() => setShowMessageBox(false)}
      show={showMessageBox}
      hideCancelBtn={true}
    />
  </>
};

export default ReSetPwd;