import React, { useRef, useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, View, Text, Animated, Easing } from 'react-native';

import { FIELD_STATE, THEME } from '../store/enum';
import Colors from '../constants/Colors';
import Icon from '../components/Icons';
import Styles from '../constants/Field';



type KEY_BOARD_TYPE = "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "name-phone-pad" | "twitter" | "web-search" | undefined;

enum DARK {
  DEF = 'rgba(255, 255, 255, .7)',
  DISABLE = 'rgba(255, 255, 255, .3)',
  INPDISABLE = 'rgba(255, 255, 255, .3)',
  BORDER = 'rgba(255, 255, 255, .54)',
  BORDER_DIS = 'rgba(255, 255, 255, .16)',
  FOCUS = 'rgba(24, 255, 255, 1)',
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
  FOCUS = 'rgba(35, 178, 190, 1)',
  WARN = 'rgba(255, 171, 64, 1)',
  INP = 'rgba(0, 0, 0, .87)',
  HELP_TXT = 'rgba(0, 0, 0, .54)'
}

interface Props {
  label: string,
  onChangeText?: Function,
  clickRightAction?: Function,
  state?: FIELD_STATE,
  ref?: React.MutableRefObject<any>,
  showRightAction?: boolean,
  showClearBtn?: boolean,
  helpTxt?: string,
  actionIcon?: string,
  keyBordType?: KEY_BOARD_TYPE,
  theme?: THEME,
  secureTextEntry?: boolean,
  inpValue: string,
  required?: boolean,
  fitContent?: boolean,
  hideBottomBorder?: boolean,
}

enum AREAS {
  LABEL = 'label',
  INP = 'inp',
  HELP_TXT = 'helpTxt',
  RIGHT_ACTION = 'RigthAction'
}

