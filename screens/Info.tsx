import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, ScrollView, ImageBackground, Image, Text, TouchableOpacity, View } from 'react-native';

import ShellStyles from '../constants/Shell';
import Styles from '../constants/Info';
import I18n from '../i18n/i18n';

import { RootStackParamList } from '../types';
import { useSelector } from 'react-redux';
import { ROOT_STATE } from '../store/interface';

export default function Info({
  navigation,
}: StackScreenProps<RootStackParamList, 'Info'>) {

  const { mobile, keepToken} = useSelector((state: ROOT_STATE) => state.system);
  return (<ScrollView
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
        <Text style={Styles.msgTitle}>{I18n.t('login-title-has-logged-in-title')}</Text>
        <Text style={Styles.msgDesc}>{I18n.t('login-title-has-logged-in-desc').replace('${mobile}', mobile && mobile.slice(7) || '')}</Text>
      </View>
      <TouchableOpacity style={Styles.goOnBtn} onPress={() => navigation.navigate('Home', { token: keepToken || '' })}>
        <Text style={Styles.goBtnTxt}>{I18n.t('login-btn-goon')}</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>);
}


