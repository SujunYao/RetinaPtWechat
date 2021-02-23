import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { camelizeKeys } from 'humps'
import { RootStackParamList } from '../types';

import Colors from '../constants/Colors';
import ShellStyles from '../constants/Shell';
import { getHealthRecord, updateHelthRecord } from '../store/user/actions';
import Icon from '../components/Icons';
import Field from '../components/Field';
import Selector from '../components/Selector';
import OptionList from '../components/OptionList';
import I18n from '../i18n/i18n';
import Styles from '../constants/HealthRecord';
import { GENDER, SMOKE, REQ_STATUS, FIELD_STATE, THEME, KEYBOARD_TYPE, HEALTH_REC_VIEW_MDOE } from '../store/enum';
import { ROOT_STATE } from '../store/interface';
import DatePicker from '../components/DatePicker';
import { RouteProp } from '@react-navigation/native';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HealthRecord'
>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'HealthRecord'>

interface Props {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

let _scrollView: ScrollView;

const HealthRecord: React.FC<Props> = ({ route, navigation }) => {

  const {
    reqUpdateHealthRecordState,
    bgEmpty,
    bgFull,
    bgLow,
    birthday,
    bpHigh,
    bpLow,
    gender,
    height,
    isSmoke,
    iDNumber,
    name,
    smokeYears,
    weight
  } = useSelector((state: ROOT_STATE) => state.user);
  const { keepToken, pid } = useSelector((state: ROOT_STATE) => state.system);
  const states: { [key: string]: FIELD_STATE } = {};

  const baseInfoData = { bgEmpty, pid, bgFull, bgLow, birthday, bpHigh, bpLow, gender, height, isSmoke, iDNumber, name, smokeYears, weight };
  Object.keys(baseInfoData).forEach((fieldName: string) => states[fieldName] = FIELD_STATE.DEF);

  const [baseInfo, setBaseInfo] = useState(baseInfoData);
  const [originInfo, setOriginInfo] = useState(baseInfoData);
  const [fieldsStates, setFieldsStates] = useState(states);
  const [showGenderOptions, setShowGenderOptions] = useState(false);
  const [showSmokeOptions, setShowSmokeOptions] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const tgtMode = route.params.mode || HEALTH_REC_VIEW_MDOE.EDIT;
    setMode(tgtMode);
    if (tgtMode === HEALTH_REC_VIEW_MDOE.READONLY) {
      setBaseInfo(originInfo);
      setFieldsStates(states);
    }
  }, [route])

  useEffect(() => {
    const baseInfoData = { bgEmpty, pid, bgFull, bgLow, birthday, bpHigh, bpLow, gender, height, isSmoke, iDNumber, name, smokeYears, weight };
    setBaseInfo(baseInfoData)
    setOriginInfo(baseInfoData);
  }, [bgEmpty, pid, bgFull, bgLow, birthday, bpHigh, bpLow, gender, height, isSmoke, iDNumber, name, smokeYears, weight]);

  useEffect(() => {
    if (reqUpdateHealthRecordState === REQ_STATUS.SUCCESSED) {
      setOriginInfo({ ...baseInfo });
      if (mode === HEALTH_REC_VIEW_MDOE.EDIT) {
        switchViewMode(false);
      }
      if (mode === HEALTH_REC_VIEW_MDOE.COMPLETE) {
        navigation.navigate('Home', { token: keepToken || '' });
      }
    }
  }, [reqUpdateHealthRecordState]);

  const formatGender = (val: GENDER): string => {
    switch (val) {
      case GENDER.OTHER:
        return I18n.t('userInfo-det-sel-gender-o');
      case GENDER.MALE:
        return I18n.t('userInfo-det-sel-gender-m');
      case GENDER.FEMALE:
        return I18n.t('userInfo-det-sel-gender-f');
      default:
        return '';
    }
  };

  const formatSmokeVal = (val: SMOKE): string => {
    switch (val) {
      case SMOKE.NOSMOKE:
        return I18n.t('userInfo-det-sel-sm-no');
      case SMOKE.OCCASIONALLY:
        return I18n.t('userInfo-det-sel-sm-occ');
      case SMOKE.OFTEN:
        return I18n.t('userInfo-det-sel-sm-of');
      default:
        return '';
    }
  }

  const fieldValueChange = (tgtVal: any, fieldKey: string) => {
    let val = tgtVal;
    switch (fieldKey) {
      case 'name':
      case 'gender':
      case 'birthday':
        setFieldsStates({ ...fieldsStates, [fieldKey]: !tgtVal && FIELD_STATE.WARN || FIELD_STATE.DEF })
        break;
      default:
        val = tgtVal;
        break;
    }
    setBaseInfo({ ...baseInfo, [fieldKey]: val });
  };

  const switchViewMode = (goRestore: boolean) => {
    if (mode === HEALTH_REC_VIEW_MDOE.EDIT && goRestore) {
      setBaseInfo(originInfo);
      setFieldsStates(states);
    }
    setMode(mode === HEALTH_REC_VIEW_MDOE.READONLY && HEALTH_REC_VIEW_MDOE.EDIT || HEALTH_REC_VIEW_MDOE.READONLY);
  };

  const submitHealthRecord = () => {
    const { bgEmpty, bgFull, bgLow, birthday, bpHigh, bpLow, gender, height, isSmoke, iDNumber, name, smokeYears, weight } = baseInfo;
    if (!name || !birthday || !gender) {
      _scrollView.scrollTo({ x: 0, y: 0, animated: true });
    } else {
      const _smokeYears = smokeYears === I18n.t('userInfo-no-value') ? 0 : smokeYears
      const data = {
        bg_empty: bgEmpty && parseFloat(parseFloat(`${bgEmpty}`).toFixed(1)) || 0,
        pid,
        bg_full: bgFull && parseFloat(parseFloat(`${bgFull}`).toFixed(1)) || 0,
        bg_low: bgLow && parseFloat(parseFloat(`${bgLow}`).toFixed(1)) || 0,
        birthday,
        bp_high: bpHigh && parseFloat(parseFloat(`${bpHigh}`).toFixed(0)) || 0,
        bp_low: bpLow && parseFloat(parseFloat(`${bpLow}`).toFixed(0)) || 0,
        gender,
        height: height && parseFloat(parseFloat(`${height}`).toFixed(0)) || 0,
        is_smoke: isSmoke && parseFloat(parseFloat(`${isSmoke}`).toFixed(0)),
        ID_number: iDNumber,
        name,
        smoke_years: isSmoke && parseFloat(parseFloat(`${_smokeYears}`).toFixed(0)) || 0,
        weight: weight && parseFloat(parseFloat(`${weight}`).toFixed(0)) || 0,
      };
      dispatch(updateHelthRecord(data));
      setBaseInfo({
        ...baseInfo,
        ...camelizeKeys(data),
      });
    }
  };

  const [mode, setMode] = useState(HEALTH_REC_VIEW_MDOE.EDIT)
  return <>
    <ScrollView
      ref={(scrollView) => {
        if (scrollView) {
          _scrollView = scrollView;
        }
        const reObj = _scrollView;
        return reObj;
      }}
      style={Styles.con}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false} >
      <View style={ShellStyles.stickyShdow} />
      <View style={ShellStyles.stickyShdowMark} />
      <View style={Styles.mainCon}>
        <View style={Styles.bgCon}>
          <ImageBackground source={require("../assets/images/bg.png")} style={Styles.bg} />
        </View>
        <View style={Styles.headerCon}>
          <Text style={Styles.title}>{I18n.t('userInfo-pge-title')}</Text>
          {mode !== HEALTH_REC_VIEW_MDOE.COMPLETE && <Text style={Styles.rightBtn} onPress={() => switchViewMode(true)}>
            <Icon style={Styles.rightBtnIcon} name={mode === HEALTH_REC_VIEW_MDOE.EDIT && 'ic_close_24px' || 'ic_edit_24px'} size={24} color='rgba(99, 115, 129, 1)' />
            {mode === HEALTH_REC_VIEW_MDOE.EDIT && I18n.t('userInfo-btn-cancel') || I18n.t('userInfo-btn-edit')}
          </Text> || <></>}
        </View>
        <View style={Styles.baseInfoCon}>
          <View style={Styles.baseInfoHeader}>
            <Image source={require("../assets/images/def_user.png")} style={Styles.header} />
            {mode === HEALTH_REC_VIEW_MDOE.EDIT && <Text style={Styles.basicInfoTitle}>{I18n.t('userInfo-title-basic-info')}</Text> || <></>}
            {mode === HEALTH_REC_VIEW_MDOE.READONLY && <View>
              <Text style={Styles.userInfo}>{baseInfo.name}</Text>
              <View style={Styles.basicInfoConR}>
                {baseInfo.birthday && <Text style={Styles.tagCon}>{baseInfo.birthday}</Text> || <></>}
                {baseInfo.gender && <Text style={Styles.tagCon}>{formatGender(baseInfo.gender)}</Text> || <></>}
              </View>
            </View> || <></>}
          </View>
          {mode !== HEALTH_REC_VIEW_MDOE.READONLY && <>
            <View style={Styles.break} />
            <Field
              fitContent={true}
              inpValue={baseInfo.name}
              state={fieldsStates.name}
              required={true}
              onChangeText={(val: string) => fieldValueChange(val, 'name')}
              label={I18n.t('userInfo-det-label-name')}
              theme={THEME.DARK}
              helpTxt={fieldsStates.name === FIELD_STATE.WARN && I18n.t('userInfo-det-msg-w-field-required') || ''}
              showRightAction={true}
              showClearBtn={true}
            />
            <View style={Styles.break} />
            <Selector
              fitContent={true}
              required={true}
              onPress={() => setShowGenderOptions(true)}
              inpValue={formatGender(baseInfo.gender)}
              fieldState={fieldsStates.gender}
              label={I18n.t('userInfo-det-label-gender')}
              helpTxt={I18n.t('userInfo-det-msg-w-field-required') || ''}
              theme={THEME.DARK}
            />
            <View style={Styles.break} />
            <Selector
              fitContent={true}
              required={true}
              onPress={() => setShowDatePicker(true)}
              inpValue={baseInfo.birthday}
              fieldState={fieldsStates.birthday}
              helpTxt={I18n.t('userInfo-det-msg-w-field-required') || ''}
              label={I18n.t('userInfo-det-label-birthday')}
              theme={THEME.DARK}
            />
            <View style={Styles.break} />
            <Field
              fitContent={true}
              inpValue={baseInfo.iDNumber}
              state={states.iDNumber}
              onChangeText={(val: string) => fieldValueChange(val, 'iDNumber')}
              label={I18n.t('userInfo-det-label-ID-number')}
              theme={THEME.DARK}
              showRightAction={true}
              showClearBtn={true}
            /></>}
        </View>
        <View style={Styles.groupCon}>
          <View style={Styles.groupHeader}>
            <Text style={Styles.headTitle}>{I18n.t('userInfo-det-title-height-and-weight')}</Text>
            <Icon style={Styles.groupIcon} name='ic_accessibility_24p' size={24} color='rgba(99, 115, 129, 1)' />
          </View>
          <View style={Styles.groupMainCon}>
            <View style={Styles.break} />
            <Field
              fitContent={true}
              inpValue={`${baseInfo.height || ''}`}
              state={(mode === HEALTH_REC_VIEW_MDOE.READONLY && FIELD_STATE.DISABLED) || states.height || FIELD_STATE.DEF}
              onChangeText={(val: string) => fieldValueChange(val, 'height')}
              label={I18n.t('userInfo-det-label-height')}
              theme={THEME.LIGHT}
              keyBordType={KEYBOARD_TYPE.DECIMAL}
              showRightAction={true}
              showClearBtn={true}
            />
            <View style={Styles.break} />
            <Field
              fitContent={true}
              inpValue={`${baseInfo.weight || ''}`}
              state={(mode === HEALTH_REC_VIEW_MDOE.READONLY && FIELD_STATE.DISABLED) || states.weight || FIELD_STATE.DEF}
              onChangeText={(val: string) => fieldValueChange(val, 'weight')}
              label={I18n.t('userInfo-det-label-weight')}
              keyBordType={KEYBOARD_TYPE.DECIMAL}
              theme={THEME.LIGHT}
              showRightAction={true}
              showClearBtn={true}
            />
          </View>
          <View style={Styles.groupHeader}>
            <Text style={Styles.headTitle}>{I18n.t('userInfo-det-title-glucose-and-pressure')}</Text>
            <Icon style={Styles.groupIcon} name='ic_opacity_24px' size={24} color='rgba(99, 115, 129, 1)' />
          </View>
          <View style={Styles.groupMainCon}>
            <View style={Styles.break} />
            <Field
              fitContent={true}
              inpValue={`${baseInfo.bgEmpty || ''}`}
              state={(mode === HEALTH_REC_VIEW_MDOE.READONLY && FIELD_STATE.DISABLED) || states.bgEmpty || FIELD_STATE.DEF}
              onChangeText={(val: string) => fieldValueChange(val, 'bgEmpty')}
              label={I18n.t('userInfo-det-label-fbg')}
              helpTxt={mode !== HEALTH_REC_VIEW_MDOE.READONLY && I18n.t('userInfo-det-des-ono-d') || ''}
              theme={THEME.LIGHT}
              keyBordType={KEYBOARD_TYPE.NUM}
              showRightAction={true}
              showClearBtn={true}
            />
            <View style={Styles.break} />
            <Field
              fitContent={true}
              inpValue={`${baseInfo.bgFull || ''}`}
              state={(mode === HEALTH_REC_VIEW_MDOE.READONLY && FIELD_STATE.DISABLED) || states.bgFull || FIELD_STATE.DEF}
              onChangeText={(val: string) => fieldValueChange(val, 'bgFull')}
              label={I18n.t('userInfo-det-label-pbg')}
              helpTxt={mode !== HEALTH_REC_VIEW_MDOE.READONLY && I18n.t('userInfo-det-des-ono-d') || ''}
              theme={THEME.LIGHT}
              keyBordType={KEYBOARD_TYPE.NUM}
              showRightAction={true}
              showClearBtn={true}
            />
            <View style={Styles.break} />
            <Field
              fitContent={true}
              inpValue={`${baseInfo.bgLow || ''}`}
              state={(mode === HEALTH_REC_VIEW_MDOE.READONLY && FIELD_STATE.DISABLED) || states.bgLow || FIELD_STATE.DEF}
              onChangeText={(val: string) => fieldValueChange(val, 'bgLow')}
              label={I18n.t('userInfo-det-label-mbg')}
              helpTxt={mode !== HEALTH_REC_VIEW_MDOE.READONLY && I18n.t('userInfo-det-des-ono-d') || ''}
              theme={THEME.LIGHT}
              keyBordType={KEYBOARD_TYPE.NUM}
              showRightAction={true}
              showClearBtn={true}
            />
            <View style={Styles.break} />
            <Field
              fitContent={true}
              inpValue={`${baseInfo.bpHigh || ''}`}
              state={(mode === HEALTH_REC_VIEW_MDOE.READONLY && FIELD_STATE.DISABLED) || states.bpHigh || FIELD_STATE.DEF}
              onChangeText={(val: string) => fieldValueChange(val, 'bpHigh')}
              label={I18n.t('userInfo-det-label-sys')}
              helpTxt={mode !== HEALTH_REC_VIEW_MDOE.READONLY && I18n.t('userInfo-det-des-oint') || ''}
              theme={THEME.LIGHT}
              keyBordType={KEYBOARD_TYPE.DECIMAL}
              showRightAction={true}
              showClearBtn={true}
            />
            <View style={Styles.break} />
            <Field
              fitContent={true}
              inpValue={`${baseInfo.bpLow || ''}`}
              state={(mode === HEALTH_REC_VIEW_MDOE.READONLY && FIELD_STATE.DISABLED) || states.bpLow || FIELD_STATE.DEF}
              onChangeText={(val: string) => fieldValueChange(val, 'bpLow')}
              label={I18n.t('userInfo-det-label-ds')}
              keyBordType={KEYBOARD_TYPE.DECIMAL}
              helpTxt={mode !== HEALTH_REC_VIEW_MDOE.READONLY && I18n.t('userInfo-det-des-oint') || ''}
              theme={THEME.LIGHT}
              showRightAction={true}
              showClearBtn={true}
            />
          </View>
          <View style={Styles.groupHeader}>
            <Text style={Styles.headTitle}>{I18n.t('userInfo-det-title-sm-history')}</Text>
            <Icon style={Styles.groupIcon} name='ic_smoking_rooms_24p' size={24} color='rgba(99, 115, 129, 1)' />
          </View>
          <View style={Styles.groupMainCon}>
            <View style={Styles.break} />
            <View style={Styles.twoCellsRow}>
              <View style={[Styles.cellCon, {
                paddingRight: 8
              }]}>
                <Selector
                  fitContent={true}
                  editable={mode !== HEALTH_REC_VIEW_MDOE.READONLY}
                  onPress={() => setShowSmokeOptions(true)}
                  inpValue={formatSmokeVal(baseInfo.isSmoke)}
                  label={I18n.t('userInfo-det-label-whether-sm')}
                  theme={THEME.LIGHT}
                />
              </View>
              <View style={Styles.cellCon}>
                {baseInfo.isSmoke > 0 && <Field
                  fitContent={true}
                  inpValue={`${baseInfo.smokeYears || (mode === HEALTH_REC_VIEW_MDOE.READONLY && I18n.t('userInfo-no-value') || '')}`}
                  state={(mode === HEALTH_REC_VIEW_MDOE.READONLY && FIELD_STATE.DISABLED) || states.smokeYears || FIELD_STATE.DEF}
                  onChangeText={(val: string) => fieldValueChange(val, 'smokeYears')}
                  label={I18n.t('userInfo-det-label-sm-years')}
                  helpTxt={mode !== HEALTH_REC_VIEW_MDOE.READONLY && I18n.t('userInfo-det-des-oint') || ''}
                  theme={THEME.LIGHT}
                  keyBordType={KEYBOARD_TYPE.DECIMAL}
                  showRightAction={true}
                  showClearBtn={true}
                /> || <></>}
              </View>
            </View>
          </View>
          {(mode === HEALTH_REC_VIEW_MDOE.EDIT || mode === HEALTH_REC_VIEW_MDOE.COMPLETE) && <Text
            accessibilityRole='button'
            style={[Styles.btn, {
              backgroundColor: (!baseInfo.name || !baseInfo.birthday || !baseInfo.gender) && 'rgba(0, 0, 0, .12)' || 'rgba(35, 178, 190, 1)',
              color: (!baseInfo.name || !baseInfo.birthday || !baseInfo.gender) && 'rgba(0, 0, 0, .26)' || 'rgba(255, 255, 255, 1)'
            }]}
            onPress={submitHealthRecord}
          >
            {mode === HEALTH_REC_VIEW_MDOE.COMPLETE && I18n.t('userInfo-det-btn-submit') || I18n.t('userInfo-det-btn-save')}
          </Text>}
        </View>
      </View>
    </ScrollView>
    <OptionList
      listData={[
        { key: GENDER.MALE, text: I18n.t('userInfo-det-sel-gender-m') },
        { key: GENDER.FEMALE, text: I18n.t('userInfo-det-sel-gender-f') },
        { key: GENDER.OTHER, text: I18n.t('userInfo-det-sel-gender-o') }
      ]}
      selectedKey={baseInfo.gender}
      label={I18n.t('userInfo-det-label-gender')}
      closeFn={() => setShowGenderOptions(false)}
      finishSelector={(key: GENDER) => setBaseInfo({ ...baseInfo, gender: key })}
      show={showGenderOptions}
    />
    <OptionList
      listData={[
        { key: SMOKE.NOSMOKE, text: I18n.t('userInfo-det-sel-sm-no') },
        { key: SMOKE.OCCASIONALLY, text: I18n.t('userInfo-det-sel-sm-occ') },
        { key: SMOKE.OFTEN, text: I18n.t('userInfo-det-sel-sm-of') }
      ]}
      label={I18n.t('userInfo-det-label-whether-sm')}
      closeFn={() => setShowSmokeOptions(false)}
      selectedKey={baseInfo.isSmoke.toString()}
      finishSelector={(key: SMOKE) => {
        setBaseInfo({ ...baseInfo, isSmoke: key, smokeYears: 0 });
      }}
      show={showSmokeOptions}
    />
    <DatePicker
      date={baseInfo.birthday}
      label={I18n.t('userInfo-det-label-birthday')}
      show={showDatePicker}
      finishSelector={(key: string) => setBaseInfo({ ...baseInfo, birthday: key })}
      closeFn={() => setShowDatePicker(false)}
    />
  </>;
};

export default HealthRecord;