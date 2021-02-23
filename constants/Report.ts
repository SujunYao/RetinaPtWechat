import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  stickyShadowMask: {
    backgroundColor: 'rgb(221, 235, 240)',
  },
  header: {
    position: 'relative',
    padding: 16,
    height: 176,
    backgroundColor: 'rgb(221, 235, 240)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 32,
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: 8,
  },
  headerTime: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  headerRight: {
    width: 136,
  },

  content: {
    backgroundColor: 'rgb(255, 255, 255)',
    paddingTop: 16,
    paddingRight: 8,
    paddingBottom: 16,
    paddingLeft: 16,
  },
  contentSection: {
    flexDirection: 'row',
    paddingBottom: 32,
    marginTop: 8,
  },
  contentSectionLeft: {
    width: 40,
    marginRight: 8,
    alignItems: 'center',
  },
  contentSLIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: 'rgb(221, 234, 240)',
  },
  contentSLLine: {
    width: 4,
    borderRadius: 2,
    backgroundColor: 'rgb(244, 246, 248)',
    height: 'calc(100% - 16px)',
  },
  contentSectionRight: {
    flex: 1,
  },
  contentCardTitle: {
    alignSelf: 'flex-start',
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: 'rgb(99, 115, 129)',
    minWidth: 192,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 8,
  },
  contentCardTitleText: {
    fontSize: 12,
    lineHeight: 24,
    color: 'rgb(255, 255, 255)',
  },
  contentCardDetail: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    marginBottom: 8,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
  },
  contentCDRow: {
    flexDirection: 'row',
  },
  contentCDRowFollowing: {
    marginTop: 24
  },
  contentCDField: {
    flex: 1,
  },
  contentCDFLabel: {
    marginBottom: 4,
    fontSize: 12,
    lineHeight: 16,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  contentCDFValue: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(0, 0, 0, 0.87)',
  },
  contentCDFNoData: {
    color: 'rgba(0, 0, 0, 0.26)',
  },
  contentCDPhoto: {
    marginTop: 8,
    marginRight: -8,
    marginLeft: -8,
    borderRadius: 8,
    paddingTop: '78%',
    overflow: 'hidden',
  },
  contentCDPhotoLabel: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    paddingLeft: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.26)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    lineHeight: 24,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },

  footer: {
    borderTopColor: 'rgb(35, 178, 190)',
    borderTopWidth: 8,
    backgroundColor: 'rgb(69, 79, 91)',
  },
  footerHospitalInfo: {
    borderBottomColor: 'rgba(255, 255, 255, 0.16)',
    borderBottomWidth: 2,
  },
  footerHISection: {
    flexDirection: 'row',
    paddingTop: 24,
  },
  footerHISIcon: {
    paddingLeft: 34,
    paddingRight: 22,
  },
  footerHISDetail: {
    flex: 1,
    paddingBottom: 24,
  },
  footerHISDetailBordered: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.16)',
  },
  footerHISLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  footerHISLabelMargined: {
    marginTop: 20,
  },
  footerHISDesc: {
    marginTop: 4,
    fontSize: 16,
    color: 'rgb(255, 255, 255)',
  },
  footerHISDescSub: {
    marginTop: 4,
    fontSize: 12,
    color: 'rgb(255, 255, 255)',
  },

  footerVCInfo: {
    flexDirection: 'row',
    minHeight: 168,
    paddingTop: 24,
    paddingLeft: 16,
    paddingRight: 16,
  },
  footerVCILeft: {
    flex: 1,
    paddingTop: 16,
  },
  footerVCICompany: {
    flexDirection: 'row',
  },
  footerVCILogo: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  footerVCICompanyName: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
  },
  footerVCIDesc: {
    marginTop: 4,
    color: 'rgba(255, 255, 255, 0.54)',
    fontSize: 12,
  },
  footerVCIQRCode: {
    width: 72,
    height: 72,
  },

  reservationStatus: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    height: 40,
    lineHeight: 40,
    paddingLeft: 28,
    paddingRight: 28,
    backgroundColor: 'rgb(35, 178, 190)',
    textAlign: 'center',
    borderRadius: 20,
    boxShadow: '0 24px 38px 3px rgba(0, 0, 0, 0.1), 0 9px 46px 8px rgba(0, 0, 0, 0.08), 0 11px 15px 0 rgba(0, 0, 0, 0.16)',
  },
  reservationStatusText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 14,
    lineHeight: 40,
  },

  photoPreviewContainer: {
    position: 'absolute',
    top: 20,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 999,
    backgroundColor: '#000',
  },
  photoPreview: {
    flex: 1,
  },
  photoPreviewHeaderIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    paddingTop: 8,
  },
  photoPreviewHeaderIndicatorText: {
    paddingRight: 32,
    paddingLeft: 32,
    fontSize: 12,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.7)',
    borderColor: 'rgba(255, 255, 255, 0.16)',
    borderWidth: 1,
    borderRadius: 50,
  },
  photoPreviewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    backgroundColor: 'rgb(69, 79, 91)',
    paddingRight: 32,
    paddingLeft: 32,
  },
  photoPreviewTotalIndicator: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    paddingLeft: 32,
  },
  photoPreviewClose: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    lineHeight: 32,
    paddingRight: 8,
    paddingLeft: 8,
  },

  disclaimer: {
    width: '100%',
    marginTop: 8
  },

  disclaimerTxt: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, .26)',
    lineHeight: 18,
  },

  disclaimerMark: {
    color: 'rgba(35, 178, 190, 1)',
    marginRight: 2,
  },
});
