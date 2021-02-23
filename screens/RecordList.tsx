import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ShellStyles from '../constants/Shell';
import Icon from '../components/Icons';
import styles from '../constants/RecordList';
import { fetchRecordList } from '../store/report/actions';
import OptionList from '../components/OptionList';
import { UserState } from '../store/user/types';
import { ReportState } from '../store/report/types';
import I18n from '../i18n/i18n';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { ROOT_STATE } from '../store/interface';
import { getAPPT, getOrgInfo, getScope, switchShowAPPT } from '../store/appt/actions';
import { APPT_STATUS, REQ_STATUS, APPT_ACTION_BTNS, TIME, TIMEI18N } from '../store/enum';
import MessageToast from '../components/MessageToast';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RecordList'
>;
interface Props {
  navigation: ProfileScreenNavigationProp;
};

const RecordList: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { keepToken, pid, apptState: { goRefresh, from } } = useSelector((state: ROOT_STATE) => state.system);
  const { name } = useSelector(({ user }: { user: UserState }) => user);
  const records = useSelector(({ report }: { report: ReportState }) => report.list);
  const [userOptionsVisible, setUserOptionsVisible] = useState(false);

  useEffect(() => {
    if (goRefresh && from === 'rec-list') {
      dispatch(fetchRecordList(pid));
    }
  }, [goRefresh, from]);

  useEffect(() => {
    if (pid) {
      dispatch(fetchRecordList(pid));
    }
  }, [pid])

  const showAppt = (reservationID: number | "", examID: number, status: string) => {
    if (status) {
      reservationID && dispatch(getAPPT(reservationID));
    }
    examID && dispatch(getOrgInfo(examID));
    examID && dispatch(getScope(examID));
    examID && dispatch(switchShowAPPT(true, examID, 'rec-list'));
  };

  const formatterStatusTxt = (statusCode: string): string => {
    switch (statusCode) {
      case APPT_STATUS.CONFIRMING:
        return I18n.t('dating-state-confirming-title');
        break;
      case APPT_STATUS.CONFIRMED:
        return I18n.t('dating-state-cmplt-title');
        break;
      case APPT_STATUS.EXPIRED:
        return I18n.t('dating-state-expired-title');
        break;
      default:
        return I18n.t('dating-state-noDataing-title');
        break;
    }
  };

  const formatStatusSec = (statusCode: string): string => {
    return statusCode === APPT_STATUS.CONFIRMING && I18n.t('dating-state-confirming-des') || ''
  }

  const formatterAPPTActionBtnTxt = (statusCode: string): string => {
    switch (statusCode) {
      case APPT_STATUS.CONFIRMING:
        return I18n.t(APPT_ACTION_BTNS.CONFIRMING);
        break;
      case APPT_STATUS.CONFIRMED:
        return I18n.t(APPT_ACTION_BTNS.CONFIRMED);
        break;
      case APPT_STATUS.EXPIRED:
        return I18n.t(APPT_ACTION_BTNS.EXPIRED);
        break;
      default:
        return I18n.t(APPT_ACTION_BTNS.NEW);
        break;
    }
  }

  const formatterConfirmTime = (confirmTime: { year?: number, month?: number, day?: number, available?: string }) => {
    let res = '';
    const { month, day, available } = confirmTime || {};
    if (month && day && available) {
      let _available = ''
      switch (available) {
        case TIME.AM:
          _available = TIMEI18N.AM;
          break;
        case TIME.PM:
          _available = TIMEI18N.PM;
          break;
      }
      return `${month}/${day} ${_available && I18n.t(_available) || ''}`;
    }
    return res;
  };

  return (
    <>
      <ScrollView
        style={styles.con}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        <View style={ShellStyles.stickyShdow} />
        <View style={ShellStyles.stickyShdowMark} />
        <View style={styles.header}>
          <Text style={styles.headerTitle} onPress={() => { setUserOptionsVisible(true) }}>
            {name}<Icon style={styles.downIcon} name='ic_arrow_drop_down_2' />
          </Text>
        </View>
        <View style={styles.recordList}>
          {
            records?.map((record, index) => (
              <View key={record.id} style={styles.recordItem}>
                <View style={styles.recordLeft}>
                  <View style={styles.recordPoint} />
                  <View style={index !== records.length - 1 ? styles.recordLine : styles.lastRecord} />
                </View>
                <View style={styles.recordRight}>
                  <Text style={styles.recordTime}>{record.examTime}</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Report', { token: keepToken || '', id: record.id, from: 'RecordList' })}
                  >
                    <View style={styles.recordDetail}>
                      <Text style={styles.recordDisease}>{record.disease}</Text>
                      <Text style={styles.recordTransfer}>{record.transferReexam}</Text>
                      <View style={styles.footerRow}>
                        <View style={styles.Appointment}>
                          <View style={styles.state}>
                            <Icon name='ic_brightness_1_24px' size={8} color={!record.reservation.status && 'rgba(255, 152, 0, 1)' || 'rgba(35, 178, 190, 1)'} style={styles.stateTxtIcon} />
                            <Text style={styles.stateTxt}>{formatterStatusTxt(record.reservation.status)}</Text>
                            <Text style={styles.stateSecTxt}> {formatStatusSec(record.reservation.status)}{formatterConfirmTime(record.reservation.confirmTime)}</Text>
                          </View>
                          <TouchableOpacity style={styles.stateActionBtn} onPress={() => showAppt(record.reservation.id, record.id, record.reservation.status)}>
                            <Text style={[styles.stateActionBtnTxt, {
                              color: (!record.reservation.status || record.reservation.status === APPT_STATUS.EXPIRED) && 'rgba(35, 178, 190, 1)' || 'rgba(0, 0, 0, .54)',
                            }]}>{formatterAPPTActionBtnTxt(record.reservation.status)}</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          }
        </View>
      </ScrollView>
      <MessageToast refreshFn={() => dispatch(fetchRecordList(pid))} />
      <OptionList
        listData={[{ key: pid, text: name }]}
        finishSelector={() => setUserOptionsVisible(false)}
        closeFn={() => setUserOptionsVisible(false)}
        show={userOptionsVisible}
      />
    </>
  );
}

export default RecordList;
