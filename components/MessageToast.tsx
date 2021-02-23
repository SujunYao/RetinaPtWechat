import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Text, Animated, Easing } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { REQ_STATUS} from '../store/enum';
import Colors from '../constants/Colors';
import Icon from '../components/Icons';
import I18n from '../i18n/i18n';
import Styles from '../constants/MessageToast';
import { ROOT_STATE } from '../store/interface';
import { showMSGToast } from '../store/system/actions';
import { cancelDelete } from '../store/appt/actions';

interface Props {
  refreshFn?: Function,
}


const MessageToast: React.FC<Props> = ({
  refreshFn
}) => {

  const { toast: { showToast, msg, hideActionBtn } } = useSelector((state: ROOT_STATE) => state.system);
  const { removingID, removingStatus, reqCancelRemove } = useSelector((state: ROOT_STATE) => state.appt);
  const dispatch = useDispatch();

  /**
  * The animation show when switch the field state between default and focus
  * @Sujun
  * **/
  const transfromYAnim = useRef(new Animated.Value(-48)).current;
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
      toValue: -48,
      duration: 400,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };

  useEffect(()=>{
    if(reqCancelRemove === REQ_STATUS.SUCCESSED){
      if(refreshFn && typeof refreshFn === 'function'){
        refreshFn();
      }
      dispatch(showMSGToast({ show: false }));
    }
  }, [reqCancelRemove]);

  useEffect(() => {
    if (showToast) {
      transfromYInAnim();
      setTimeout(() => dispatch(showMSGToast({ show: false })), 8000);
    } else {
      transfromYOutAnim();
    }
  }, [showToast])

  return <Animated.View
    style={[Styles.con, {
      bottom: transfromYAnim,
    }]}
  >
    <Text style={Styles.msg}>{msg}</Text>
    {!hideActionBtn && <TouchableOpacity style={Styles.actionCon} onPress={() => {
      dispatch(cancelDelete({ id: removingID, status: removingStatus }));
    }}>
      <Icon name='ic_undo_24px' size={10} color='rgba(24, 255, 255, 1)' style={Styles.undoIcon} />
      <Text style={Styles.undoTxt}>{I18n.t('dating-msg-toast-btn')}</Text>
    </TouchableOpacity> || <></>}
  </Animated.View >
};

export default MessageToast;