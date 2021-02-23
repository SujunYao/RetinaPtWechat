import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, ScrollView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ShellStyles from '../constants/Shell';
import Icon from '../components/Icons';
import I18n from '../i18n/i18n';
import Styles from '../constants/Home';
import { REQ_STATUS, HEALTH_REC_VIEW_MDOE } from '../store/enum';
import { ROOT_STATE } from '../store/interface';
import { fetchUnbindMobile, clearReqStatus, logout } from '../store/system/actions';
import { useRoute, useNavigation } from '@react-navigation/native';

const SettingScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { keepToken, openID, lastReqUnbindMobileState } = useSelector((state: ROOT_STATE) => state.system);
  const [listenUnBindReq, setListenUnBindReq] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (lastReqUnbindMobileState === REQ_STATUS.SUCCESSED && route.name === 'SettingScreen' && listenUnBindReq) {
      dispatch(clearReqStatus());
      setListenUnBindReq(false);
      dispatch(logout());
      navigation.navigate('Main', { token: keepToken || '' });
      navigation.navigate('Login', { token: keepToken || '' });
    }
  }, [lastReqUnbindMobileState, listenUnBindReq]);


  return <ScrollView
    style={Styles.con}
    stickyHeaderIndices={[0]}
    showsVerticalScrollIndicator={false} >
    <View style={ShellStyles.stickyShdow} />
    <View style={ShellStyles.stickyShdowMark} />
    <View style={Styles.mainCon}>
      <View style={Styles.headerCon}>
        <Text style={Styles.headerTitle}>{I18n.t('set-my-account-title')}</Text>
      </View>
      <View style={[Styles.cardCon, { paddingTop: 16, paddingLeft: 16, paddingBottom: 16 }]}>
        <TouchableOpacity style={Styles.cardRow} onPress={() => navigation.navigate('ReSetPwd', { token: keepToken || '' })}>
          <Icon name='ic_lock_24px' size={24} color="rgba(0, 0, 0, .26)" style={Styles.cardRowIcon} />
          <Text style={[Styles.cardRowTxt, { borderBottomColor: 'rgba(0, 0, 0, .12)', borderBottomWidth: 1 }]}>{I18n.t('set-btn-change-pwd')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.cardRow} onPress={() => navigation.navigate('HealthRecord', { token: keepToken || '', mode: HEALTH_REC_VIEW_MDOE.READONLY, from: 'Home/Setting' })}>
          <Icon name='ic_assignment_24px' size={24} color="rgba(0, 0, 0, .26)" style={Styles.cardRowIcon} />
          <Text style={Styles.cardRowTxt}>{I18n.t('set-btn-change-health-record')}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={Styles.logoutBtn} onPress={() => {
        setListenUnBindReq(true);
        dispatch(fetchUnbindMobile(openID));
      }}>
        <Text style={Styles.logoutBtnTxt}>{I18n.t('set-btn-logout')}</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
};

export default SettingScreen;