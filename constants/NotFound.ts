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


  mainCon: {
    minHeight: screen.height - 68,
  },

  cardCon: {
    marginTop: 10,
    width: 'calc(100% - 16px)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    margin: 'auto',
    paddingTop: 32,
    paddingBottom: 86,
    borderRadius: 4,
    boxShadow: '0 8px 10px 1px rgba(0, 0, 0, 0.1), 0 3px 14px 3px rgba(0, 0, 0, 0.09), 0 4px 5px 0 rgba(0, 0, 0, 0.16)',
  },

  QrCode: {
    width: 167,
    height: 167,
    margin: "auto",
    marginBottom: 0
  },

  des1: {
    height: 24,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 14,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(35, 178, 190, 1)',
    margin: "auto",
    marginBottom: 0
  },

  des2: {
    marginTop: 8,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.26)',
    margin: "auto",
    marginBottom: 0
  },

});