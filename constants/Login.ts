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

  voxelcloudLogo: {
    margin: 'auto',
    marginTop: 15,
    width: 107,
    height: 18,
  },

  title: {
    fontSize: 34,
    fontFamily: 'Noto Sans CJK TC',
    margin: 'auto',
    marginTop: 7,
    textAlign: "center",
    color: Colors.light.primaryColor,
  },

  desc: {
    fontSize: 12,
    fontFamily: 'Noto Sans CJK TC',
    margin: 'auto',
    textAlign: 'center',
    marginTop: 3,
    lineHeight: 18,
    color: 'rgba(0, 0, 0, 0.54)'
  },

  msgTitle: {
    color: 'rgba(255, 152, 0, 1)',
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

  mobileInpCon: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    height: 48,
    zIndex: 10,
  },

  mobileInp:{
    outlineWidth: 0,
    paddingLeft: 16,
    paddingRight: 16,
    height: 48,
    lineHeight: 48,
    backgroundClip: 'padding-box',
    borderBottomColor: 'rgba(0, 0, 0, .12)',
    borderBottomWidth: 1,
    fontSize: 14,
    letterSpacing: 0,
    // zIndex: 10,
  },

  mobileInpFocus: {
    outlineWidth: 0,
    paddingLeft: 16,
    paddingRight: 16,
    height: 48,
    lineHeight: 48,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    backgroundClip: 'padding-box',
    borderBottomColor: 'rgba(0, 0, 0, .12)',
    borderBottomWidth: 1,
    fontSize: 14,
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.87)',
    zIndex: 10,
  },

  mobileInpNormal: {
    outlineWidth: 0,
    paddingLeft: 16,
    paddingRight: 16,
    height: 48,
    borderBottomColor: 'rgba(0, 0, 0, .12)',
    borderBottomWidth: 1,
    lineHeight: 48,
    backgroundColor: 'rgba(69, 79, 91, 1)',
    backgroundClip: 'padding-box',
    fontSize: 14,
    letterSpacing: 0,
    color: 'rgba(255, 255, 255, 0.3)',
    zIndex: 10,
  },

  actionCon: {
    marginTop: 30,
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  switchLoginModeBtn: {
    paddingLeft: 8,
    fontSize: 16,
    color: 'rgba(35, 178, 190, 1)',
    lineHeight: 36,
    letterSpacing: 0
  },

  btn: {
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

  clearValBtn: {
    position: 'absolute',
    width: 46,
    textAlign: "center",
    height: 48,
    lineHeight: 48,
    paddingTop: 17,
    top: 0,
    right: 0,
    textAlignVertical: 'center',
    zIndex: 15
  },

  hideValBtn: {
    position: 'absolute',
    width: 46,
    textAlign: "center",
    height: 48,
    lineHeight: 48,
    paddingTop: 17,
    top: 0,
    right: 0,
    opacity: 0,
    textAlignVertical: 'center',
    zIndex: 15
  },

  inpConFocus: {
    width: 'calc(100% - 16px)',
    position: 'relative',
    margin: 'auto',
    marginTop: 65,
    overflow: "hidden",
    borderRadius: 4,
    boxShadow: '0 1.33rem 2.11rem 0.16rem rgba(0, 0, 0, 0.1), 0 0.5rem 2.55rem 0.44rem rgba(0, 0, 0, 0.09), 0 0.61rem 0.83rem 0 rgba(0, 0, 0, 0.16)',
  },

  inpCon: {
    width: 'calc(100% - 16px)',
    position: 'relative',
    margin: 'auto',
    marginTop: 65,
    overflow: "hidden",
    borderRadius: 4,
    boxShadow: '0 0.44rem 0.55rem 0.055rem rgba(0, 0, 0, 0.1), 0 0.166rem 0.77rem 0.166rem rgba(0, 0, 0, 0.09), 0 0.22rem 0.27rem 0 rgba(0, 0, 0, 0.16)',
  },

  secondInpCon: {
    transform: [{ translateY: -48 }],
    width: '100%',
    paddingLeft: 8,
    paddingRight: 8,
    minHeight: 48,
    position: 'relative',
    zIndex: 5,
  },

  secondInpFocus: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
    outlineWidth: 0,
    paddingLeft: 16,
    paddingRight: 16,
    height: 48,
    lineHeight: 48,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    backgroundClip: 'padding-box',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    fontSize: 14,
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.87)',
    zIndex: 6,
  },

  secondInpNormal: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
    outlineWidth: 0,
    paddingLeft: 16,
    paddingRight: 16,
    height: 48,
    lineHeight: 48,
    backgroundColor: 'rgba(69, 79, 91, 1)',
    backgroundClip: 'padding-box',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    fontSize: 14,
    letterSpacing: 0,
    zIndex: 6,
    color: 'rgba(255, 255, 255, 0.3)',
  },

  inpVRCodeCon: {},

  inpRightAction: {
    position: 'absolute',
    width: 'auto',
    textAlign: "center",
    height: 48,
    lineHeight: 48,
    bottom: 0,
    right: 0,
    textAlignVertical: 'center',
    zIndex: 15
  },

  inpRightActionText:{
    lineHeight:48,
    paddingRight: 16,
  },

  inpRightActionIcon: {
    marginTop: 17,
    marginRight: 16,
  }
});