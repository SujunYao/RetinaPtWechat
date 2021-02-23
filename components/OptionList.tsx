import React, { useRef, useState, useEffect } from 'react';
import { FlatList, View, Text, Animated, Easing } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

import Colors from '../constants/Colors';
import Icon from './Icons';
import I18n from '../i18n/i18n';
import Styles from '../constants/OptionList';

interface optionItem {
  [key: string]: any, text: string, key: any,
}

interface Props {
  label?: string,
  listData: Array<optionItem>,
  show?: boolean,
  selectedKey?: string,
  closeFn?: Function,
  finishSelector?: Function,
}



const OptionList: React.FC<Props> = ({
  label,
  listData,
  show,
  selectedKey,
  closeFn,
  finishSelector
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [showVal, setShowVal] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedKeyVal, setSelectedKeyVal] = useState(selectedKey || listData[0].key);
  const [initialScrollIndex, setInitialScrollIndex] = useState(0);
  const DefEmptyData = [{ key: "EMP_0", text: '' }, { key: "EMP_1", text: '' }];
  const DefEmptyEndData = [{ key: "EMP_END_0", text: '' }, { key: "EMP_END_1", text: '' }];

  let _optionList: any;

  useEffect(() => setShowVal(show || false), [show]);

  useEffect(() => {
    if (showVal) {
      transfromYInAnim();
      if (selectedKey) {
        const sumData = [...DefEmptyData, ...listData, ...DefEmptyEndData];
        sumData.filter((item, index) => {
          const key = typeof item.key === 'string' && item.key || item.key.toString();
          if (key === selectedKey) {
            _optionList.scrollToIndex({ index: index - 2 });
          }
        });
      }
    } else {
      transfromYOutAnim();
    }
  }, [showVal, selectedKey]);

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

  const renderItem = ({ item }: { item: optionItem }) => {
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
          onPress={() => {
            transfromYOutAnim();
            if (closeFn && typeof closeFn === 'function') {
              closeFn();
            } else {
              setShowVal(false);
            }

          }}>{
            I18n.t('sel-header-cancel')}
        </Text>
        <Text style={Styles.title}>{label || ''}</Text>
        <Text
          onPress={() => {
            if (finishSelector && typeof finishSelector === 'function') {
              finishSelector(selectedKeyVal);
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
        if (scrollPosition % 40 !== 0) {
          setTimeout(() => _optionList.scrollToIndex({ index: selectedIndex }), 100);
        }
      }}>
        <FlatList
          ref={(flatList) => {
            if (flatList) {
              _optionList = flatList;
            }
            const reObj = _optionList; return reObj;
          }}
          style={{ zIndex: 16 }}
          getItemLayout={(data, index) => (
            { length: 40, offset: 40 * index, index }
          )}
          onScroll={(event) => {
            const Y = event.nativeEvent.contentOffset.y;
            const index = Math.round(Y / 40);
            setScrollPosition(Y);
            setSelectedIndex(index);
            setSelectedKeyVal(listData[index]?.key || listData[0].key);
          }}
          initialScrollIndex={initialScrollIndex}
          data={[...DefEmptyData, ...listData, ...DefEmptyEndData]}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          extraData={selectedId}
        />
        <LinearGradient
          pointerEvents='none'
          colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
          style={Styles.mask} />
        <View pointerEvents='none' style={Styles.lineCon} />
      </View>
    </Animated.View>
  </View >;
};

export default OptionList;