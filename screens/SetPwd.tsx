import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../types';

import { FIELD_STATE, REQ_STATUS, HEALTH_REC_VIEW_MDOE } from '../store/enum';
import { ROOT_STATE } from '../store/interface';
import { setUserPwd, clearUserReqStatus } from '../store/user/actions';
import Field from '../components/Field';
import ShellStyles from '../constants/Shell';
import I18n from '../i18n/i18n';
import Styles from '../constants/SetPwd';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SetPwd'
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
};

const validPWD = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;

const SetPwd: React.FC<Props> = ({ navigation }) => {

  const { openID, mobile, hasHealthRecord, keepToken } = useSelector((state: ROOT_STATE) => state.system);
  const { reqSetPwdState } = useSelector((state: ROOT_STATE) => state.user)

  const [pwd, setPwd] = useState('');
  const [secureMode, setSecureMode] = useState(true);
  const [inpState, setInpState] = useState(FIELD_STATE.DEF);
  const dispatch = useDispatch();


  useEffect(() => {
    if (reqSetPwdState === REQ_STATUS.SUCCESSED) {
      if (!hasHealthRecord) {
        navigation.navigate('HealthRecord', { token: keepToken || '', mode: HEALTH_REC_VIEW_MDOE.COMPLETE, from: 'SetPwd' });
      } else {
        navigation.navigate('Home', { token: keepToken || '' });
      }
      dispatch(clearUserReqStatus());
    }
  }, [reqSetPwdState]);

  const changePwd = (val: string) => {
    setPwd(val);
    let invalide = !validPWD.test(val);
    if (!invalide) {
      setInpState(FIELD_STATE.FOCUS);
    }
  };

  const switchPwdMode = () => {
    setSecureMode(!secureMode);

  };

  const navTo = () => {
    let invalide = !validPWD.test(pwd);
    if (invalide) {
      setInpState(FIELD_STATE.WARN);
    } else {
      dispatch(setUserPwd({ openid: openID, password: pwd }));
    }
  };

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
      <View>
        <Text style={Styles.msgTitle}>{I18n.t('register-pwd-title')}</Text>
        <Text style={Styles.msgDesc}>
          {I18n.t('register-pwd-des-1')}
          <Text style={Styles.mobile}>{mobile}</Text>
          {I18n.t("register-pwd-des-2")}
        </Text>
      </View>
      <View style={Styles.InpConBox}>
        <Field
          inpValue={pwd}
          state={inpState}
          onChangeText={changePwd}
          clickRightAction={switchPwdMode}
          secureTextEntry={secureMode}
          label={I18n.t('register-label-pwd')}
          actionIcon={secureMode && 'ic_remove_red_eye_24' || 'ic_visibility_off_24'}
          helpTxt={I18n.t('register-valid-desc')}
          showRightAction={true} />
      </View>
      <Text
        accessibilityRole='button'
        style={[Styles.nextStepBtn, {
          backgroundColor: (inpState === FIELD_STATE.WARN || !pwd) && 'rgba(236, 239, 241, 1)' || 'rgba(35, 178, 190, 1)',
          color: (inpState === FIELD_STATE.WARN || !pwd) && 'rgba(0, 0, 0, 0.26)' || 'rgba(255, 255, 255, 1)',
        }]}
        onPress={navTo}
      >
        {I18n.t('register-btn-next-step')}
      </Text>
    </View>
  </ScrollView>;
}

export default SetPwd;