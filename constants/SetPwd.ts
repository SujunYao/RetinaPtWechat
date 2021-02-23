import { StyleSheet, Dimensions } from 'react-native';
import Colors from './Colors';

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

  mainCon: {
    minHeight: screen.height - 68,
  },

  msgTitle: {
    color: Colors.light.primaryColor,
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

  mobile: {
    color: Colors.light.primaryColor,
  },

  InpConBox: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 4,
    width: 'calc(100% - 16px)',
    margin: 'auto',
    marginTop: 40,
    marginBottom: 0,
    paddingBottom: 0,
    height: 80,
    position: 'relative',
    boxShadow: '0 1.33rem 2.11rem 0.16rem rgba(0, 0, 0, 0.1), 0 0.5rem 2.55rem 0.44rem rgba(0, 0, 0, 0.09), 0 0.61rem 0.83rem 0 rgba(0, 0, 0, 0.16)'
  },

  skipBtn: {
    fontSize: 14,
    color: 'rgba(35, 178, 190, 1)',
    marginRight: 24,
  },

  nextStepBtn:{
    width: 'calc(100% - 32px)',
    height: 36, 
    borderRadius: 4,
    fontSize: 16,
    lineHeight: 36,
    textAlign: 'center',
    margin: 'auto',
    marginTop: 24,
    color: 'rgba(0, 0, 0, 0.26)',
    zIndex: 5,
    boxShadow: ' 0 2px 4px 0 rgba(0, 0, 0, 0.10), 0 4px 5px 0 rgba(0, 0, 0, 0.08), 0 1px 10px 0 rgba(0, 0, 0, 0.16)'
  }
});