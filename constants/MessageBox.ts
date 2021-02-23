import { StyleSheet, Dimensions } from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
  curtain: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 40,
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },

  cardCon: {
    width: '100%',
    borderRadius: 4,
    boxShadow: '0 24px 38px 3px rgba(0, 0, 0, 0.10), 0 9px 46px 8px rgba(0, 0, 0, 0.08), 0 11px 15px 0 rgba(0, 0, 0, 0.16)',
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 40,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    top: '50%',
    marginTop: -112,
    height: 224,
  },

  title: {
    fontSize: 18,
    lineHeight: 32,
    color: 'rgba(0, 0, 0, .87)',
  },

  desc: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 16,
  },

  actionBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 24,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
  },

  footerBtn: {
    marginLeft: 44,
  },

  OKBtnTxt: {
    color: 'rgba(35, 178, 190, 1)',
    height: 24,
    lineHeight: 24,
    fontSize: 16
  },

  btnTxt: {
    height: 24,
    lineHeight: 24,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.54)',
  },
});