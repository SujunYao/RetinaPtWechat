import { StyleSheet, Dimensions } from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
  con: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    left: 0,
    right: 0,
    height: 48,
    backgroundColor: 'rgba(69, 79, 91, .75)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
  },

  msg: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 14,
    lineHeight: 48,
  },


  actionCon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  undoIcon: {
    marginRight: 6,
    marginTop: 19,
  },
  
  undoTxt: {
    color: 'rgba(24, 255, 255, 1)',
    fontSize: 14,
    lineHeight: 48,
  },
});