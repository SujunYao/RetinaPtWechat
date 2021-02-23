import { StyleSheet, Dimensions } from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
  popoverCon: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 20,
    elevation: 10,
  },

  mainCon: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 246,
    minHeight: 246,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    zIndex: 21,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 46,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(220, 220, 220, 1)'
  },

  cancelBtn: {
    fontSize: 14,
    color: 'rgba(102, 102, 102, 1)',
    lineHeight: 46,
    paddingLeft: 14,
    paddingRight: 14,
  },

  confirmBtn: {
    fontSize: 14,
    color: 'rgba(30, 131, 211, 1)',
    lineHeight: 46,
    paddingLeft: 14,
    paddingRight: 14,
  },

  title: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 1)',
    lineHeight: 46,
  },

  listCon: {
    width: 'calc(100% - 36px)',
    margin: 'auto',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 200,
    zIndex: 13,
    position: 'relative'
  },

  optionItem: {
    height: 40,
    lineHeight: 40,
    fontSize: 14,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 1)'
  },

  mask: {
    position: "absolute",
    top: 0,
    zIndex: 21,
    width: '100%',
    height: '100%',
  },

  lineCon: {
    height: 40,
    width: '100%',
    zIndex: 20,
    position: 'absolute',
    top: 80,
    borderTopColor: 'gainsboro',
    borderTopWidth: 1,
    borderBottomColor: 'gainsboro',
    borderBottomWidth: 1,
  }
});