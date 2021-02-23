import { StyleSheet, Dimensions } from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
  popoverCon: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 20,
    elevation: 10,
    // position: 'fixed',
    // marginBottom: -88
  },

  bgCon:{
    height: '100%',
    width: '100%',
    zIndex: 18,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  mainCon: {
    left: 0,
    right: 0,
    minHeight: 400,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    zIndex: 21,
  },

  headerCon: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    borderBottomWidth: 1,
    backgroundColor: 'rgba(244, 246, 248, 1)',
  },

  headerLeftArea: {
    width: 'calc(100% - 40px)',
  },

  headerTitle: {
    fontSize: 18,
    height: 26,
    lineHeight: 26,
    width: '100%',
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.87)',
  },

  headerHopticalName: {
    width: '100%',
    fontSize: 12,
    lineHeight: 18,
    height: 18,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.87)',
  },

  headerDesc: {
    width: '100%',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, .54)'
  },

  mainContentCon: {
    width: '100%',
  },

  mainSelectionTagsCon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 16,
    backgroundColor: 'rgba(244, 246, 248, 1)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },

  tagCon: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 16,
    marginRight: 8,
    textAlign: 'center',
  },

  tagDate: {
    fontSize: 12,
  },

  datePickerListCon: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },

  nextBtn: {
    width: 'calc(100% - 32px)',
    margin: 'auto',
    marginTop: 16,
    height: 36,
    lineHeight: 36,
    textAlign: 'center',
    borderRadius: 4,
    marginBottom: 0,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 4px 5px 0 rgba(0, 0, 0, 0.08), 0 1px 10px 0 rgba(0, 0, 0, 0.16)'
  },

  mask: {
    position: "absolute",
    top: 0,
    zIndex: 21,
    width: '100%',
    height: '100%',
    borderBottomColor: 'rgba(0, 0, 0, .08)',
    borderBottomWidth: 1,
  },

  nextBtnTxt: {
    // color: 'rgba(255, 255, 255, 1)'
    fontSize: 12,
    lineHeight: 36,
    height: 36
  },

  detailCon: {
    padding: 8,
  },

  patientInfoCard: {
    backgroundColor: 'rgba(99, 115, 129, 1)',
    borderRadius: 4,
    boxShadow: '0 0 0.125rem 0 rgba(0, 0, 0, 0.1), 0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.09), 0 0.0625rem 0.1875rem 0 rgba(0, 0, 0, 0.16)',
  },

  cardRow: {
    height: 88,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 16
  },

  headerIMG: {
    marginRight: 16,
    marginTop: 16,
    width: 56,
    height: 56
  },

  rightArea: {
    width: 'calc(100% - 72px)',
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16
  },

  userName: {
    fontSize: 18,
    lineHeight: 27,
    color: 'rgba(255, 255, 255, 1)'
  },

  tag: {
    height: 24,
    lineHeight: 24,
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, .16)',
    color: 'rgba(255, 255, 255, 1)',
    borderRadius: 16,
    paddingLeft: 12,
    paddingRight: 12,
    marginTopp: 5
  },

  phoneCallIcon: {
    width: 56,
    height: 56,
    textAlign: 'center',
    lineHeight: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 28,
    marginRight: 8,
    marginTop: 16
  },

  contactFieldCon: {
    width: 'calc(100% - 64px)',
    marginTop: 14
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    paddingTop: 8,
  },

  cancelBtn: {

  },

  cancelBtnTxt: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, .7)',
    marginRight: 32
  },

  addBtn: {},

  addBtnTxt: {
    color: 'rgba(24, 255, 255, 1)',
    fontSize: 16
  },

  editBtn: {
    position: 'absolute',
    top: -50,
    right: 16,
  },
  editBtnTxt: {},

  addContactMobileBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 16
  },

  addContactMobileBtnIcon: {
    marginTop: 9,
    marginRight: 8
  },

  addContactMobileBtnTxt: {
    color: 'rgba(24, 255, 255,1)',
    fontSize: 14,
    lineHeight: 42,
    height: 42
  },

  baseInfoCon: {
    marginTop: 24,
    padding: 8
  },

  baseInfoTitle: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, .87)',
    paddingLeft: 8
  },

  baseInfoCard: {
    width: '100%',
    borderRadius: 4,
    boxShadow: '0 0 0.125rem 0 rgba(0, 0, 0, 0.1), 0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.09), 0 0.0625rem 0.1875rem 0 rgba(0, 0, 0, 0.16)',
    marginTop: 8,
    paddingTop: 16,
    paddingBottom: 16
  },

  orgCon: {
    paddingBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomColor: 'rgba(0, 0, 0, .12)',
    borderBottomWidth: 1,
  },

  OrgName: {
    fontSize: 16,
    height: 24,
    lineHeight: 24,
    color: 'rgba(0, 0, 0, .87)'
  },

  OrgAddress: {
    fontSize: 12,
    height: 18,
    lineHeight: 18,
    color: 'rgba(0, 0, 0, .54)',
  },

  selectorTimeCon: {
    width: '100%',
    padding: 16,
  },

  timeGroup: {
    width: '100%'
  },

  timeGroupHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: 18,
  },

  year: {
    color: 'rgba(35, 178, 190,1)',
    fontSize: 12,
    lineHeight: 18,
    marginRight: 8,
  },

  desc: {
    fontSize: 12,
    color: 'rgba(0,0,0, .54)',
    lineHeight: 18,
    marginRight: 6
  },

  statusTxt: {
    fontSize: 12,
    color: 'rgba(0,0,0, .54)',
    lineHeight: 18,
  },

  tagValCon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 8,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },

  changeTimeBtn: {

  },

  changeTimeBtnTxt: {
    color: 'rgba(35, 178, 190, 1)',
    fontSize: 14,
    lineHeight: 20,
  },

  finalActionBtn: {
    width: 'calc(100% - 32px)',
    margin: 'auto',
    marginTop: 32,
    marginBottom: 56,
    backgroundColor: 'rgba(35, 178, 190, 1)',
    borderRadius: 4,
    textAlign: 'center',
    height: 36,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 4px 5px 0 rgba(0, 0, 0, 0.08), 0 1px 10px 0 rgba(0, 0, 0, 0.16)'
  },

  finalActionBtnTxt: {
    fontSize: 14,
    height: 36,
    lineHeight: 36,
    color: 'rgba(255, 255, 255, 1)'
  },

  dateTagCon: {
    height: 32,
    borderRadius: 16,
    paddingLeft: 12,
    paddingRight: 12,
    color: 'rgba(0, 0, 0, .54)',
    fontSize: 14,
    lineHeight: 32,
    backgroundColor: 'rgba(0, 0, 0, .12)',
    marginRight: 8,
    marginTop: 8,
    minWidth: 84,
  },

  optionItem: {
    height: 50,
    lineHeight: 50,
    fontSize: 14,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 1)'
  },

  optionList: {
    width: '25%',
    zIndex: 16,
    borderRightColor: 'rgba(0, 0, 0, .08)',
    borderRightWidth: 1,
  },

  emptyMessageStyle: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.26)',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    top: 50,
    lineHeight: 50,
    height: 50,
  },

  noAvailableToSel: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 12,
    color: 'rgba(255, 152, 0, 1)',
    height: 15,
    lineHeight: 15,
    top: 32
  },

  titleCon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  titleConIcon:{
    marginRight: 8,
    marginTop: 2,
  },

  titleConTxt: {
    lineHeight: 26,
    fontSize: 20,
  },
});