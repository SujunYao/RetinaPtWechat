import React, { useRef, useState, useEffect } from 'react';
import { TouchableOpacity, ScrollView, Modal, ViewStyle, TextInput, View, Text, Animated, Easing } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { FIELD_STATE, THEME } from '../store/enum';
import Colors from '../constants/Colors';
import Icon from '../components/Icons';
import I18n from '../i18n/i18n';
import Styles from '../constants/Selector';

interface Props {
  fitContent?: boolean,
  inpValue: string,
  theme?: THEME,
  required?: boolean,
  label?: string,
  editable?: boolean,
  onPress?: Function,
  helpTxt?: string,
  fieldState?: FIELD_STATE,
}

enum DARK {
  DEF = 'rgba(255, 255, 255, .7)',
  DISABLE = 'rgba(255, 255, 255, .3)',
  INPDISABLE = 'rgba(255, 255, 255, .3)',
  BORDER = 'rgba(255, 255, 255, .54)',
  BORDER_DIS = 'rgba(255, 255, 255, .16)',
  WARN = 'rgba(255, 171, 64, 1)',
  INP = 'rgba(255, 255, 255, 1)',
  HELP_TXT = 'rgba(255, 255, 255, .3)'
}

enum LIGTH {
  DEF = 'rgba(0, 0, 0, .54)',
  DISABLE = 'rgba(0, 0, 0, .38)',
  INPDISABLE = 'rgba(0, 0, 0, .87)',
  BORDER = 'rgba(0, 0, 0, .42)',
  BORDER_DIS = 'rgba(0, 0, 0, .38)',
  WARN = 'rgba(255, 171, 64, 1)',
  INP = 'rgba(0, 0, 0, .87)',
  HELP_TXT = 'rgba(0, 0, 0, .54)'
}

const Selector: React.FC<Props> = ({
  fitContent,
  inpValue,
  theme,
  required,
  label,
  fieldState = FIELD_STATE.DEF,
  editable = true,
  onPress,
  helpTxt
}) => {
  const colors = theme === THEME.LIGHT && LIGTH || DARK;
  const [inpVal, setInpVal] = useState(inpValue);
  const [helpTxtVal, setHelpTxtVal] = useState(helpTxt);
  const [inpState, setInpState] = useState(FIELD_STATE.DEF);

  useEffect(() => {
    setInpVal(inpValue)
    if (!editable) {
      setInpState(FIELD_STATE.DISABLED);
    } else {
      setInpState(fieldState);
    }
    if (inpValue) {
      transfromYInAnim();
    }
  }, [inpValue, editable, fieldState]);

  /**
   * The animation show when switch the field state between default and focus
   * @Sujun
   * **/
  const transfromYAnim = useRef(new Animated.Value(inpValue ? 0 : 22)).current;
  const transfromYInAnim = () => {
    Animated.timing(transfromYAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };
  const transfromYOutAnim = () => {
    Animated.timing(transfromYAnim, {
      toValue: 22,
      duration: 200,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };

  /***
  * Event handlers
  * @Sujun
  * **/
  const openOptionList = () => {
    if (onPress && typeof onPress === 'function' && editable) {
      onPress();
    }
  };


  return <View style={[Styles.selectorFieldCon, {
    width: fitContent && '100%' || 'calc(100% - 32px)',
    marginTop: fitContent ? 0 : 6,
    marginBottom: fitContent ? 0 : 6
  }]}
  >
    <TouchableOpacity
      style={Styles.activeArea}
      onPress={openOptionList}
    />
    <Animated.View style={{
      top: transfromYAnim,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      position: 'absolute',
    }} >
      <Text style={[Styles.label, {
        fontSize: (inpVal || inpValue) && 12 || 16,
        color: inpState === FIELD_STATE.DISABLED && colors.DISABLE
          || (inpState === FIELD_STATE.WARN && colors.WARN)
          || colors.DEF
      }]}>{label || ''}</Text>
      {required && <Text style={[Styles.required, {
        color: inpState === FIELD_STATE.DISABLED && colors.DISABLE
          || (inpState === FIELD_STATE.WARN && colors.WARN)
          || colors.WARN
      }]}>*</Text> || <></>}
    </Animated.View>
    <TextInput
      editable={false}
      style={[Styles.mainInp, {
        color: inpState === FIELD_STATE.DISABLED && colors.INPDISABLE || colors.INP,
        borderBottomColor: colors.BORDER,
        borderBottomWidth: inpState === FIELD_STATE.DISABLED ? 0 : 1,
      }]}
      value={inpVal}
      underlineColorAndroid='transparent'
    />
    <Text style={[Styles.helpTxtCon, {
      color: (inpState === FIELD_STATE.WARN && colors.WARN) || colors.HELP_TXT
    }]}>{inpState === FIELD_STATE.WARN && helpTxtVal || ''}</Text>
    <TouchableOpacity
      style={[Styles.rightAction, {
        opacity: 1,
      }]}
      onPress={() => {
      }}
    >
      {inpState !== FIELD_STATE.DISABLED && <Icon name='ic_arrow_drop_down_2' size={20} color={colors.DEF} /> || <></>}
    </TouchableOpacity>
  </View>
};

export default Selector;