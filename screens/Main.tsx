import React, { useState, useEffect } from 'react';
import { TouchableOpacity, FlatList, View, ScrollView, Text, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../types';

import ShellStyles from '../constants/Shell';
import Icon from '../components/Icons';
import I18n from '../i18n/i18n';
import Styles from '../constants/Home';
import { GENDER, APPT_STATUS, TIMEI18N, APPT_ACTION_BTNS, TIME, HEALTH_REC_VIEW_MDOE } from '../store/enum';
import { ROOT_STATE } from '../store/interface';
import { switchShowAPPT, getOrgInfo, getScope, getAPPT } from '../store/appt/actions';
import MessageToast from '../components/MessageToast';
import { fetchLastReprt } from '../store/report/actions';


type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
};

const MainScreen: React.FC<Props> = ({ navigation }) => {

  const { name, gender, birthday } = useSelector((state: ROOT_STATE) => state.user)
  const { lastExamInfo: { exam, reservation } } = useSelector((state: ROOT_STATE) => state.report);
  const { keepToken, pid, toast: { showToast }, apptState: { goRefresh, from } } = useSelector((state: ROOT_STATE) => state.system);

  const [hasRpt, setHasRpt] = useState(true);
  const arr: Array<{ txt: string, showLine: boolean }> = []
  const [diseaseArr, setDiseaseArr] = useState(arr);
  const [confirmedTime, setConfirmedTime] = useState('');
  const [statusTxt, setStatusTxt] = useState('');
  const [statusSecTxt, setStatusSecTxt] = useState('');
  const [apptActionBtnTxt, setApptActionBtnTxt] = useState('');
  const [APPTStatus, setAPPTStatus] = useState(APPT_STATUS.NEW); // appointment status

  const dispatch = useDispatch();

  useEffect(() => {
    if (goRefresh && from === 'home') {
      dispatch(fetchLastReprt(pid));
    }
  }, [goRefresh, from]);

  useEffect(() => {
    const _hasRpt = Object.keys(exam).length > 0;
    const _arr = [];
    if (_hasRpt) {
      const { disease, transferReexam } = exam;
      if (disease) {
        _arr.push({ txt: disease, showLine: false });
      }
      if (transferReexam) {
        if (_arr.length > 0) {
          _arr[0].showLine = true;
        }
        _arr.push({ txt: transferReexam, showLine: false });
      }
      setDiseaseArr(_arr);
    }
    setHasRpt(_hasRpt);
  }, [exam])

  useEffect(() => {
    if (Object.keys(reservation).length > 0) {
      const { status, confirmTime } = reservation;

      let _confirmedTime = ''
      if (status === APPT_STATUS.CONFIRMED && confirmTime) {
        const { month, day, available } = confirmTime;
        let timeI18n = ''
        switch (available) {
          case TIME.AM:
            timeI18n = TIMEI18N.AM;
            break;
          case TIME.PM:
            timeI18n = TIMEI18N.PM;
            break;
        }
        _confirmedTime = `${`${month}`.padStart(2, '0')}/${`${day}`.padStart(2, '0')} ${timeI18n && I18n.t(timeI18n) || ''}`
      }
      let _statusTxtI18n = '', _statusSecTxtI18n = '', _apptActionBtnTxt = '';
      switch (status) {
        case APPT_STATUS.CONFIRMING:
          _statusTxtI18n = 'dating-state-confirming-title';
          _statusSecTxtI18n = 'dating-state-confirming-des';
          _apptActionBtnTxt = APPT_ACTION_BTNS.CONFIRMING;
          break;
        case APPT_STATUS.CONFIRMED:
          _statusTxtI18n = 'dating-state-cmplt-title';
          _apptActionBtnTxt = APPT_ACTION_BTNS.CONFIRMED;
          break;
        case APPT_STATUS.EXPIRED:
          _statusTxtI18n = 'dating-state-expired-title';
          _apptActionBtnTxt = APPT_ACTION_BTNS.EXPIRED;
          break;
        default:
          _apptActionBtnTxt = APPT_ACTION_BTNS.NEW;
          _statusTxtI18n = 'dating-state-noDataing-title';
          break;
      }
      setStatusTxt(I18n.t(_statusTxtI18n));
      setApptActionBtnTxt(I18n.t(_apptActionBtnTxt));
      setStatusSecTxt(_statusSecTxtI18n && I18n.t(_statusSecTxtI18n) || '');
      setConfirmedTime(_confirmedTime);
      setAPPTStatus(status || APPT_STATUS.NEW);
    }
  }, [reservation]);

  const showAppt = () => {
    if (APPTStatus !== APPT_STATUS.NEW) {
      reservation.id && dispatch(getAPPT(reservation.id));
    }
    exam.id && dispatch(getOrgInfo(exam.id));
    exam.id && dispatch(getScope(exam.id));
    exam.id && dispatch(switchShowAPPT(true, exam.id, 'home'));
  };

  const formatGender = (val: GENDER): string => {
    switch (val) {
      case GENDER.OTHER:
        return I18n.t('userInfo-det-sel-gender-o');
      case GENDER.MALE:
        return I18n.t('userInfo-det-sel-gender-m');
      case GENDER.FEMALE:
        return I18n.t('userInfo-det-sel-gender-f');
      default:
        return '';
    }
  };

  const renderItem = ({ item }: { item: { txt: string, showLine: boolean } }) => {
    return <View style={Styles.rowCon}>
      <Icon name='ic_brightness_1_24px' size={8} color='rgba(145, 158, 171, 1)' style={Styles.circle} />
      {item.showLine && <View style={Styles.line} /> || <></>}
      <Text style={Styles.cellTxt}>{item.txt}</Text>
    </View>
  };

  return <>
    <ScrollView
      style={Styles.con}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false} >
      <View style={ShellStyles.stickyShdow} />
      <View style={ShellStyles.stickyShdowMark} />
      <View style={Styles.mainCon}>
        <View style={Styles.headerCon}>
          <Text style={Styles.headerTitle}>{I18n.t('home-header-title')}</Text>
          <TouchableOpacity style={Styles.navToListBtn} onPress={() => hasRpt && navigation.navigate('RecordList', { token: keepToken || '' })}>
            <Icon name='ic_format_list_bulle' size={24} color={hasRpt && 'rgba(99, 115, 126, 1)' || 'rgba(0, 0, 0, 0.26)'} />
            <Text style={[Styles.navToListBtnTxt, {
              color: hasRpt && 'rgba(99, 115, 126, 1)' || 'rgba(0, 0, 0, 0.26)'
            }]}>{I18n.t('home-btn-all-reports')}</Text>
          </TouchableOpacity>
        </View>
        <View style={[Styles.cardCon, { minHeight: 280 }]}>
          <View style={Styles.baseInfoCon}>
            <Image source={require("../assets/images/def_user.png")} style={Styles.headerIMG} />
            <View style={{ width: 'calc(100% - 82px)' }}>
              <Text style={Styles.userName}>{name}</Text>
              <View style={Styles.basicInfoMainCon}>
                {birthday && <Text style={Styles.tagCon}>{birthday}</Text> || <></>}
                {gender && <Text style={Styles.tagCon}>{formatGender(gender)}</Text> || <></>}
              </View>
            </View>
            <TouchableOpacity style={Styles.editUserInfoBtn} onPress={() => navigation.navigate('HealthRecord', { token: keepToken || '', mode: HEALTH_REC_VIEW_MDOE.READONLY, from: 'Home/Main' })}>
              <Icon name='ic_mode_edit_24px' size={18} color='rgba(255, 255, 255, 0.7)' />
            </TouchableOpacity>
          </View>
          <View style={Styles.lastRptHeader}>
            {hasRpt && <>
              <Text style={Styles.lastRptHeaderTitle}>{I18n.t('home-last-rpt-title')}</Text>
              <Text style={Styles.lastRptHeaderDate}>{exam.examTime}</Text>
            </> || <></>}
          </View>
          {hasRpt && <>
            <FlatList
              style={Styles.disAnalysisList}
              data={diseaseArr}
              renderItem={renderItem}
            />
            <View style={Styles.footerRow}>
              <View style={Styles.Appointment}>
                <View style={Styles.state}>
                  <Icon name='ic_brightness_1_24px' size={8} color={APPTStatus === APPT_STATUS.NEW && 'rgba(255, 152, 0, 1)' || 'rgba(35, 178, 190, 1)'} style={Styles.stateTxtIcon} />
                  <Text style={Styles.stateTxt}>{statusTxt}</Text>
                  <Text style={Styles.stateSecTxt}> {statusSecTxt}{confirmedTime}</Text>
                </View>
                <TouchableOpacity style={Styles.stateActionBtn} onPress={showAppt}>
                  <Text style={[Styles.stateActionBtnTxt, {
                    color: (APPTStatus === APPT_STATUS.NEW || APPTStatus === APPT_STATUS.EXPIRED) && 'rgba(35, 178, 190, 1)' || 'rgba(0, 0, 0, .54)',
                  }]}>{apptActionBtnTxt}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={Styles.recordDetailBtn} onPress={() => exam.id && navigation.navigate('Report', { token: keepToken || '', id: exam.id, from: 'Home' })}>
                <Text style={Styles.recordBtnTxt}>{I18n.t('home-last-rpt-btn-det')}</Text>
              </TouchableOpacity>
            </View>
          </> || <View style={Styles.noRptCon}>
              <Icon name='pending_actions-24px' size={48} color='rgba(0, 0, 0, 0.16)' style={Styles.noRptIcon} />
              <View>
                <Text style={Styles.NoRptTitle}>{I18n.t('home-no-last-exam')}</Text>
                <Text style={Styles.NoRptTxt} > {I18n.t('home-no-last-exam-txt')}</Text>
              </View>
            </View>}
        </View>
      </View>
    </ScrollView>
    <MessageToast refreshFn={() => dispatch(fetchLastReprt(pid))} />
  </>
};

export default MainScreen;
