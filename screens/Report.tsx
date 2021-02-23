import React, { useEffect, useState } from 'react';
import {
  View, ScrollView, TouchableWithoutFeedback,
  Image, Text, ImageBackground,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { SystemState } from '../store/system/types';
import { ReportState } from '../store/report/types';
import { fetchReportDetail } from '../store/report/actions';
import I18n from '../i18n/i18n';
import Icon from '../components/Icons';
import ShellStyles from '../constants/Shell';
import styles from '../constants/Report';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { getAPPT, getOrgInfo, getScope, switchShowAPPT } from '../store/appt/actions';
import ReportPhotoPreview from '../components/ReportPhotoPreview';
import MessageToast from '../components/MessageToast';
import { ROOT_STATE } from '../store/interface';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Report'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Report'>
interface Props {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};
// same as images/headericon.svg
const IconReport = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 136 139"
  >
    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <g fillRule="nonzero" transform="translate(-224 -128)">
        <g transform="translate(0 72)">
          <g transform="translate(224 56)">
            <path fill="#454F5B" d="M120.055453 139L136 92 95 92z"></path>
            <path fill="#C4CDD5" d="M30 22H113V130H30z"></path>
            <path fill="#FFF" d="M21 12H104V111H21z"></path>
            <path
              fill="#919EAB"
              d="M120 139L94.1178012 92 0 92 25.8824699 139z"
            ></path>
            <path
              fill="#919EAB"
              d="M40.25 28c-3.728 0-6.75-3.134-6.75-7v-2.333H38V21c0 1.288 1.008 2.333 2.25 2.333S42.5 22.288 42.5 21V9.333c0-2.578-2.014-4.666-4.5-4.666s-4.5 2.088-4.5 4.666V12H29V9.333C29 4.18 33.03 0 38 0s9 4.179 9 9.333V21c0 3.866-3.022 7-6.75 7z"
            ></path>
            <g fill="#C4CDD5" transform="translate(9 10)">
              <path d="M114.803 42.523h-4.685V9.6c0-2.599-2.097-4.704-4.685-4.704h-4.686V.193h4.686c5.175 0 9.37 4.212 9.37 9.407v32.923z"></path>
              <path d="M110.118 47.226H114.803V51.929H110.118z"></path>
              <path d="M0.014 37.819H4.699V70.742H0.014z"></path>
              <path d="M0.014 28.413H4.699V33.116H0.014z"></path>
            </g>
            <path
              fill="#23B2BE"
              d="M77 34.333423L67.6666667 34.333423 67.6666667 25 58.3333333 25 58.3333333 34.333423 49 34.333423 49 43.666577 58.3333333 43.666577 58.3333333 53 67.6666667 53 67.6666667 43.666577 77 43.666577z"
            ></path>
            <g fill="#23B2BE" transform="translate(31 23)">
              <path d="M4.664 37.504H9.288V42.189H4.664z"></path>
              <path d="M13.911 37.504H62.458V42.189H13.911z"></path>
              <path d="M0.041 46.873H62.458V51.558H0.041z"></path>
              <path d="M0.041 56.242H53.211V60.927H0.041z"></path>
              <path d="M59.753 0.028H64.508V4.712999999999999H59.753z"></path>
              <path d="M60.146 9.397H64.77V14.082H60.146z"></path>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

const Report: React.FC<Props> = ({ route, navigation }) => {
  const { id: paramRptID } = route.params;
  const dispatch = useDispatch();
  let refScrollView: ScrollView;
  const readonly = useSelector(({ system }: { system: SystemState }) => system.readonly);
  const reportId = useSelector(({ system }: { system: SystemState }) => system.routeParams.id);
  const { apptState: { goRefresh, from }, toast: { showToast } } = useSelector((state: ROOT_STATE) => state.system);
  const reportDetail = useSelector(({ report }: { report: ReportState }) => report.detail);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [photoPreview, setPhotoPreview] = useState<null | {
    photoList: Record<string, any>[],
    selectedPhoto: Record<string, string>,
  }>(null);
  const [btnBottom, setBtnBottom] = useState(16);

  useEffect(() => setBtnBottom(showToast && 64 || 16), [showToast]);

  useEffect(() => {
    dispatch(fetchReportDetail(reportId || paramRptID));
  }, [reportId, dispatch, paramRptID]);

  useEffect(() => {
    if (goRefresh && from === 'rpt') {
      dispatch(fetchReportDetail(reportId || paramRptID));
    }
  }, [goRefresh, from]);

  const handlePressReserve = (reservationID: number | "", examID: number, status: string) => {
    if (!status) {
      reservationID && dispatch(getAPPT(reservationID));
    }
    examID && dispatch(getOrgInfo(examID));
    examID && dispatch(getScope(examID));
    examID && dispatch(switchShowAPPT(true, examID, 'rpt'));
  };

  const handleClickPhoto = (photo: any) => {
    navigation.setOptions({ headerShown: false });
    setPhotoPreview({
      photoList: reportDetail!.photo.photoList,
      selectedPhoto: photo,
    });
  };
  const handleClosePreview = () => {
    navigation.setOptions({ headerShown: true });
    setPhotoPreview(null);
    setTimeout(() => refScrollView.scrollTo({ y: scrollPosition, animated: false }), 0);
  };
  const handleScroll = ({ nativeEvent }: {
    nativeEvent: { contentOffset: { x: number, y: number } }
  }) => {
    setScrollPosition(nativeEvent.contentOffset.y);
  }

  if (!reportDetail) return null;

  let reservationStatus = null;
  if (!readonly) {
    let buttonText: string;
    switch (reportDetail.reservation.status) {
      case 'confirming':
        buttonText = I18n.t('dating-btn-confirming');
        break;
      case 'confirmed':
        buttonText = I18n.t('dating-btn-confirmed');
        break;
      case 'expired':
        buttonText = I18n.t('dating-btn-expired');
        break;
      default:
        buttonText = I18n.t('dating-btn-go-dating');
    }
    reservationStatus = (
      <TouchableWithoutFeedback onPress={() => handlePressReserve(reportDetail.reservation.id, reportDetail.exam.id, reportDetail.reservation.status)}>
        <View style={[styles.reservationStatus, {
          bottom: btnBottom
        }]}>
          <Text style={styles.reservationStatusText}>{buttonText}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  const renderField = (label: string, value: any | undefined, noValue: string) => {
    const labelStyle: Record<string, string | number>[] = [styles.contentCDFLabel];
    const valueStyle: Record<string, string | number>[] = [styles.contentCDFValue];
    if (!value) {
      labelStyle.push(styles.contentCDFNoData);
      valueStyle.push(styles.contentCDFNoData);
    }
    return (
      <View style={styles.contentCDField}>
        <Text style={labelStyle}>{I18n.t(label)}</Text>
        <Text style={valueStyle}>{value || I18n.t(noValue)}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={(scrollView) => {
          if (scrollView) {
            refScrollView = scrollView;
          }
          const reObj = refScrollView;
          return reObj;
        }}
        style={{ flex: 1 }}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={0}
      >
        <View style={ShellStyles.stickyShdow} />
        <View style={[ShellStyles.stickyShdowMark, styles.stickyShadowMask]} />
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>{I18n.t('report-pge-title')}</Text>
            <Text style={styles.headerTime}>
              <Text>{I18n.t('report-label-check-time')}: </Text>
              <Text>{reportDetail.exam.examTime}</Text>
            </Text>
          </View>
          <View style={styles.headerRight}>
            <IconReport />
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.contentSection}>
            <View style={styles.contentSectionLeft}>
              <View style={styles.contentSLIcon}>
                <Icon name="how_to_reg-24px" size={24} color="rgb(35, 178, 190)" />
              </View>
              <View style={styles.contentSLLine} />
            </View>
            <View style={styles.contentSectionRight}>
              <View style={styles.contentCardTitle}>
                <Text style={styles.contentCardTitleText}>
                  <Text>{I18n.t('report-label-patient-id')}:&nbsp;</Text>
                  <Text>{reportDetail.patient.mobile}</Text>
                </Text>
              </View>
              <View style={styles.contentCardDetail}>
                <View style={styles.contentCDRow}>
                  <View style={[styles.contentCDField, { flex: 2 }]}>
                    <Text style={styles.contentCDFLabel}>{I18n.t('report-label-name')}</Text>
                    <Text style={styles.contentCDFValue}>{reportDetail.patient.name}</Text>
                  </View>
                  <View style={[styles.contentCDField, { flex: 1, paddingLeft: 8 }]}>
                    <Text style={styles.contentCDFLabel}>{I18n.t('report-label-gender')}</Text>
                    <Text style={styles.contentCDFValue}>{I18n.t(`userInfo-det-sel-gender-${reportDetail.patient.gender.toLocaleLowerCase()}`)}</Text>
                  </View>
                  <View style={[styles.contentCDField, { flex: 2 }]}>
                    <Text style={styles.contentCDFLabel}>{I18n.t('report-label-birthday')}</Text>
                    <Text style={styles.contentCDFValue}>{reportDetail.patient.birthday}</Text>
                  </View>
                </View>
                <View style={[styles.contentCDRow, styles.contentCDRowFollowing]}>
                  {renderField(
                    'report-label-history',
                    reportDetail.patient.history,
                    'report-label-no-history',
                  )}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.contentSection}>
            <View style={styles.contentSectionLeft}>
              <View style={styles.contentSLIcon}>
                <Icon name="ic_verified_user_24p" size={24} color="rgb(35, 178, 190)" />
              </View>
              <View style={styles.contentSLLine} />
            </View>
            <View style={styles.contentSectionRight}>
              <View style={styles.contentCardTitle}>
                <Text style={styles.contentCardTitleText}>{I18n.t('report-pge-tab-exam-results')}</Text>
              </View>
              <View style={styles.contentCardDetail}>
                <View style={styles.contentCDRow}>
                  {renderField(
                    'report-label-other-dis',
                    reportDetail.exam.disease,
                    'report-no-disease',
                  )}
                </View>
              </View>
              <View style={styles.contentCardTitle}>
                <Text style={styles.contentCardTitleText}>{I18n.t('report-pge-tab-referral-and-recs')}</Text>
              </View>
              <View style={styles.contentCardDetail}>
                <View style={styles.contentCDRow}>
                  {renderField(
                    'report-label-referral-and-checkback',
                    reportDetail.exam.transferReexam,
                    'report-label-no-referral-and-checkback',
                  )}
                </View>
                <View style={[styles.contentCDRow, styles.contentCDRowFollowing]}>
                  {renderField(
                    'report-label-medical-advice',
                    reportDetail.exam.comment,
                    'report-label-no-medical-advice',
                  )}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.contentSection}>
            <View style={styles.contentSectionLeft}>
              <View style={styles.contentSLIcon}>
                <Icon name="image_search-24px" size={24} color="rgb(35, 178, 190)" />
              </View>
              <View style={styles.contentSLLine} />
            </View>
            <View style={styles.contentSectionRight}>
              <View style={styles.contentCardTitle}>
                <Text style={styles.contentCardTitleText}>{I18n.t('report-pge-tab-findings')}</Text>
              </View>
              <View style={styles.contentCardDetail}>
                <View style={styles.contentCDRow}>
                  <View style={styles.contentCDField}>
                    <Text style={styles.contentCDFLabel}>{I18n.t('report-label-photo-quality')}</Text>
                    <Text style={styles.contentCDFValue}>{reportDetail.photo.quality}</Text>
                  </View>
                </View>
                <View style={[styles.contentCDField, styles.contentCDRowFollowing]}>
                  <View style={styles.contentCDField}>
                    <Text style={styles.contentCDFLabel}>{I18n.t('report-label-photo-finds')}</Text>
                    <Text style={styles.contentCDFValue}>{reportDetail.photo.lesion.join(', ')}</Text>
                  </View>
                </View>
                {reportDetail.photo.photoList && reportDetail.photo.photoList.map(photo => (
                  <TouchableWithoutFeedback key={photo.tag} onPress={() => handleClickPhoto(photo)}>
                    <ImageBackground style={styles.contentCDPhoto} source={{ uri: photo.thumbLink }}>
                      <Text style={styles.contentCDPhotoLabel}>{photo.tag}</Text>
                    </ImageBackground>
                  </TouchableWithoutFeedback>
                ))}
              </View>
              <View style={styles.disclaimer}>
                <Text style={styles.disclaimerTxt}>
                  <Text style={styles.disclaimerMark}>*</Text>
                  {I18n.t('report-disclaimer-txt')}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerHospitalInfo}>
            <View style={styles.footerHISection}>
              <View style={styles.footerHISIcon}>
                <Icon name="ic_done_24px" size={24} color="rgba(255, 255, 255, 0.3)" />
              </View>
              <View style={[styles.footerHISDetail, styles.footerHISDetailBordered]}>
                <Text style={styles.footerHISLabel}>{I18n.t('report-label-doctor')}</Text>
                <Text style={styles.footerHISDesc}>{reportDetail.exam.uploader.name}</Text>
                <Text style={styles.footerHISDescSub}>{reportDetail.exam.uploader.org}</Text>
              </View>
            </View>
            <View style={styles.footerHISection}>
              <View style={styles.footerHISIcon}>
                <Icon name="ic_done_all_24px" size={24} color="rgba(255, 255, 255, 0.3)" />
              </View>
              <View style={styles.footerHISDetail}>
                {reportDetail.exam.viewer.name && <>
                  <Text style={styles.footerHISLabel}>{I18n.t('report-label-audit-doctor')}</Text>
                  <Text style={styles.footerHISDesc}>{reportDetail.exam.viewer.name}</Text>
                  <Text style={styles.footerHISDescSub}>{reportDetail.exam.viewer.org}</Text>
                </>}
                <Text style={[styles.footerHISLabel, reportDetail.exam.viewer.name && styles.footerHISLabelMargined || {}]}>{I18n.t('report-label-audit-date')}</Text>
                <Text style={styles.footerHISDesc}>{reportDetail.exam.checkTime}</Text>
              </View>
            </View>
          </View>
          <View style={styles.footerVCInfo}>
            <View style={styles.footerVCILeft}>
              <View style={styles.footerVCICompany}>
                <Image source={require('../assets/images/favicon.png')} style={styles.footerVCILogo} />
                <Text style={styles.footerVCICompanyName}>VoxelCloud</Text>
              </View>
              <Text style={styles.footerVCIDesc}>{I18n.t('report-desc-support-by-voxelcloud')}</Text>
            </View>
            <Image source={require('../assets/images/wechat.jpg')} style={styles.footerVCIQRCode} />
          </View>
        </View>
      </ScrollView>
      {reservationStatus}
      <MessageToast refreshFn={() => dispatch(fetchReportDetail(reportId || paramRptID))} />
      {!!photoPreview && (
        <ReportPhotoPreview
          onClose={handleClosePreview}
          photoData={photoPreview}
        />
      )}
    </View>
  );
}

export default Report;
