import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation, useRoute, useNavigationState } from '@react-navigation/native';
import { createStackNavigator, HeaderStyleInterpolators, TransitionSpecs, TransitionPresets, StackCardInterpolationProps, StackCardInterpolatedStyle, CardStyleInterpolators } from '@react-navigation/stack';
import React, { memo, useEffect, useState } from 'react';
import Colors from '../constants/Colors';
import { Text, TouchableOpacity, ColorSchemeName, Easing } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Notfound from '../screens/NotFound';
import { RootStackParamList } from '../types';
import Icon from '../components/Icons';

import Home from './home';
import Login from '../screens/Login';
import SetPwd from '../screens/SetPwd';
import HealthRecord from '../screens/HealthRecord'
import RecordList from '../screens/RecordList';
import Report from '../screens/Report';
import ReSetPwd from '../screens/ReSetPwd';
import Info from '../screens/Info';

import { getHealthRecord } from '../store/user/actions';
import { fetchRecordList, fetchLastReprt } from '../store/report/actions';

import styles from '../constants/Shell';
import I18n from '../i18n/i18n';
import LinkingConfiguration from './LinkingConfiguration';

import { SystemState } from '../store/system/types';
import { getPID } from '../store/system/actions';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';
import Appointment from '../components/Appointment';
import { ROOT_STATE } from '../store/interface';
import { HEALTH_REC_VIEW_MDOE } from '../store/enum';

interface RootState {
  system: SystemState
}

enum ROUTE_PATH_NAME {
  REPORT = 'report',
  HOME = 'home',
  LIST = 'rec-list',
  RESETPWD = 'reRestPwd'
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

const config: TransitionSpec = {
  animation: 'timing',
  config: {
    duration: 300,
    easing: Easing.bezier(0.7, 0, 0, 0.8),
  }
};

/**
 * setting the transition for switching the routes
 * @Sujun
**/
const cardStyleInterpolatorFn = ({ current, next, inverted, layouts }: StackCardInterpolationProps): StackCardInterpolatedStyle => {
  return {
    cardStyle: {
      marginBottom: -20,
      transform: [
        {
          translateY: next && next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, layouts.screen.height],
          }) || current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.height, -20],
          })
        },
      ],
      opacity: next && next.progress.interpolate({
        inputRange: [0, .6, 1],
        outputRange: [0, 0, 1],
      }) || current.progress.interpolate({
        inputRange: [0, .6, 1],
        outputRange: [0, 0, 1],
      }),
    },
  };
};

