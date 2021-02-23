import React, { useRef, useState, useEffect, Children } from 'react';
import { FlatList, Image, View, Text, Animated, Easing, Dimensions } from 'react-native';

import { LinearGradient } from "expo-linear-gradient";

import Colors from '../constants/Colors';
import Icon from './Icons';
import I18n from '../i18n/i18n';
import Styles from '../constants/Appointment';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ROOT_STATE } from '../store/interface';
import { APPT_TIME, SCOPE_DAY } from '../store/appt/types';
import Field from './Field';
import { cancelAPPT, switchShowAPPT, updateAPPT } from '../store/appt/actions';
import { TIME, WEEKI18N, APPT_STATUS, FIELD_STATE, THEME, TIMEI18N, WEEK } from '../store/enum';
import { showMSGToast, switchRefreshAPPT } from '../store/system/actions';
import MessageBox from './MessageBox';

enum APPT_MODE {
  SELECTOR = 'selector',
  DETAIL = 'deatilInfo'
}

const defBefore = [{ key: -1, text: '' }];
const defAfter = [{ key: -2, text: '' }];
const MONTHI18Ns = [
  "sel-date-month-jan",
  "sel-date-month-feb",
  "sel-date-month-mar",
  "sel-date-month-apr",
  "sel-date-month-may",
  "sel-date-month-jun",
  "sel-date-month-jly",
  "sel-date-month-aug",
  "sel-date-month-sep",
  "sel-date-month-oct",
  "sel-date-month-nov",
  "sel-date-month-dec"];

interface SEL_DATE {
  day: string,
  month: string,
  year: string,
  available: string,
  weekday: string,
}

interface dateItem {
  key: any,
  weekday?: string,
  text: string,
}

interface Props {
  show?: boolean,
  closeFn?: Function,
  finishSelector?: Function,
}

interface DATAS {
  years?: Array<dateItem>,
  months?: Array<dateItem>,
  days?: Array<dateItem>,
  availables?: Array<dateItem>
}

const screen = Dimensions.get("window");

let _yearList: FlatList<any>, _monthList: FlatList<any>, _dayList: FlatList<any>, _availableList: FlatList<any>;