const Field: React.FC<Props> = ({
  label,
  onChangeText,
  state,
  clickRightAction,
  showRightAction = false,
  secureTextEntry = false,
  showClearBtn = false,
  keyBordType,
  actionIcon,
  helpTxt,
  required,
  fitContent,
  hideBottomBorder = false,
  inpValue,
  theme = THEME.LIGHT,
}) => {
  const colors = theme === THEME.LIGHT && LIGTH || DARK;

  const [inpFocus, setInpFocus] = useState(false);
  const [labelFocus, setLabelFocus] = useState(false);
  const [rigthActionFocus, setRigthActionFocus] = useState(false);
  const [helpTxtFocus, setHelpTxtFocus] = useState(false);

  const [inpVal, setInpVal] = useState(inpValue);
  const [helpTxtVal, setHelpTxtVal] = useState(helpTxt || '');
  const [inpState, setInpState] = useState(FIELD_STATE.DEF);

  useEffect(() => setInpState(state || FIELD_STATE.DEF), [state]);

  useEffect(() => {
    if (helpTxt !== helpTxtVal) {
      setHelpTxtVal(helpTxt || '')
    }
  }, [helpTxt]);

  useEffect(() => {
    setInpVal(inpValue);
    if (inpValue) {
      transfromYInAnim();
    } else {
      transfromYOutAnim();
    }
  }, [inpValue]);

  /***
   * Event handlers
   * @Sujun
   * **/
  const inpValChange = (val: string) => {
    if (typeof onChangeText === 'function') {
      onChangeText(val);
    } else {
      setInpVal(val);
    }
  };

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

  const transfromXAnim = useRef(new Animated.Value(0)).current;
  const transfromXInAnim = () => {
    Animated.timing(transfromXAnim, {
      toValue: 1,
      duration: 200,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };
  const transfromXOutAnim = () => {
    Animated.timing(transfromXAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
    }).start();
  };

  /**
   * format functions
   * @Sujun
   * ***/
  const calcFocus = (area: AREAS, tgtFocusVal: boolean, clearValTrigger?: boolean) => {
    let res = false;
    switch (area) {
      case AREAS.INP:
        setInpFocus(tgtFocusVal);
        if (tgtFocusVal || labelFocus || rigthActionFocus || helpTxtFocus) {
          res = true;
        }
        break;
      case AREAS.LABEL:
        setLabelFocus(tgtFocusVal);
        if (inpFocus || tgtFocusVal || rigthActionFocus || helpTxtFocus) {
          res = true;
        }
        break;
      case AREAS.RIGHT_ACTION:
        setRigthActionFocus(tgtFocusVal);
        if (inpFocus || labelFocus || tgtFocusVal || helpTxtFocus) {
          res = true;
        }
        break;
      case AREAS.HELP_TXT:
        setHelpTxtFocus(tgtFocusVal);
        if (inpFocus || labelFocus || rigthActionFocus || tgtFocusVal) {
          res = true;
        }
        break;
    }
    if (res && inpState !== FIELD_STATE.FOCUS && inpState !== FIELD_STATE.DISABLED) {
      if (!inpVal) {
        transfromYInAnim();
      }
      transfromXInAnim();
      if (inpState !== FIELD_STATE.WARN) {
        setInpState(FIELD_STATE.FOCUS);
      }
    }
    if (!res && inpState === FIELD_STATE.FOCUS) {
      if (!inpVal || clearValTrigger) {
        transfromYOutAnim();
      }
      transfromXOutAnim();
      setInpState(FIELD_STATE.DEF);
    }
  };

  return <View style={[Styles.fieldCon, {
    width: fitContent && '100%' || 'calc(100% - 32px)',
    marginTop: fitContent ? 0 : 6,
    marginBottom: fitContent ? 0 : 6
  }]}>
    <Animated.View style={{
      top: transfromYAnim,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      position: 'absolute',
    }} >
      <Text style={[Styles.label, {
        fontSize: inpState === FIELD_STATE.FOCUS && 12 || ((inpVal || inpValue) && 12 || 16),
        color: inpState === FIELD_STATE.FOCUS && colors.FOCUS
          || (inpState === FIELD_STATE.DISABLED && colors.DISABLE)
          || (inpState === FIELD_STATE.WARN && colors.WARN)
          || colors.DEF
      }]}>{label || ''}</Text>
      {required && <Text style={[Styles.required, {
        color: inpState === FIELD_STATE.DISABLED && colors.DISABLE || colors.WARN
      }]}>*</Text> || <></>}
    </Animated.View>
    <TextInput
      secureTextEntry={secureTextEntry || false}
      style={[Styles.mainInp, {
        color: inpState === FIELD_STATE.DISABLED && colors.INPDISABLE || colors.INP,
        borderBottomColor: colors.BORDER,
        paddingRight: showRightAction && 22 || 0,
        borderBottomWidth: (hideBottomBorder || inpState === FIELD_STATE.DISABLED) ? 0 : 1,
      }]}
      editable={inpState !== FIELD_STATE.DISABLED}
      autoCapitalize='none'
      value={inpVal}
      underlineColorAndroid='transparent'
      keyboardType={keyBordType || 'default'}
      onChangeText={text => inpValChange(text)}
      onFocus={() => calcFocus(AREAS.INP, true)}
      onBlur={() => calcFocus(AREAS.INP, false)}
    />
    <Animated.View style={[Styles.borderBottom, {
      transform: [{ scaleX: transfromXAnim }],
      borderBottomColor: inpState === FIELD_STATE.FOCUS && colors.FOCUS || (inpState === FIELD_STATE.WARN && colors.WARN) || (inpState === FIELD_STATE.DISABLED && colors.BORDER_DIS) || colors.BORDER
    }]} ></Animated.View>
    <Text style={[Styles.helpTxtCon, {
      color: (inpState === FIELD_STATE.WARN && colors.WARN) || colors.HELP_TXT
    }]}>{helpTxtVal}</Text>
    {showRightAction && <TouchableOpacity
      style={[Styles.rightAction, {
        opacity: inpState === FIELD_STATE.FOCUS && inpVal && 1 || 0,
      }]}
      onFocus={() => calcFocus(AREAS.RIGHT_ACTION, true)}
      onBlur={() => calcFocus(AREAS.RIGHT_ACTION, false)}
      onPress={() => {
        if (clickRightAction) {
          clickRightAction();
        } else if (showClearBtn) {
          inpValChange('');
          calcFocus(AREAS.RIGHT_ACTION, false, true);
        }
      }}
    >
      <Icon name={showClearBtn && 'ic_close_24px' || actionIcon || ''} size={20} color={colors.INP} />
    </TouchableOpacity>
      || <></>
    }
  </View>
};

export default Field;