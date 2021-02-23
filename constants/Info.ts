import { preventAutoHide } from 'expo-splash-screen';
import { StyleSheet, Dimensions } from 'react-native';
import Colors from './Colors';
const screen = Dimensions.get("screen");

export default StyleSheet.create({
  con: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    bottom: 0,
  },

  bgCon: {
    bottom: -30,
    flex: 1,
    height: '130%',
    left: 0,
    position: 'absolute',
    right: 0,
    width: '100%',
  },
  bg: {
    flex: 1,
  },

  headerCon: {
  },

  msgTitle: {
    color: 'rgba(35, 178, 190, 1)',
    fontSize: 34,
    marginTop: 33,
    fontFamily: 'Noto Sans CJK TC',
    margin: 'auto',
    textAlign: "center",
  },

  msgDesc: {
    width: 'calc(100% - 120px)',
    fontSize: 12,
    fontFamily: 'Noto Sans CJK TC',
    margin: 'auto',
    textAlign: 'center',
    marginTop: 3,
    lineHeight: 18,
    color: 'rgba(0, 0, 0, 0.54)',
  },

  mainCon: {
    minHeight: screen.height - 68,
  },

  goOnBtn:{
    height: 36,
    lineHeight: 36,
    width: 'calc(100% - 32px)',
    backgroundColor: 'rgba(35, 178, 190, 1)',
    borderRadius: 4,
    margin: 'auto',
    marginTop: 49,
    marginBottom: 0,
    textAlign: 'center',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.10), 0 4px 5px 0 rgba(0, 0, 0, 0.08), 0 1px 10px 0 rgba(0, 0, 0, 0.16)',
  },

  goBtnTxt:{
    color: 'rgba(255, 255, 255, 1)',
    lineHeight: 36,
  },

  backBtn:{
    margin: 'auto',
    marginTop: 26,
    marginBottom: 0,
  },

  backBtnTxt:{
    color: 'rgba(35, 178, 190, 1)',
  },

  cardCon: {
    marginTop: 10,
    width: 'calc(100% - 16px)',
    margin: 'auto',
    paddingTop: 32,
    paddingBottom: 86,
    borderRadius: 4,
    boxShadow: '0 8px 10px 1px rgba(0, 0, 0, 0.1), 0 3px 14px 3px rgba(0, 0, 0, 0.09), 0 4px 5px 0 rgba(0, 0, 0, 0.16)',
  },

});