import { StyleSheet, Dimensions } from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
  fieldCon: {
    height: 68,
    margin: 'auto',
    position: 'relative',
  },
  label: {
    // position: 'absolute',
    // justifyContent:'flex-start',
    // flexDirection: 'row',
  },

  mainInp: {
    focus: {
      outlineWidth: 0,
      borderWidth: 0,
    },
    active: {
      outlineWidth: 0,
      borderWidth: 0,
    },
    outlineWidth:  0,
    borderWidth: 0,
    height: 30,
    marginTop: 18,
    fontSize: 16,
    paddingTop: 2,
    borderBottomWidth: 1,
  },

  helpTxtCon: {
    fontSize: 12,
    height: 18,
    lineHeight: 18,
  },

  borderBottom: {
    borderBottomWidth: 2,
    left: 0,
    right: 0,
    bottom: 19,
    position: 'absolute',
  },

  rightAction: {
    position: 'absolute',
    right: 0,
    top: 24,
  },

  required: {
    fontSize: 12,
    marginLeft: 3,
  }
});