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
    paddingBottom: 48,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },

  headerCon: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 22,
    height: 24,
    lineHeight: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 16,
    width: 'auto',
    color: '',
  },

  rightBtn: {
    fontSize: 16,
    height: 24,
    lineHeight: 24,
    position: 'relative',
    paddingLeft: 34,
  },

  rightBtnIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
  },

  baseInfoCon: {
    width: 'calc(100% - 16px)',
    margin: 'auto',
    height: 'auto',
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: 'rgba(99, 115, 129, 1)',
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.09), 0 1px 3px 0 rgba(0, 0, 0, 0.16)',
    borderRadius: 4,
    padding: 16,
  },

  header: {
    width: 50,
    height: 50,
    marginRight: 8,
  },

  baseInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    lineHeight: 50,
  },


  basicInfoConR: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 4,
  },

  groupCon: {
    width: 'calc(100% - 16px)',
    margin: 'auto',
    height: 'auto',
    marginTop: 6,
    marginBottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.09), 0 1px 3px 0 rgba(0, 0, 0, 0.16)',
    borderRadius: 4,
  },

  groupHeader: {
    backgroundColor: 'rgba(244, 246, 248, 1)',
    flexDirection: 'row',
    width: '100%',
    height: 40,
    lineHeight: 40,
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16
  },

  groupIcon: {
    paddingTop: 8
  },

  groupMainCon: {
    width: '100%',
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },

  twoCellsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cellCon: {
    width: '50%'
  },

  headTitle: {
    fontSize: 12,
    color: 'rgba(99, 115, 129, 1)',
    lineHeight: 40,
  },

  basicInfoTitle: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 18,
    lineHeight: 50,
  },

  userInfo: {
    fontSize: 18,
    height: 22,
    display: 'flex',
    lineHeight: 22,
    paddingLeft: 8,
    color: 'rgba(255, 255, 255, 1)',
  },

  tagCon: {
    height: 24,
    lineHeight: 24,
    paddingLeft: 13,
    paddingRight: 13,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 12,
    marginRight: 8,
  },

  break: {
    height: 14,
    width: '100%',
  },

  btn: {
    width: 'calc(100% - 32px)',
    textAlign: 'center',
    margin: 'auto',
    marginBottom: 16,
    backgroundColor: 'rgba(35, 178, 190, 1)',
    height: 36,
    lineHeight: 36,
    borderRadius: 4,
    backgroundClip: 'padding-box',
    paddingLeft: 16,
    paddingRight: 16,
    color: 'rgba(255, 255, 255, 1)',
    letterSpacing: 0,
  },

  btnDisabled: {
    width: 'calc(100% - 32px)',
    textAlign: 'center',
    margin: 'auto',
    marginBottom: 16,
    backgroundColor: 'rgba(236, 239, 241, 1)',
    height: 36,
    lineHeight: 36,
    borderRadius: 4,
    backgroundClip: 'padding-box',
    paddingLeft: 16,
    paddingRight: 16,
    color: 'rgba(0, 0, 0, 0.26)',
    letterSpacing: 0,
  },
});