const Appointment: React.FC<Props> = ({
  closeFn
}) => {

  const { orgInfo, examID, showAPPT, patient: apptPatientInfo, scope, examMap, from, reservation: { id: reservationID } } = useSelector((state: ROOT_STATE) => state.appt);
  const { mobile } = useSelector((state: ROOT_STATE) => state.system);
  const curUserInfo = useSelector((state: ROOT_STATE) => state.user);
  const patient = apptPatientInfo.name && apptPatientInfo || curUserInfo;

  const selDate: SEL_DATE = { day: '', month: '', year: '', available: '', weekday: '' }
  const [headerTitle, setHeaderTitle] = useState('');
  const [headerDesc, setHeaderDesc] = useState('');
  const [selDate0, setSelDate0] = useState(selDate);
  const [selDate1, setSelDate1] = useState(selDate);
  const [selDate2, setSelDate2] = useState(selDate);
  const [detailTitle, setDetailTitle] = useState('');
  const [detailTitleIcon, setDetailTitleIcon] = useState('');
  const [mode, setMode] = useState(APPT_MODE.SELECTOR);
  const [editContactEnable, SetEditContactEnable] = useState(true);
  const [contactMobile, setContactMobile] = useState(apptPatientInfo.contactMobile || mobile || curUserInfo.mobile);
  const groups: { [key: string]: { dates: Array<APPT_TIME> } } = {};
  const [dateGroups, setDateGroups] = useState(groups);
  const [inpState, setInpState] = useState(FIELD_STATE.DISABLED);
  const [finalBtnTxt, setFinalBtnTxt] = useState('');
  const arr: Array<dateItem> = [];
  const [years, setYears] = useState(arr);
  const [scrollYearPosition, setScrollYearPosition] = useState(0);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [selectedYearKeyVal, setSelectedYearKeyVal] = useState('');
  const [months, setMonths] = useState(arr);
  const [scrollMonthPosition, setScrollMonthPosition] = useState(0);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const [selectedMonthKeyVal, setSelectedMonthKeyVal] = useState('');
  const [days, setDays] = useState(arr);
  const [scrollDayPosition, setScrollDayPosition] = useState(0);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedDayKeyVal, setSelectedDayKeyVal] = useState('');
  const [availables, setAvailables] = useState(arr);
  const [scrollAvailablePosition, setScrollAvailablePosition] = useState(0);
  const [selectedAvailableIndex, setSelectedAvailableIndex] = useState(0);
  const [selectedAvailableKeyVal, setSelectedAvailableKeyVal] = useState('');
  const [activeTagIndex, setActiveTagIndex] = useState(0);
  const [contactMode, setContactMode] = useState('readonly');
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [contactMobileHelpTxt, setContactMobileHelpTxt] = useState('');
  const [apptStatus, setApptStatus] = useState(APPT_STATUS.NEW);

  const dispatch = useDispatch();
  const [showVal, setShowVal] = useState(false);

  useEffect(() => {
    setContactMobile(apptPatientInfo.contactMobile || mobile || curUserInfo.mobile);
  }, [mobile, apptPatientInfo, curUserInfo]);

  useEffect(() => {
    if (showAPPT) {
      dispatch(switchRefreshAPPT(false));
      transfromYInAnim();
      setShowVal(showAPPT);
    } else {
      transfromHeightOutAnim();
      transfromYOutAnim();
    }

  }, [showAPPT]);

  useEffect(() => {
    if (showAPPT) {
      const { id, status, selectTime, confirmTime } = examMap[examID] || {};
      const _status = !id && APPT_STATUS.NEW || status;
      setApptStatus(_status);
      if (!_status || status === APPT_STATUS.EXPIRED) {
        setContactMobile(mobile || curUserInfo.mobile);
      }
      let headerTitleI18n = '';
      let headerDescI18n = '';
      let detailTitleI18n = '';
      let _detailTitleIcon = '';
      let apptMode = APPT_MODE.SELECTOR;
      const _groups: { [key: string]: any } = {};
      let _finalBtnTxt = I18n.t('dating-btn-cancel-appt');
      switch (_status) {
        case APPT_STATUS.CONFIRMING:
          detailTitleI18n = 'dating-dates-state-confirming-title';
          _detailTitleIcon = 'ic_insert_invitation'
          headerDescI18n = 'dating-dates-state-confirming-desc';
          apptMode = APPT_MODE.DETAIL;
          if (selectTime && selectTime.length > 0) {
            selectTime.forEach((date: APPT_TIME) => {
              const groupKey = `${date.year}`;
              if (!_groups[groupKey]) {
                _groups[groupKey] = { dates: [] };
              }
              _groups[groupKey].dates.push(date);
            });
          }
          break;
        case APPT_STATUS.CONFIRMED:
          detailTitleI18n = 'dating-dates-state-confirmed-title';
          _detailTitleIcon = 'ic_event_available_2';
          headerDescI18n = 'dating-dates-state-confirmed-desc';
          apptMode = APPT_MODE.DETAIL;
          if (confirmTime && confirmTime.year) {
            _groups[confirmTime.year] = {
              dates: [{ ...confirmTime }]
            }
          }
          break;
        case APPT_STATUS.EXPIRED:
          detailTitleI18n = 'dating-dates-state-edit-title';
          headerTitleI18n = 'dating-dates-state-new-title';
          headerDescI18n = 'dating-dates-state-expired-desc';
          _finalBtnTxt = I18n.t('dating-btn-cmplt');
          break;
        default:
          detailTitleI18n = 'dating-dates-state-edit-title';
          headerTitleI18n = 'dating-dates-state-new-title';
          headerDescI18n = 'dating-dates-state-new-desc';
          _finalBtnTxt = I18n.t('dating-btn-cmplt');
          break;
      }
      setHeaderTitle(I18n.t(headerTitleI18n));
      setHeaderDesc(I18n.t(headerDescI18n));
      setDetailTitle(I18n.t(detailTitleI18n));
      setDetailTitleIcon(_detailTitleIcon);
      setFinalBtnTxt(_finalBtnTxt);
      setDateGroups(_groups);
      if (apptMode === APPT_MODE.DETAIL) {
        transfromYFullAnim();
        transfromHeightInAnim();
      } else {
        transfromHeightOutAnim();
      }
      setMode(apptMode);
    }
  }, [examID, examMap, showAPPT])

  useEffect(() => {
    if (scope && Object.keys(scope).length > 0) {
      const _years: Array<dateItem> = [];
      const _months: Array<dateItem> = [];
      const _days: Array<dateItem> = [];
      const _availables: Array<dateItem> = [];
      Object.keys(scope).forEach((key: string) => {
        _years.push({ key: parseInt(key), text: key });
      });
      const curSelectedYear = _years[0].key;
      Object.keys(scope[curSelectedYear]).forEach((key: string) => {
        _months.push({ key: parseInt(key), text: key });
      })
      const curSelectedMonth = _months[0].key;
      scope[curSelectedYear][curSelectedMonth].forEach((dayInfo: SCOPE_DAY, index: number) => {
        _days.push({ key: dayInfo.day, text: `${dayInfo.day}`, weekday: dayInfo.weekday, });
        if (index === 0) {
          dayInfo.available.forEach((avaKey: string) => {
            if (!calcHasSelected(avaKey, { year: _years[0].key, month: _months[0].key, day: `${dayInfo.day}` })) {
              _availables.push({ key: avaKey, text: avaKey });
            }
          });
        }
      });

      setYears(_years);
      setMonths(_months);
      setDays(_days);
      setAvailables(_availables);
      initialSelected('root', {
        years: _years,
        months: _months,
        days: _days,
        availables: _availables,
      });
    }
  }, [scope])

  useEffect(() => {
    if (selectedYearKeyVal) {
      const curSelYear = parseInt(selectedYearKeyVal);
      const _months: Array<dateItem> = [];
      Object.keys(scope[curSelYear]).forEach((key: string) => _months.push({ key: parseInt(key), text: key }));
      const _days: Array<dateItem> = [];
      const _availables: Array<dateItem> = [];
      if (_months.length > 0) {
        scope[curSelYear][_months[0].key].forEach((dayInfo: SCOPE_DAY, index: number) => {
          _days.push({ key: dayInfo.day, text: `${dayInfo.day}`, weekday: dayInfo.weekday, });
          if (index === 0) {
            dayInfo.available.forEach((avaStr: string) => {
              if (!calcHasSelected(avaStr, { year: selectedYearKeyVal, month: _months[0].key, day: `${dayInfo.day}` })) {
                _availables.push({ key: avaStr, text: avaStr });
              }
            });
          }
        });
      }
      setMonths(_months);
      setDays(_days)
      setAvailables(_availables);
      initialSelected('year', { months: _months, days: _days, availables: _availables });
    }
  }, [selectedYearKeyVal]);

  useEffect(() => {
    if (selectedMonthKeyVal) {
      const curSelYear = parseInt(selectedYearKeyVal);
      const _days: Array<dateItem> = [];
      const _availables: Array<dateItem> = [];
      if (months.length > 0) {
        scope[curSelYear][parseInt(selectedMonthKeyVal)]?.forEach((dayInfo: SCOPE_DAY, index: number) => {
          _days.push({ key: dayInfo.day, text: `${dayInfo.day}`, weekday: dayInfo.weekday, });
          if (index === 0) {
            dayInfo.available.forEach((avaStr: string) => {
              if (!calcHasSelected(avaStr, { month: selectedMonthKeyVal, day: `${dayInfo.day}` })) {
                _availables.push({ key: avaStr, text: avaStr });
              }
            });
          }
        });
      }
      setDays(_days);
      setAvailables(_availables);
      initialSelected('month', { days: _days, availables: _availables });
    }
  }, [selectedMonthKeyVal]);

  useEffect(() => {
    if (selectedDayKeyVal) {
      const curSelYear = parseInt(selectedYearKeyVal);
      const curMonth = parseInt(selectedMonthKeyVal)
      const _availables: Array<dateItem> = [];
      scope[curSelYear][curMonth]?.some((dayInfo: SCOPE_DAY, index: number) => {
        if (dayInfo.day === parseInt(selectedDayKeyVal)) {
          dayInfo.available.forEach((avaStr: string) => {
            if (!calcHasSelected(avaStr, { day: selectedDayKeyVal })) {
              _availables.push({ key: avaStr, text: avaStr });
            }
          });
          return true;
        }
      });
      setAvailables(_availables);
      initialSelected('day', { availables: _availables });
    }
  }, [selectedDayKeyVal]);

  useEffect(() => {
    if (selectedAvailableKeyVal) {
      const selectedTimes: Array<string> = [];
      const selDates = [selDate0, selDate1, selDate2];
      selDates.forEach((date) => {
        if (date.year) {
          selectedTimes.push(`${date.year}-${date.month}-${date.day}-${date.available}`)
        }
      });
      const [dayInfo] = days.filter((day) => day.key === selectedDayKeyVal);
      if (selectedTimes.length >= 2) {
        switch (activeTagIndex) {
          case 0:
            setSelDate0({
              day: selectedDayKeyVal,
              month: selectedMonthKeyVal,
              year: selectedYearKeyVal,
              available: selectedAvailableKeyVal,
              weekday: dayInfo.weekday || ''
            });
            break;
          case 1:
            setSelDate1({
              day: selectedDayKeyVal,
              month: selectedMonthKeyVal,
              year: selectedYearKeyVal,
              available: selectedAvailableKeyVal,
              weekday: dayInfo.weekday || ''
            });
            break;
          case 2:
            setSelDate2({
              day: selectedDayKeyVal,
              month: selectedMonthKeyVal,
              year: selectedYearKeyVal,
              available: selectedAvailableKeyVal,
              weekday: dayInfo.weekday || ''
            });
            break;
        }
      }
    }

  }, [selectedAvailableKeyVal]);

  const initialSelected = (startLevel: string = 'root', datas: DATAS) => {
    const selectedTimes: Array<string> = [];
    const selDates = [selDate0, selDate1, selDate2];
    selDates.forEach((date) => {
      if (date.year) {
        selectedTimes.push(`${date.year}-${date.month}-${date.day}-${date.available}`)
      }
    });
    switch (startLevel) {
      case 'year':
        datas.months && setSelectedMonthKeyVal(datas.months[0].key);
        datas.days && setSelectedDayKeyVal(datas.days[0].key);
        datas.availables && setSelectedAvailableKeyVal(datas.availables[0]?.key);
        break;
      case 'month':
        datas.days && setSelectedDayKeyVal(datas.days[0].key);
        datas.availables && setSelectedAvailableKeyVal(datas.availables[0]?.key);
        break;
      case 'day':
        datas.availables && setSelectedAvailableKeyVal(datas.availables[0]?.key);
        break;
      default:
        datas.years && setSelectedYearKeyVal(datas.years[0].key);
        datas.months && setSelectedMonthKeyVal(datas.months[0].key);
        datas.days && setSelectedDayKeyVal(datas.days[0].key);
        datas.availables && setSelectedAvailableKeyVal(datas.availables[0]?.key);
        break;
    }
    if (selectedTimes.length >= 2 && startLevel === 'day') {
      const availableVal = datas.availables && datas.availables.length > 0 && datas.availables[0].key || selectedAvailableKeyVal;
      if (availableVal && selectedTimes.indexOf(`${selectedYearKeyVal}-${selectedMonthKeyVal}-${selectedDayKeyVal}-${availableVal}`) < 0) {
        switch (activeTagIndex) {
          case 0:
            setSelDate0({
              day: datas.days && datas.days[0].key || selectedDayKeyVal,
              month: datas.months && datas.months[0].key || selectedMonthKeyVal,
              year: datas.years && datas.years[0].key || selectedYearKeyVal,
              available: datas.availables && datas.availables.length > 0 && datas.availables[0].key || selectedAvailableKeyVal,
              weekday: datas.days && datas.days[0].weekday || ''
            });
            break;
          case 1:
            setSelDate1({
              day: datas.days && datas.days[0].key || selectedDayKeyVal,
              month: datas.months && datas.months[0].key || selectedMonthKeyVal,
              year: datas.years && datas.years[0].key || selectedYearKeyVal,
              available: datas.availables && datas.availables.length > 0 && datas.availables[0].key || selectedAvailableKeyVal,
              weekday: datas.days && datas.days[0].weekday || ''
            });
            break;
          case 2:
            setSelDate2({
              day: datas.days && datas.days[0].key || selectedDayKeyVal,
              month: datas.months && datas.months[0].key || selectedMonthKeyVal,
              year: datas.years && datas.years[0].key || selectedYearKeyVal,
              available: datas.availables && datas.availables.length > 0 && datas.availables[0].key || selectedAvailableKeyVal,
              weekday: datas.days && datas.days[0].weekday || ''
            });
            break;
        }
      }
    }
  };

  const format = (data: any) => {
    return {
      year: parseInt(data.year),
      month: parseInt(data.month),
      day: parseInt(data.day),
      weekday: data.weekday,
      available: data.available,
    };
  }

  const cmpltAPPT = () => {
    if (contactMobileHelpTxt) {
      return;
    }
    if (finalBtnTxt === I18n.t('dating-btn-cmplt')) {
      const seltect_time = [format(selDate0), format(selDate1), format(selDate2)];
      dispatch(updateAPPT({
        id: parseInt(`${examMap[examID].id}`),
        exam_id: examID,
        contact_mobile: contactMobile,
        select_time: seltect_time.filter((item) => item.year)
      }));
      initialStates();
      dispatch(showMSGToast({ show: true, msg: I18n.t('dating-msg-toast-new-success'), hideActionBtn: true }));
    } else if (typeof reservationID === 'number') {
      dispatch(cancelAPPT(reservationID));
      dispatch(showMSGToast({ show: true, msg: I18n.t('dating-msg-toast-des'), hideActionBtn: false }));
    }
    dispatch(switchRefreshAPPT(true, from));
    dispatch(switchShowAPPT(false, examID));
  };

  const calcHasSelected = (availableVal: string, datas?: { day?: string, month?: string, year?: string }): boolean => {
    const { year, month, day } = datas || {};
    const selYear = year || selectedYearKeyVal;
    const selMonth = month || selectedMonthKeyVal;
    const selDay = day || selectedDayKeyVal;
    const selDates = [selDate0, selDate1, selDate2];
    const sameDayDates = selDates.filter(date => date.year === selYear && date.month === selMonth && date.day === selDay);

    if (selDate0.year !== selYear && selDate1.year !== selYear && selDate2.year !== selYear) {
      return false;
    } else if (selDate0.month !== selMonth && selDate1.month !== selMonth && selDate2.month !== selMonth) {
      return false;
    } else if (selDate0.day !== selDay && selDate1.day !== selDay && selDate2.day !== selDay) {
      return false;
    } else if (sameDayDates.length === 0 || (!sameDayDates.some(date => date.available === availableVal))) {
      return false;
    } else {
      return true;
    }
  }

  /**
  * The animation show when switch the field state between default and focus
  * @Sujun
  * **/
  const transfromYAnim = useRef(new Animated.Value(screen.height)).current;
  const transfromYInAnim = () => {
    Animated.timing(transfromYAnim, {
      toValue: screen.height - 400,
      duration: 400,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };
  const transfromYOutAnim = () => {
    Animated.timing(transfromYAnim, {
      toValue: screen.height,
      duration: 400,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start(() => setShowVal(showAPPT));
  };
  const transfromYFullAnim = () => {
    Animated.timing(transfromYAnim, {
      toValue: 0,
      duration: 400,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };
  const transformHeightAnim = useRef(new Animated.Value(400)).current;
  const transfromHeightInAnim = () => {
    Animated.timing(transformHeightAnim, {
      toValue: screen.height,
      duration: 400,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };
  const transfromHeightOutAnim = () => {
    Animated.timing(transformHeightAnim, {
      toValue: 400,
      duration: 400,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };

  const onClose = () => {
    dispatch(switchRefreshAPPT(true));
    dispatch(switchShowAPPT(false, examID));
    initialStates();
  };

  const initialStates = () => {
    setSelDate0(selDate);
    setSelDate1(selDate);
    setSelDate2(selDate);
    setMode(APPT_MODE.SELECTOR);

    SetEditContactEnable(false);

    setDateGroups(groups);
    setYears(arr);
    setScrollYearPosition(0);
    setSelectedYearIndex(0);
    setSelectedYearKeyVal('');
    setMonths(arr);
    setScrollMonthPosition(0);
    setSelectedMonthIndex(0);
    setSelectedMonthKeyVal('');
    setDays(arr);
    setScrollDayPosition(0);
    setSelectedDayIndex(0);
    setSelectedDayKeyVal('');
    setAvailables(arr);
    setScrollAvailablePosition(0);
    setSelectedAvailableIndex(0);
    setSelectedAvailableKeyVal('');
    setInpState(FIELD_STATE.DISABLED);
    setContactMobile(mobile || curUserInfo.mobile);
    setActiveTagIndex(0);
    setContactMode('readonly');
    setShowMessageBox(false);
    setContactMobileHelpTxt('');
  };

  const goClose = () => {
    if ((!examMap[examID].status
      || examMap[examID].status === APPT_STATUS.EXPIRED)
      && (selDate0.year || selDate1.year || selDate2.year)) {
      setShowMessageBox(true);
    } else {
      onClose();
    }
  };

  const formatterStatus = (code: APPT_STATUS | undefined): string => {
    let res = '';
    switch (code) {
      case APPT_STATUS.CONFIRMING:
        return I18n.t('dating-state-txt-confirming');
      case APPT_STATUS.CONFIRMED:
        return I18n.t('dating-state-txt-confirmed');
    }
    return res;
  };

  const formatterAvailable = (code: string): string => {
    let res = '';
    switch (code) {
      case TIME.AM:
        return I18n.t(TIMEI18N.AM);
      case TIME.PM:
        return I18n.t(TIMEI18N.PM);
    }
    return res;
  }

  const formatterMonth = (month: number): string => {
    let res = '';
    if (month >= 0) {
      res = I18n.t(MONTHI18Ns[month - 1]);
    }
    return res;
  }

  const formatterWeekDay = (weekday: string): string => {
    switch (weekday) {
      case WEEK.MON:
        return I18n.t(WEEKI18N.Monday);
      case WEEK.TUE:
        return I18n.t(WEEKI18N.Tuesday);
      case WEEK.WED:
        return I18n.t(WEEKI18N.Wednesday);
      case WEEK.THU:
        return I18n.t(WEEKI18N.Thursday);
      case WEEK.FRI:
        return I18n.t(WEEKI18N.Friday);
      case WEEK.SAT:
        return I18n.t(WEEKI18N.Saturday);
      case WEEK.SUN:
        return I18n.t(WEEKI18N.Sunday);
      default:
        return ''
    }
  }

  const renderGroups = () => Object.entries(dateGroups).map(([key, obj]) => {
    const { dates } = obj;
    return <View style={Styles.timeGroup}>
      <View style={Styles.timeGroupHeader}>
        <Text style={Styles.year}>{key}</Text>
        <Text style={Styles.desc}>{I18n.t('dating-detail-card-time-range-title')}</Text>
        <Text style={Styles.statusTxt}>{formatterStatus(examMap[examID].status)}</Text>
      </View>
      <View style={Styles.tagValCon}>
        {dates.map((date: APPT_TIME) => {
          return (<Text style={Styles.dateTagCon}>
            {examMap[examID].status === APPT_STATUS.CONFIRMED && <Icon name='ic_check_circle_24px' size={20} color='rgba(35, 178, 190, 1)' style={{ marginRight: 6 }} />}
            {date.month}/{date.day} {formatterAvailable(date.available || '')}
          </Text>);
        })}
      </View>
    </View>;
  });

  const formatterDay = (day: string, weekday?: string) => {
    return day && `${I18n.t('sel-date-day').replace('${day}', day)}${weekday && `/${formatterWeekDay(weekday)}`}` || '';
  }

  const renderYearItem = ({ item }: { item: dateItem }) => {
    return (
      <Text style={[Styles.optionItem, {
        color: selectedYearKeyVal === item.key && 'rgba(35, 178, 190,1)' || 'rgba(0,0,0,.54)'
      }]} key={item.key}>{item.text}</Text>
    );
  };
  const renderMonthItem = ({ item }: { item: dateItem }) => {
    return (
      <Text style={[Styles.optionItem, {
        color: selectedMonthKeyVal === item.key && 'rgba(35, 178, 190,1)' || 'rgba(0,0,0,.54)'
      }]} key={item.key}>{formatterMonth(item.key)}</Text>
    );
  };
  const renderDayItem = ({ item }: { item: dateItem }) => {
    return (
      <Text style={[Styles.optionItem, {
        color: selectedDayKeyVal === item.key && 'rgba(35, 178, 190,1)' || 'rgba(0,0,0,.54)'
      }]} key={item.key}>{formatterDay(item.text, item.weekday)}
        {selectedDayKeyVal === item.key && availables.length === 0 && <Text style={Styles.noAvailableToSel}>{I18n.t('dating-full-txt')}</Text> || <></>}
      </Text>
    );
  };

  const renderAvailablesItem = ({ item }: { item: dateItem }) => {
    return (
      <Text style={[Styles.optionItem, {
        color: selectedAvailableKeyVal === item.key && 'rgba(35, 178, 190,1)' || 'rgba(0,0,0,.54)'
      }]} key={item.key}>{formatterAvailable(item.text)}</Text>
    );
  };

  const goNextStep = () => {
    if (selDate0.year || selDate1.year || selDate2.year) {
      const selectTime = [selDate0, selDate1, selDate2];
      const _groups: { [key: string]: any } = {};
      selectTime.forEach((date: SEL_DATE) => {
        if (date.year) {
          const groupKey = `${date.year}`;
          if (!_groups[groupKey]) {
            _groups[groupKey] = { dates: [] };
          }
          _groups[groupKey].dates.push(date);
        }
      });
      if (contactMobile) {
        SetEditContactEnable(true);
      }
      setDateGroups(_groups);
      setMode(APPT_MODE.DETAIL);
      transfromYFullAnim();
      transfromHeightInAnim();
    }
  };

  const changeContactMobile = (val: string) => {
    const validate: RegExp = /^[0-9_\-#*]{7,12}$/;
    setInpState(validate.test(val) && FIELD_STATE.FOCUS || FIELD_STATE.WARN);
    setContactMobileHelpTxt(!validate.test(val) && I18n.t('dating-contact-mobile-invalid') || '');
    setContactMobile(val);
  };

  const switchTag = (index: number) => {
    if (activeTagIndex !== index && availables.length > 0) {
      const [dayInfo] = scope[parseInt(selectedYearKeyVal)][parseInt(selectedMonthKeyVal)].filter((dataInfo) => dataInfo.day === parseInt(selectedDayKeyVal));
      switch (activeTagIndex) {
        case 0:
          setSelDate0({ day: selectedDayKeyVal, year: selectedYearKeyVal, month: selectedMonthKeyVal, available: selectedAvailableKeyVal, weekday: dayInfo.weekday });
          break;
        case 1:
          setSelDate1({ day: selectedDayKeyVal, year: selectedYearKeyVal, month: selectedMonthKeyVal, available: selectedAvailableKeyVal, weekday: dayInfo.weekday });
          break;
        case 2:
          setSelDate2({ day: selectedDayKeyVal, year: selectedYearKeyVal, month: selectedMonthKeyVal, available: selectedAvailableKeyVal, weekday: dayInfo.weekday });
          break;
      }
      const _availables = availables.filter((item: dateItem) => item.key !== selectedAvailableKeyVal);
      setAvailables(_availables);
      if (_availables.length > 0) {
        initialSelected('day', { availables: _availables });
      }
    }
    setActiveTagIndex(index);
  };

  return <View
    style={[Styles.popoverCon, {
      display: showVal && 'flex' || 'none',
    }]}
  >
    <TouchableOpacity
      style={Styles.bgCon}
      onPress={goClose}
    />
    <Animated.View style={[Styles.mainCon, {
      top: transfromYAnim,
      height: transformHeightAnim,
      overflow: 'scroll',
    }]}>
      <View style={[Styles.headerCon, {
        borderBottomLeftRadius: mode === APPT_MODE.DETAIL && 16 || 0,
        borderBottomRightRadius: mode === APPT_MODE.DETAIL && 16 || 0,
      }]}>
        <View style={Styles.headerLeftArea}>
          {mode === APPT_MODE.SELECTOR && <Text style={Styles.headerTitle}>{headerTitle}</Text>
            || <View style={Styles.titleCon}>
              {detailTitleIcon && <Icon name={detailTitleIcon} size={22} color='rgba(35, 178, 190, 1)' style={Styles.titleConIcon} /> || <></>}
              <Text style={[Styles.titleConTxt, {
                color: detailTitleIcon && 'rgba(35, 178, 190, 1)' || 'rgba(0, 0, 0, 0.87)',
              }]}>{detailTitle}</Text>
            </View>}
          <Text style={Styles.headerHopticalName}>{orgInfo.name || ''}</Text>
          <Text style={Styles.headerDesc}>{headerDesc}</Text>
        </View>
        <TouchableOpacity onPress={goClose}>
          <Icon name='ic_cancel_24px' size={24} color='rgba(152, 154, 156, 1)' />
        </TouchableOpacity>
      </View>
      {mode === APPT_MODE.SELECTOR && <View style={Styles.mainContentCon}>
        <View style={Styles.mainSelectionTagsCon}>
          <TouchableOpacity style={[Styles.tagCon, {
            backgroundColor: activeTagIndex === 0 && 'rgba(35, 178, 190, 1)' || 'rgba(0,0,0,.12)',
          }]}
            onPress={() => switchTag(0)}>
            <Text style={[Styles.tagDate, {
              color: activeTagIndex === 0 && 'rgba(255,255,255,1)' || 'rgba(0,0,0,.54)'
            }]}>{selDate0.day && `${selDate0.month}/${selDate0.day}` || I18n.t('dating-tab-first-date')} {formatterAvailable(selDate0.available)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[Styles.tagCon, {
            backgroundColor: activeTagIndex === 1 && 'rgba(35, 178, 190, 1)' || 'rgba(0,0,0,.12)',
          }]} onPress={() => switchTag(1)}>
            <Text style={[Styles.tagDate, {
              color: activeTagIndex === 1 && 'rgba(255,255,255,1)' || 'rgba(0,0,0,.54)'
            }]}>{selDate1.day && `${selDate1.month}/${selDate1.day}` || I18n.t('dating-tab-second-date')} {formatterAvailable(selDate1.available)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[Styles.tagCon, {
            backgroundColor: activeTagIndex === 2 && 'rgba(35, 178, 190, 1)' || 'rgba(0,0,0,.12)',
          }]} onPress={() => switchTag(2)}>
            <Text style={[Styles.tagDate, {
              color: activeTagIndex === 2 && 'rgba(255,255,255,1)' || 'rgba(0,0,0,.54)'
            }]}>{selDate2.day && `${selDate2.month}/${selDate2.day}` || I18n.t('dating-tab-third-date')} {formatterAvailable(selDate2.available)}</Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.datePickerListCon} onTouchEnd={() => {
          if (scrollYearPosition % 50 !== 0) {
            setTimeout(() => _yearList.scrollToIndex({ index: selectedYearIndex }), 100);
          }
          if (scrollMonthPosition % 50 !== 0) {
            setTimeout(() => _monthList.scrollToIndex({ index: selectedMonthIndex }), 100);
          }
          if (scrollDayPosition % 50 !== 0) {
            setTimeout(() => _dayList.scrollToIndex({ index: selectedDayIndex }), 100);
          }
          if (scrollAvailablePosition % 50 !== 0) {
            setTimeout(() => _availableList.scrollToIndex({ index: selectedAvailableIndex }), 100);
          }
        }}>
          <FlatList
            ref={(flatList) => {
              if (flatList) {
                _yearList = flatList;
              }
              const reObj = _yearList; return reObj;
            }}
            style={Styles.optionList}
            getItemLayout={(data, index) => (
              { length: 50, offset: 50 * index, index }
            )}
            onScroll={(event) => {
              const Y = event.nativeEvent.contentOffset.y;
              const index = Math.round(Y / 50);
              setScrollYearPosition(Y);
              setSelectedYearIndex(index);
              years[index] && setSelectedYearKeyVal(years[index].key);
            }}
            data={[...defBefore, ...years, ...defAfter]}
            renderItem={renderYearItem}
          />
          <FlatList
            ref={(flatList) => {
              if (flatList) {
                _monthList = flatList;
              }
              const reObj = _monthList; return reObj;
            }}
            style={Styles.optionList}
            getItemLayout={(data, index) => (
              { length: 50, offset: 50 * index, index }
            )}
            onScroll={(event) => {
              const Y = event.nativeEvent.contentOffset.y;
              const index = Math.round(Y / 50);
              setScrollMonthPosition(Y);
              setSelectedMonthIndex(index);
              months[index] && setSelectedMonthKeyVal(months[index].key);
            }}
            data={[...defBefore, ...months, ...defAfter]}
            renderItem={renderMonthItem}
          />
          <FlatList
            ref={(flatList) => {
              if (flatList) {
                _dayList = flatList;
              }
              const reObj = _dayList; return reObj;
            }}
            style={Styles.optionList}
            getItemLayout={(data, index) => (
              { length: 50, offset: 50 * index, index }
            )}
            onScroll={(event) => {
              const Y = event.nativeEvent.contentOffset.y;
              const index = Math.round(Y / 50);
              setScrollDayPosition(Y);
              setSelectedDayIndex(index);
              days[index] && setSelectedDayKeyVal(days[index].key);
            }}
            data={[...defBefore, ...days, ...defAfter]}
            renderItem={renderDayItem}
          />
          <FlatList
            ref={(flatList) => {
              if (flatList) {
                _availableList = flatList;
              }
              const reObj = _availableList; return reObj;
            }}
            style={Styles.optionList}
            getItemLayout={(data, index) => (
              { length: 50, offset: 50 * index, index }
            )}
            onScroll={(event) => {
              const Y = event.nativeEvent.contentOffset.y;
              const index = Math.round(Y / 50);
              setScrollAvailablePosition(Y);
              setSelectedAvailableIndex(index);
              availables[index] && setSelectedAvailableKeyVal(availables[index].key);
            }}
            ListEmptyComponent={() => (<Text style={Styles.emptyMessageStyle}>{I18n.t('dating-no-data-txt')}</Text>)}
            data={availables.length > 0 && [...defBefore, ...availables, ...defAfter] || []}
            renderItem={renderAvailablesItem}
          />
          <LinearGradient
            pointerEvents='none'
            colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
            style={Styles.mask} />
        </View>
        <TouchableOpacity style={[Styles.nextBtn, {
          backgroundColor: (!selDate0.day && !selDate1.day && !selDate2.day) && 'rgba(0, 0, 0, .12)' || 'rgba(35, 178, 190, 1)'
        }]} onPress={goNextStep}>
          <Text style={[Styles.nextBtnTxt, {
            color: (!selDate0.day && !selDate1.day && !selDate2.day) && 'rgba(0, 0, 0, .26)' || 'rgba(255, 255, 255, 1)'
          }]}>{I18n.t('dating-btn-next')}</Text>
        </TouchableOpacity>
      </View> || <View style={Styles.detailCon}>
          <Animated.View style={Styles.patientInfoCard}>
            <View style={Styles.cardRow}>
              <Image source={require("../assets/images/def_user.png")} style={Styles.headerIMG} />
              <View style={[Styles.rightArea, {
                borderBottomColor: 'rgba(255, 255, 255, 0.16)',
                borderBottomWidth: editContactEnable && 1 || 0,
              }]}>
                <Text style={Styles.userName}>{patient.name}</Text>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginTop: 5,
                }}><Text style={Styles.tag}>{I18n.t('dating-label-ID')}{mobile || apptPatientInfo.mobile || curUserInfo?.mobile || ''}</Text></View>
              </View>
            </View>
            <View style={Styles.cardRow}>
              <Icon name='ic_call_24px' size={30} color='rgba(0, 0, 0, 0.26)' style={Styles.phoneCallIcon} />
              <View style={Styles.contactFieldCon}>
                <Field
                  inpValue={contactMobile}
                  hideBottomBorder={apptStatus === APPT_STATUS.CONFIRMED || apptStatus === APPT_STATUS.CONFIRMING}
                  state={inpState}
                  onChangeText={changeContactMobile}
                  label={I18n.t('dating-label-mobile')}
                  helpTxt={contactMobileHelpTxt}
                  showClearBtn={true}
                  keyBordType="number-pad"
                  theme={THEME.DARK}
                  showRightAction={true} />
              </View>
            </View>
            <View style={Styles.cardFooter}>
              {contactMode !== 'readonly' && <TouchableOpacity style={Styles.cancelBtn} onPress={() => {
                setContactMobile(mobile || apptPatientInfo.mobile || curUserInfo.mobile);
                setContactMode('readonly');
                setInpState(FIELD_STATE.DISABLED);
                setContactMobileHelpTxt('');
              }}>
                <Text style={Styles.cancelBtnTxt}>{I18n.t('dating-btn-cancel')}</Text>
              </TouchableOpacity> || <></>}
              {contactMode !== 'readonly' && <TouchableOpacity style={Styles.addBtn} onPress={() => {
                if (!contactMobileHelpTxt) {
                  setContactMode('readonly'); setInpState(FIELD_STATE.DISABLED);
                }
              }}>
                <Text style={[Styles.addBtnTxt, {
                  color: contactMobileHelpTxt && 'rgba(255, 255, 255, .3)' || 'rgba(24, 255, 255, 1)'
                }]}>{I18n.t('dating-btn-add')}</Text>
              </TouchableOpacity> || <></>}
              {contactMode === 'readonly' && apptStatus !== APPT_STATUS.CONFIRMED && apptStatus !== APPT_STATUS.CONFIRMING && <TouchableOpacity style={Styles.editBtn} onPress={() => { setContactMode('edit'); setInpState(FIELD_STATE.DEF) }}>
                <Icon name='ic_mode_edit_24px' size={22} color='rgba(255, 255, 255, 0.7)' />
              </TouchableOpacity> || <></>}
            </View>
          </Animated.View>
          <View style={Styles.baseInfoCon}>
            <Text style={Styles.baseInfoTitle}>{I18n.t('dating-detail-card-title')}</Text>
            <View style={Styles.baseInfoCard}>
              <View style={Styles.orgCon}>
                <Text style={Styles.OrgName}>{orgInfo.name}</Text>
                <Text style={Styles.OrgAddress}>{orgInfo.address}</Text>
              </View>
              <View style={Styles.selectorTimeCon}>
                {renderGroups()}
                {(!examMap[examID].status || examMap[examID].status === APPT_STATUS.EXPIRED) && <View style={Styles.actions}>
                  <TouchableOpacity style={Styles.changeTimeBtn} onPress={() => {
                    setMode(APPT_MODE.SELECTOR);
                    transfromYInAnim();
                    transfromHeightOutAnim();
                  }}>
                    <Text style={Styles.changeTimeBtnTxt}>{I18n.t('dating-detail-card-btn')}</Text>
                  </TouchableOpacity>
                </View> || <></>}
              </View>
            </View>
          </View>
          {finalBtnTxt && <TouchableOpacity style={[Styles.finalActionBtn, {
            backgroundColor: contactMobileHelpTxt && 'rgba(0, 0, 0, .12)' || 'rgba(35, 178, 190, 1)'
          }]} onPress={cmpltAPPT}>
            <Text style={[Styles.finalActionBtnTxt, {
              color: contactMobileHelpTxt && 'rgba(0, 0, 0, .26)' || 'rgba(255, 255, 255, 1)'
            }]}>{finalBtnTxt}</Text>
          </TouchableOpacity> || <></>}
        </View>}
    </Animated.View>
    <MessageBox
      title={I18n.t('dating-cancel-message-box-title')}
      desc={I18n.t('dating-cancel-message-box-desc')}
      okBtnTxt={I18n.t('dating-btn-quit')}
      cancelBtnTxt={I18n.t('dating-btn-cancel')}
      onCloseFn={() => setShowMessageBox(false)}
      okBtnClickFn={onClose}
      show={showMessageBox}
    />
  </View >
};

export default Appointment;