// If you are not familiar with React Navigation, you can going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const defHeaderSetting = {
    headerStyle: styles.headerCon,
    headerTintColor: colorScheme && Colors[colorScheme].headerBg || '',
    headerTitleStyle: styles.headerTitle,
  };
  const { pid, openID, loggedIn, keepToken, lockRoute, routeName, routeParams, readonly, hasHealthRecord } = useSelector((state: ROOT_STATE) => state.system);
  const dispatch = useDispatch();
  const [showAppointment, setShowAppointment] = useState(false);

  useEffect(() => {
    if (openID && !pid) {
      dispatch(getPID(openID));
    }
  }, [pid, openID]);
  return (
    <>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme} >
        <Stack.Navigator
          initialRouteName={openID && !loggedIn && 'Login'
            || (openID && loggedIn && !lockRoute && 'Home')
            || (lockRoute && 'Report')
            || 'NotFound'}
          screenOptions={{
            animationEnabled: true,
            ...defHeaderSetting,
            gestureDirection: 'vertical-inverted',
            transitionSpec: {
              open: config,
              close: config,
            },
            headerStyleInterpolator: HeaderStyleInterpolators.forFade,
            cardStyleInterpolator: cardStyleInterpolatorFn
          }}
          headerMode='float'
          mode='modal'>
          {openID && <Stack.Screen
            name="Login"
            component={Login}
            initialParams={{ token: keepToken }}
            options={{
              title: I18n.t('login-pge-title'),
              headerLeft: () => (<></>),
              headerRight: () => (<></>)
            }} /> || <></>}
          {openID  && loggedIn && (lockRoute && routeName === 'SetPwd' || !lockRoute) && <Stack.Screen
            name='SetPwd'
            component={SetPwd}
            initialParams={{ token: keepToken }}
            options={({ route, navigation }) => ({
              title: I18n.t('login-pge-title'),
              headerLeft: () => (<TouchableOpacity style={styles.backCon} onPress={() => navigation.navigate('Login', { token: keepToken })}>
                <Icon style={styles.headerBtnIcon} name='ic_arrow_back_24px' size={20} color='rgba(99, 125, 129, 1)' />
                <Text style={styles.headerBtnTxt}>{I18n.t('shell-header-btn-back')}</Text>
              </TouchableOpacity>),
              headerRight: () => (<TouchableOpacity style={styles.rigthCon} onPress={() => {
                if (hasHealthRecord) {
                  navigation.navigate('Home', { token: keepToken || '' });
                } else {
                  navigation.navigate('HealthRecord', { token: keepToken || '', mode: HEALTH_REC_VIEW_MDOE.COMPLETE, from: 'SetPwd' });
                }
              }}>
                <Text style={styles.headerBtnTxt}>{I18n.t('shell-header-btn-skip')}</Text>
              </TouchableOpacity>)
            })} /> || <></>}
          {openID && loggedIn && (lockRoute && routeName === 'HealthRecord' || !lockRoute) && <Stack.Screen
            name='HealthRecord'
            component={HealthRecord}
            initialParams={{ token: keepToken }}
            options={({ route, navigation }) => {
              dispatch(getHealthRecord(pid));
              const { from } = route.params;
              let navigateRouteName: string | undefined = 'Home';
              let subRoute: string | undefined;
              if (from && from.split('/').length > 1) {
                [navigateRouteName, subRoute] = from.split('/');
              } else {
                navigateRouteName = from;
              }
              return ({
                title: (navigateRouteName === 'Login' || navigateRouteName === 'SetPwd') && I18n.t('userInfo-title') || I18n.t('userInfo-title-my-profile'),
                headerLeft: () => (<TouchableOpacity style={styles.backCon} onPress={() => navigation.navigate(navigateRouteName, { token: keepToken, subRoute })}>
                  <Icon style={styles.headerBtnIcon} name='ic_arrow_back_24px' size={20} color='rgba(99, 125, 129, 1)' />
                  <Text style={styles.headerBtnTxt}>{I18n.t('shell-header-btn-back')}</Text>
                </TouchableOpacity>),
                headerRight: () => (<></>)
              });
            }} /> || <></>}
          {openID && loggedIn && (lockRoute && routeName === 'Home' || !lockRoute) && <Stack.Screen
            name="Home"
            component={Home}
            initialParams={{ token: keepToken }}
            options={({ route, navigation }) => {
              const { index } = route.state || {};
              return ({
                title: (index === 0 || !index) && I18n.t('home-pge-title') || I18n.t('set-pge-title'),
                headerLeft: () => (<></>),
                headerRight: () => {
                  return ((index === 0 || !index) && <TouchableOpacity style={styles.rigthCon} onPress={() => {
                    dispatch(getHealthRecord(pid));
                    dispatch(fetchLastReprt(pid));
                  }}>
                    <Icon style={styles.headerBtnIcon} name='ic_refresh_24px' size={20} color='rgba(99, 125, 129, 1)' />
                    <Text style={styles.headerBtnTxt}>{I18n.t('shell-header-btn-refresh')}</Text>
                  </TouchableOpacity> || <></>)
                }
              })
            }} /> || <></>}
          {openID && loggedIn && (lockRoute && routeName === 'RecordList' || !lockRoute) && <Stack.Screen
            name="RecordList"
            component={RecordList}
            initialParams={{ token: keepToken }}
            options={({ navigation }) => {
              dispatch(getHealthRecord(pid));
              return ({
                title: I18n.t('reportList-pge-title'),
                headerLeft: () => (<TouchableOpacity style={styles.backCon} onPress={() => navigation.navigate('Home', { token: keepToken, subRoute: 'Main' })}>
                  <Icon style={styles.headerBtnIcon} name='ic_arrow_back_24px' size={20} color='rgba(99, 125, 129, 1)' />
                  <Text style={styles.headerBtnTxt}>{I18n.t('shell-header-btn-back')}</Text>
                </TouchableOpacity>),
                headerRight: () => (<TouchableOpacity style={styles.rigthCon} onPress={() => dispatch(fetchRecordList(pid))}>
                  <Icon style={styles.headerBtnIcon} name='ic_refresh_24px' size={20} color='rgba(99, 125, 129, 1)' />
                  <Text style={styles.headerBtnTxt}>{I18n.t('shell-header-btn-refresh')}</Text>
                </TouchableOpacity>)
              });
            }} /> || <></>}
          {openID && loggedIn && (lockRoute && routeName === 'ReSetPwd' || !lockRoute) && <Stack.Screen
            name="ReSetPwd"
            component={ReSetPwd}
            initialParams={{ token: keepToken }}
            options={({ navigation }) => ({
              title: I18n.t('reset-pwd-page-title'),
              headerLeft: () => (<TouchableOpacity style={styles.backCon} onPress={() => navigation.navigate('Home', { token: keepToken, subRoute: 'Setting' })}>
                <Icon style={styles.headerBtnIcon} name='ic_arrow_back_24px' size={20} color='rgba(99, 125, 129, 1)' />
                <Text style={styles.headerBtnTxt}>{I18n.t('shell-header-btn-back')}</Text>
              </TouchableOpacity>),
              headerRight: () => (<></>)
            })} /> || <></>}
          <Stack.Screen
            name="Report"
            component={Report}
            initialParams={{ token: keepToken, ...(lockRoute && routeParams) }}
            options={({ route, navigation }) => ({
              title: I18n.t('report-page-main-title'),
              headerLeft: () => ((readonly || lockRoute) && <></>
                || <TouchableOpacity style={styles.backCon} onPress={() => {
                  const { from } = route.params;
                  navigation.navigate(from, { token: keepToken });
                }}>
                  <Icon style={styles.headerBtnIcon} name='ic_arrow_back_24px' size={20} color='rgba(99, 125, 129, 1)' />
                  <Text style={styles.headerBtnTxt}>{I18n.t('shell-header-btn-back')}</Text>
                </TouchableOpacity>),
              headerRight: () => (<></>)
            })} />
          {openID && (lockRoute && routeName === 'Info' || !lockRoute) && <Stack.Screen
            name="Info"
            component={Info}
            options={{
              title: I18n.t('login-pge-title'),
              headerLeft: () => (<></>),
              headerRight: () => (<></>)
            }} /> || <></>}
          <Stack.Screen name="NotFound" component={Notfound} options={
            { title: I18n.t('notfound-pge-title') }
          } />
        </Stack.Navigator >
      </NavigationContainer >
      <Appointment
        closeFn={() => setShowAppointment(false)}
        show={showAppointment} />
    </>
  );
}

export default memo(Navigation)