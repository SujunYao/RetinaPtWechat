import React, { useRef, useState, useEffect } from 'react';
import { FlatList, View, Text, Animated, Easing } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

import Colors from '../constants/Colors';
import Icon from './Icons';
import I18n from '../i18n/i18n';
import Styles from '../constants/DatePicker';

interface dateItem {
  key: number,
  text: string,
}

interface Props {
  label?: string,
  show?: boolean,
  date: string,
  selectedKey?: string,
  closeFn?: Function,
  finishSelector?: Function,
}

const defDate = {
  year: 1970,
  month: 1,
  day: 1
};

const Months = [{
  key: 1,
  text: I18n.t('sel-date-month-jan')
}, {
  key: 2,
  text: I18n.t('sel-date-month-feb')
}, {
  key: 3,
  text: I18n.t('sel-date-month-mar')
}, {
  key: 4,
  text: I18n.t('sel-date-month-apr')
}, {
  key: 5,
  text: I18n.t('sel-date-month-may')
}, {
  key: 6,
  text: I18n.t('sel-date-month-jun')
}, {
  key: 7,
  text: I18n.t('sel-date-month-jly')
}, {
  key: 8,
  text: I18n.t('sel-date-month-aug')
}, {
  key: 9,
  text: I18n.t('sel-date-month-sep')
}, {
  key: 10,
  text: I18n.t('sel-date-month-oct')
}, {
  key: 11,
  text: I18n.t('sel-date-month-nov')
}, {
  key: 12,
  text: I18n.t('sel-date-month-dec')
}];

let _yearList: FlatList<dateItem>, _monthList: FlatList<dateItem>, _dayList: FlatList<dateItem>;

