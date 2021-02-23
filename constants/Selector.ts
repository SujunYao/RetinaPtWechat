import { StyleSheet, Dimensions } from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
  selectorFieldCon: {
    height: 68,
    margin: 'auto',
    position: 'relative',
  },

  label: {},

  required: {
    fontSize: 12,
    marginLeft: 3,
  },

  mainInp: {
    height: 30,
    marginTop: 18,
    fontSize: 16,
    paddingTop: 2,
    borderBottomWidth: 1,
    paddingRight: 22,
  },

  helpTxtCon: {
    fontSize: 12,
    height: 18,
    lineHeight: 18,
  },

  rightAction: {
    position: 'absolute',
    right: 0,
    top: 24,
  },

  activeArea: {
    position: 'absolute',
    top: 18,
    left: 0,
    right: 0,
    height: 30,
    zIndex: 20,
  },

  selectionArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  popover: {
    // position: 'fixed'
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    borderWidth: 0,
    // elevation: 10,
    position: 'absolute',
    top: '-100%',
    bottom: '-100%',
    right: 0,
    left: 0

  },

  popoverContent: {
    flex: 1,
    height: 300,
    bottom: 0,
    position: 'absolute',
    left: 0,
    right: 0,
  }
});