import { StyleSheet, Dimensions } from 'react-native';
import Colors from './Colors';
const screen = Dimensions.get("screen");

export default StyleSheet.create({
  footerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 88,
    backgroundColor: 'rgba(99, 115, 129, 1)',
    boxShadow: '0 -0.1875rem 0.375rem 0 rgba(0, 0, 0, 0.06), 0 -0.1875rem 0.5rem 0 rgba(0, 0, 0, 0.04), 0 -0.0625rem 0.75rem 0 rgba(0, 0, 0, 0.08)',
  },

  activeMask: {
    position: 'absolute',
    top: 0,
    width: '50%',
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 1,
  },

  tab: {
    fontSize: 12,
  },

  footerBarMainContent:{
    margin: 'auto',
    width: '100%',
    textAlign: 'center',
  },

  icon: {

  },

  label: {
    fontSize: 12,
  },

  footerBtn: {
    flex: 1,
    justifyContent: 'center',
  },

  con: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    bottom: 0,
  },

  mainCon: {
    minHeight: screen.height - 136,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },

  headerCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'calc(100% - 32px)',
    margin: 'auto',
    marginTop: 22,
    marginBottom: 0,
  },

  headerTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(0, 0, 0, 0.87)',
  },

  navToListBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 24,
  },

  navToListBtnTxt: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 8,
  },

  cardCon: {
    width: 'calc(100% - 16px)',
    margin: 'auto',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 4,
    boxShadow: '0 0 0.125rem 0 rgba(0, 0, 0, 0.1), 0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.09), 0 0.0625rem 0.1875rem 0 rgba(0, 0, 0, 0.16)',
  },

  baseInfoCon: {
    backgroundColor: 'rgba(99, 115, 129, 1)',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 20,
    lineHeight: 50,
  },

  userName: {
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

  basicInfoMainCon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 4,
  },

  headerIMG: {
    width: 50,
    height: 50,
    marginRight: 12,
  },

  editUserInfoBtn: {
    width: 18,
    height: 18,
    marginLeft: 4
  },

  lastRptHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'rgba(244, 246, 248, 1)',
    height: 24,
    paddingLeft: 16,
    paddingRight: 16,
  },

  lastRptHeaderTitle: {
    lineHeight: 24,
    fontSize: 12,
    color: 'rgba(145, 158, 171, 1)',
  },

  lastRptHeaderDate: {
    lineHeight: 24,
    fontSize: 12,
    color: 'rgba(145, 158, 171, 1)',
  },

  circle: {
    marginRight: 8,
    paddingTop: 14,
  },

  line: {
    position: 'absolute',
    left: 5,
    top: 34,
    width: 2,
    height: 'calc(100% - 26px)',
    borderRadius: 1,
    backgroundColor: 'rgba(244, 246, 248, 1)'
  },

  cellTxt: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 40,
  },

  rowCon: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },

  disAnalysisList: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 8,
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    with: '100%',
    paddingRight: 16,
    marginBottom: 16,
  },

  Appointment: {
    width: '80%',
    height: 48,
    backgroundColor: 'rgba(244, 246, 248, 1)',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 24,
  },

  state: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },

  stateTxtIcon: {
    width: 12,
    marginTop: 18,
    marginRight: 8
  },

  stateTxt: {
    fontSize: 16,
    height: 48,
    lineHeight: 48,
    color: 'rgba(0, 0, 0, .54)',
  },

  stateSecTxt: {
    fontSize: 16,
    height: 48,
    lineHeight: 48,
    color: 'rgba(0, 0, 0, .26)',
  },

  stateActionBtn: {
    fontSize: 16,
    height: 48,
    lineHeight: 48,
    marginLeft: 5,
  },

  stateActionBtnTxt: {
    lineHeight: 48,
    height: 48,
    fontSize: 16
  },

  recordDetailBtn: {
    lineHeight: 48,
    height: 48,
    fontSize: 16
  },

  recordBtnTxt: {
    lineHeight: 48,
    height: 48,
    fontSize: 16,
    color: 'rgba(35, 178, 190, 1)'
  },

  noRptCon: {
    width: '100%',
    height: 48,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 24
  },

  noRptIcon: {
    marginRight: 6,
  },

  NoRptTitle: {
    fontSize: 18,
    lineHeight: 28,
    height: 28,
    color: 'rgba(0, 0, 0, 0.26)',
  },

  NoRptTxt: {
    fontSize: 12,
    height: 20,
    lineHeight: 20,
    color: 'rgba(0, 0, 0, 0.26)',
  },

  cardRow: {
    height: 44,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  cardRowTxt: {
    width: 'calc(100% - 52px)',
    height: 44,
    lineHeight: 44,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  cardRowIcon: {
    marginRight: 28,
    marginTop: 10
  },

  logoutBtn: {
    width: 'calc(100% - 32px)',
    margin: 'auto',
    marginTop: 24,
    marginBottom: 0,
    backgroundColor: 'rgba(35, 178, 190, 1)',
    borderRadius: 4,
    height: 36,
    lineHeight: 36,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.10), 0 2px 2px 0 rgba(0, 0, 0, 0.09), 0 1px 3px 0 rgba(0, 0, 0, 0.16)',
  },

  logoutBtnTxt: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
    height: 36,
    lineHeight: 36,
    textAlign: 'center',
  }
});