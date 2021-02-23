import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, ScrollView, ImageBackground, Image, Text, TouchableOpacity, View } from 'react-native';

import ShellStyles from '../constants/Shell';
import Styles from '../constants/NotFound';
import I18n from '../i18n/i18n';

import { RootStackParamList } from '../types';

export default function NotFound({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
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
        <Image style={Styles.voxelcloudLogo} source={require("../assets/images/logo.svg")} />
        <Text style={Styles.title}>{I18n.t('login-title')}</Text>
        <Text style={Styles.desc}>{I18n.t('login-desc')}</Text>
      </View>
      <View style={Styles.cardCon}>
        <Image style={Styles.QrCode} source={require("../assets/images/wechat.png")} />
        <Text style={Styles.des1}>{I18n.t('notfound-qr-desc')}</Text>
        <Text style={Styles.des2}>{I18n.t('notfount-slogan')}</Text>
      </View>
    </View>
  </ScrollView>);
}