const DatePicker: React.FC<Props> = ({
  label,
  show,
  date,
  selectedKey,
  closeFn,
  finishSelector
}) => {
  const [showVal, setShowVal] = useState(show);
  const [selectedYear, setSelectedYear] = useState(defDate.year);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [yearScrollPos, setYearScrollPos] = useState(0);
  const [yearScrollIndex, setYearScrollIndex] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(defDate.month);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const [monthScrollPos, setMonthScrollPos] = useState(0);
  const [monthScrollIndex, setMonthScrollIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState(defDate.day);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [dayScrollPos, setDayScrollPos] = useState(0);
  const [dayScrollIndex, setDayScrollIndex] = useState(0);
  const defDateArray: Array<dateItem> = [];
  const [years, setYears] = useState(defDateArray);
  const [days, setDays] = useState(defDateArray);

  const DefEmptyData = [{ key: -1, text: '' }, { key: -2, text: '' }];
  const DefEmptyEndData = [{ key: -3, text: '' }, { key: -4, text: '' }];

  const generateYears = (curYear: number): Array<dateItem> => {
    const arr: Array<dateItem> = [];
    for (let i = curYear - 100; i < curYear + 10; i++) {
      arr.push({
        key: i,
        text: `${i}${I18n.t('dating-dates-year-txt')}`,
      });
    }
    return arr;
  }

  const generateDays = (curMonth: number, curYear: number): Array<dateItem> => {
    const months30 = [4, 6, 9, 11];        // the months which has 30 days
    const leapYear = curYear % 4 === 0;    // whether leap year?
    let maxDay = curMonth === 2 ? (leapYear ? 29 : 28) : (months30.includes(curMonth) ? 30 : 31);
    const arr: Array<dateItem> = [];
    for (let i = 1; i <= maxDay; i++) {
      arr.push({
        key: i,
        text: I18n.t('sel-date-day').replace('${day}', `${i}`)
      });
    }
    return arr;
  };

  useEffect(() => {
    const dateVal = new Date(date || `${defDate.year}-${`${defDate.month}`.padStart(2, '0')}-${`${defDate.day}`.padStart(2, '0')}`);
    const selectedYear = dateVal.getFullYear();
    const selectedMonth = dateVal.getMonth() + 1;
    const selectedDay = dateVal.getDate();
    setSelectedYear(selectedYear);
    setSelectedYearIndex(98);
    setSelectedMonth(selectedMonth);
    setSelectedMonthIndex(selectedMonth - 1);
    setSelectedDay(selectedDay);
    setSelectedDayIndex(selectedDay - 1);
    setYears(generateYears(selectedYear));
    setDays(generateDays(selectedMonth, selectedYear))
  }, [date]);

  useEffect(() => setShowVal(show || false), [show]);

  useEffect(() => {
    if (showVal) {
      transfromYInAnim();
      if (date) {
        const dateVal = new Date(date || `${defDate.year}-${`${defDate.month}`.padStart(2, '0')}-${`${defDate.day}`.padStart(2, '0')}`);
        const selectedYear = dateVal.getFullYear();
        const selectedMonth = dateVal.getMonth() + 1;
        const selectedDay = dateVal.getDate();
        if (years && years.length > 0) {
          years.some((year, index) => {
            if (year.key === selectedYear) {
              _yearList.scrollToIndex({ animated: false, index: index - 2 });
              return true;
            }
          })
        }
        [...DefEmptyData, ...Months, ...DefEmptyEndData].some((month, index) => {
          if (month.key === selectedMonth) {
            _monthList.scrollToIndex({ index: index - 2 });
            return true;
          }
        })
        if (days && days.length > 0) {
          [...DefEmptyData, ...days, ...DefEmptyEndData].some((day, index) => {
            if (day.key === selectedDay) {
              _dayList.scrollToIndex({ index: index - 2 });
              return true;
            }
          })
        }
      }
    } else {
      transfromYOutAnim();
    }
  }, [showVal, date]);

  useEffect(() => {
    const dateVal = new Date(date);
    const tgtM = dateVal.getMonth() + 1;
    setDays(generateDays(selectedMonth, selectedYear));
    setSelectedDay(tgtM !== selectedMonth && 1 || dateVal.getDate());
    const tgtIndex = tgtM !== selectedMonth && 0 || (dateVal.getDate() > 1 && (dateVal.getDate() - 1) || 0 )
    setSelectedDayIndex(tgtIndex);
    if (tgtM !== selectedMonth) {
      setDayScrollPos(0);
      setDayScrollIndex(0);
      _dayList.scrollToIndex({ index: 0, animated: false });
    }else{
      _dayList.scrollToIndex({ index: tgtIndex, animated: false });
    }
  }, [selectedMonth, date])

  const closeDatePicker = () => {
    transfromYOutAnim();
    if (closeFn && typeof closeFn === 'function') {
      closeFn();
    } else {
      setShowVal(false);
    }
    const dateVal = new Date(date);
    const selYear = dateVal.getFullYear();
    const selMonth = dateVal.getMonth() + 1;
    const selDay = dateVal.getDate();
    if (selectedYear !== selYear) {
      setSelectedYear(selYear);
      const [tgtYear] = years.filter((yearInfo: dateItem) => yearInfo.key === selYear);
      const yearIndex = years.indexOf(tgtYear);
      setSelectedYearIndex(yearIndex);
      _yearList.scrollToIndex({ animated: false, index: yearIndex - 2 });
    }
    if (selectedMonth !== selMonth) {
      setSelectedMonth(selMonth);
      setSelectedMonthIndex(selMonth - 1);
      _monthList.scrollToIndex({ animated: false, index: selMonth - 1 });
    }
    if (selectedDay !== selDay) {
      setSelectedDay(selDay);
      setSelectedDayIndex(selDay - 1);
      _dayList.scrollToIndex({ animated: false, index: selDay - 1 });
    }

  };

  /**
  * The animation show when switch the field state between default and focus
  * @Sujun
  * **/
  const transfromYAnim = useRef(new Animated.Value(-246)).current;
  const transfromYInAnim = () => {
    Animated.timing(transfromYAnim, {
      toValue: 0,
      duration: 400,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };
  const transfromYOutAnim = () => {
    Animated.timing(transfromYAnim, {
      toValue: -246,
      duration: 400,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({ item }: { item: dateItem }) => {
    return (
      <Text style={Styles.optionItem} key={item.key}>{item.text}</Text>
    );
  };


  return <View style={[Styles.popoverCon, {
    display: showVal && 'flex' || 'none',
  }]}>
    <Animated.View style={[Styles.mainCon, {
      bottom: transfromYAnim
    }]}>
      <View style={Styles.header}>
        <Text
          style={Styles.cancelBtn}
          onPress={closeDatePicker}
        >
          {I18n.t('sel-header-cancel')}
        </Text>
        <Text style={Styles.title}>{label || ''}</Text>
        <Text
          onPress={() => {
            if (finishSelector && typeof finishSelector === 'function') {
              finishSelector(`${selectedYear}-${`${selectedMonth}`.padStart(2, '0')}-${`${selectedDay}`.padStart(2, '0')}`);
            }
            transfromYOutAnim();
            if (closeFn && typeof closeFn === 'function') {
              closeFn();
            } else {
              setShowVal(false);
            }
          }}
          style={Styles.confirmBtn}
        >
          {I18n.t('sel-header-confirm')}
        </Text>
      </View>
      <View style={Styles.listCon} onTouchEnd={() => {
        if (yearScrollPos % 40 !== 0) {
          setTimeout(() => _yearList.scrollToIndex({ index: yearScrollIndex }), 100);
        }
        if (monthScrollPos % 40 !== 0) {
          setTimeout(() => _monthList.scrollToIndex({ index: monthScrollIndex }), 100);
        }
        if (dayScrollPos % 40 !== 0) {
          setTimeout(() => _dayList.scrollToIndex({ index: dayScrollIndex }), 100);
        }
      }}>
        <FlatList
          ref={(flatList) => {
            if (flatList) {
              _yearList = flatList;
            }
            const reObj = _yearList;
            return reObj;
          }}
          style={{ zIndex: 16, width: '33%' }}
          data={years}
          renderItem={renderItem}
          getItemLayout={(data, index) => (
            { length: 40, offset: 40 * index, index }
          )}
          onEndReached={() => {
            let { key: year } = years.slice(-1).pop() || {};
            if (year && year >= 0) {
              const newYears = [...years];
              for (let i = 10; i > 0; i--) {
                year++;
                newYears.push({
                  key: year,
                  text: `${year}${I18n.t('dating-dates-year-txt')}`,
                });
                setYears(newYears);
              }
            }
          }}
          onEndReachedThreshold={3}
          onScroll={(event) => {
            const Y = event.nativeEvent.contentOffset.y;
            const index = Math.round(Y / 40);
            setYearScrollPos(Y);
            years[index + 2] && setSelectedYear(years[index + 2].key);
            setYearScrollIndex(index);
          }}
          initialScrollIndex={selectedYearIndex}
          keyExtractor={(item) => `${item.key}`}
        />
        <FlatList
          ref={(flatList) => {
            if (flatList) {
              _monthList = flatList;
            }
            const reObj = _monthList;
            return reObj;
          }}
          style={{ zIndex: 16, width: '33%' }}
          data={[...DefEmptyData, ...Months, ...DefEmptyEndData]}
          getItemLayout={(data, index) => (
            { length: 40, offset: 40 * index, index }
          )}
          onScroll={(event) => {
            const Y = event.nativeEvent.contentOffset.y;
            const index = Math.round(Y / 40);
            setMonthScrollPos(Y);
            setMonthScrollIndex(index);
            Months[index] && setSelectedMonth(Months[index].key);
          }}
          initialScrollIndex={selectedMonthIndex}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.key}`}
        />
        <FlatList
          ref={(flatList) => {
            if (flatList) {
              _dayList = flatList;
            }
            const reObj = _dayList;
            return reObj;
          }}
          style={{ zIndex: 16, width: '34%' }}
          getItemLayout={(data, index) => (
            { length: 40, offset: 40 * index, index }
          )}
          data={[...DefEmptyData, ...days, ...DefEmptyEndData]}
          renderItem={renderItem}
          onScroll={(event) => {
            const Y = event.nativeEvent.contentOffset.y;
            const index = Math.round(Y / 40);
            setDayScrollPos(Y);
            setDayScrollIndex(index);
            days[index] && setSelectedDay(days[index].key);
          }}
          initialScrollIndex={selectedDayIndex}
          keyExtractor={(item) => `${item.key}`}
        />
        <LinearGradient
          pointerEvents='none'
          colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
          style={Styles.mask} />
        <View pointerEvents='none' style={Styles.lineCon} />
      </View>
    </Animated.View>
  </View>
};

export default DatePicker;