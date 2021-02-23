import React, { useRef, useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, View, Text, Animated, Easing } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { FIELD_STATE, THEME } from '../store/enum';
import Colors from '../constants/Colors';
import Icon from '../components/Icons';
import I18n from '../i18n/i18n';
import Styles from '../constants/MessageBox';
import { ROOT_STATE } from '../store/interface';

interface Props {
  show?: boolean,
  title?: string,
  desc?: string,
  onCloseFn?: Function,
  okBtnClickFn?: Function
  cancelBtnClickFn?: Function,
  closeBtnTxt?: string,
  okBtnTxt?: string,
  cancelBtnTxt?: string,
  hideCancelBtn?: boolean,
}


const MessageBox: React.FC<Props> = ({
  show = false,
  title,
  desc,
  okBtnClickFn,
  cancelBtnClickFn,
  onCloseFn,
  okBtnTxt,
  cancelBtnTxt,
  hideCancelBtn = false,
}) => {

  const { toast: { showToast, msg, hideActionBtn } } = useSelector((state: ROOT_STATE) => state.system);
  const { removingID, removingStatus } = useSelector((state: ROOT_STATE) => state.appt);

  const [showVal, setShowVal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setShowVal(show);
    if (show) {
      transfromInAnim();
    } else {
      transfromOutAnim();
    }
  }, [show])

  /**
  * The animation show when switch the field state between default and focus
  * @Sujun
  * **/
  const transfromOptionAnim = useRef(new Animated.Value(0)).current;
  const transfromInAnim = () => {
    Animated.timing(transfromOptionAnim, {
      toValue: 1,
      duration: 400,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };
  const transfromOutAnim = () => {
    Animated.timing(transfromOptionAnim, {
      toValue: 0,
      duration: 400,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };

  const closeMessageBox = () => {
    if (onCloseFn && typeof onCloseFn === 'function') {
      onCloseFn();
    } else {
      transfromOutAnim();
      setShowVal(false);
    }
  };

  const clickOkBtn = () => {
    if (okBtnClickFn && typeof okBtnClickFn === 'function') {
      okBtnClickFn();
    }
    closeMessageBox();
  };
  const clickCancelBtn = () => {
    if (cancelBtnClickFn && typeof cancelBtnClickFn === 'function') {
      cancelBtnClickFn();
    }
    closeMessageBox();
  };

  return <View style={[Styles.curtain, {
    display: showVal && 'flex' || 'none',
  }]}>
    <Animated.View style={[Styles.cardCon, {
      opacity: transfromOptionAnim
    }]}>
      <Text style={Styles.title}>{title || ''}</Text>
      <Text style={Styles.desc}>{desc || ''}</Text>
      <View style={Styles.actionBar}>
        {!hideCancelBtn && <TouchableOpacity style={Styles.footerBtn} onPress={clickCancelBtn}>
          <Text style={Styles.btnTxt}>{cancelBtnTxt || I18n.t('sel-header-cancel')}</Text>
        </TouchableOpacity> || <></>}
        <TouchableOpacity style={Styles.footerBtn} onPress={clickOkBtn}>
          <Text style={Styles.OKBtnTxt}>{okBtnTxt || I18n.t('sel-header-confirm')}</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  </View>
};

export default MessageBox;