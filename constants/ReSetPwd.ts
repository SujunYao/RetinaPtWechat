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

  mainCon: {
    minHeight: screen.height - 68,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: '100%',
    padding: 8
  },

  title:{
    fontSize: 16,
    marginTop: 22,
    lineHeight: 24,
    color: 'rgba(0, 0, 0, .87)',
    paddingLeft: 8,
  },

  cardCon:{
    marginTop: 10,
    padding: 16,
    paddingTop: 0,
    paddingBottom: 24,
    width: '100%',
    borderRadius: 4,
    boxShadow: '0 0 0.125rem 0 rgba(0, 0, 0, 0.1), 0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.09), 0 0.0625rem 0.1875rem 0 rgba(0, 0, 0, 0.16)',
  },

  saveBtn:{
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
  },
  saveBtnTxt:{
    lineHeight: 36
  },
});