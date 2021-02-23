import { StyleSheet, useWindowDimensions } from 'react-native';
import Colors from './Colors';
// const {height: screenHeight} = useWindowDimensions();

export default StyleSheet.create({
  shellCon: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    height: '100%',
    backgroundColor: Colors.light.background,
  },

  backCon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 48,
  },

  rigthCon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 16,
    height: 48,
  },

  headerBtnIcon: {
    marginRight: 8,
    marginTop: 12,
    marginLeft: 16,
  },

  headerBtnTxt: {
    fontSize: 14,
    lineHeight: 48,
    color: 'rgba(99, 125, 129, 1)'
  },

  headerCon: {
    flex: 0.3,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    backgroundColor: 'rgba(221, 235, 240, 1)',
    height: 48,
  },
  headerTitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  loadingCon: {
    display: 'none',
    bottom: 0,
    flex: 1,
    height: '100%',
    left: 0,
    top: 0,
    position: 'absolute',
    right: 0,
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, .6)',
  },
  loading: {
    width: 90,
    height: 90,
    opacity: .6,
    margin: 'auto',
    resizeMode: 'center',
    justifyContent: 'center',
  },

  transition: {

  },

  stickyShdow: {
    height: 20,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    shadowColor: 'rgba(0, 0, 0, .5)',
    zIndex: 2,
    // backgroundColor: 'rgba(221, 235, 240, 1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5
  },

  stickyShdowMark: {
    height: 30,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 13
  }
});