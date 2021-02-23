import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import React, { useRef, useEffect } from 'react';

import Colors from '../constants/Colors';
import Icon from '../components/Icons';
import I18n from '../i18n/i18n';
import Styles from '../constants/Home';
import useColorScheme from '../hooks/useColorScheme';
import MainScreen from '../screens/Main';
import SettingScreen from '../screens/Setting';
import { BottomTabParamList, MainParamList, RootStackParamList, SettingParamList } from '../types';

import { getHealthRecord } from '../store/user/actions';
import { fetchLastReprt } from '../store/report/actions';
import { ROOT_STATE } from '../store/interface';
import { Text, View, Animated, Easing, TouchableOpacity, Dimensions } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { BottomTabBarOptions } from '@react-navigation/bottom-tabs/lib/typescript/src/types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Home'>
interface Props {
  route: ProfileScreenRouteProp;
};


const Home: React.FC<Props> = ({ route }) => {
  const { subRoute } = route.params;
  const colorScheme = useColorScheme();
  const { pid } = useSelector((state: ROOT_STATE) => state.system);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pid && pid !== 'DEF') {
      dispatch(getHealthRecord(pid));
      dispatch(fetchLastReprt(pid));
    }
  }, [pid]);

  /**
  * The animation show when switch the field state between default and focus
  * @Sujun
  * **/
  const screen = Dimensions.get("screen");
  const transfromXAnim = useRef(new Animated.Value(0)).current;
  const transfromXInAnim = () => {
    Animated.timing(transfromXAnim, {
      toValue: 0,
      duration: 400,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };
  const transfromXOutAnim = () => {
    Animated.timing(transfromXAnim, {
      toValue: screen.width / 2,
      duration: 400,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };

  const transfromHeightAnim_tab0 = useRef(new Animated.Value(42)).current;
  const transfromTab0HieghtInAnim = () => {
    Animated.timing(transfromHeightAnim_tab0, {
      toValue: 42,
      duration: 400,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };
  const transfromTab0HeightOutAnim = () => {
    Animated.timing(transfromHeightAnim_tab0, {
      toValue: 26,
      duration: 400,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };

  const transfromHeightAnim_tab1 = useRef(new Animated.Value(42)).current;
  const transfromTab1HieghtInAnim = () => {
    Animated.timing(transfromHeightAnim_tab1, {
      toValue: 42,
      duration: 400,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };
  const transfromTab1HeightOutAnim = () => {
    Animated.timing(transfromHeightAnim_tab1, {
      toValue: 26,
      duration: 400,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };

  const transformOpacity_tab0 = useRef(new Animated.Value(1)).current;
  const transfromTab0OpacityInAnim = () => {
    Animated.timing(transformOpacity_tab0, {
      toValue: 1,
      duration: 400,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };
  const transfromTab0OpacityOutAnim = () => {
    Animated.timing(transformOpacity_tab0, {
      toValue: 0,
      duration: 400,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };

  const transformOpacity_tab1 = useRef(new Animated.Value(1)).current;
  const transfromTab1OpacityInAnim = () => {
    Animated.timing(transformOpacity_tab1, {
      toValue: 1,
      duration: 400,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };
  const transfromTab1OpacityOutAnim = () => {
    Animated.timing(transformOpacity_tab1, {
      toValue: 0,
      duration: 400,
      easing: Easing.bezier(0.0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };

  const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps<BottomTabBarOptions>): React.ReactNode => {
    if (state.index > 0) {
      transfromXOutAnim();
      transfromTab0HeightOutAnim();
      transfromTab0OpacityOutAnim();
      transfromTab1HieghtInAnim();
      transfromTab1OpacityInAnim();
    } else {
      transfromXInAnim();
      transfromTab0HieghtInAnim();
      transfromTab0OpacityInAnim();
      transfromTab1HeightOutAnim();
      transfromTab1OpacityOutAnim();
    }

    return (
      <View style={Styles.footerBar}>
        <Animated.View style={[Styles.activeMask, {
          left: transfromXAnim
        }
        ]} />
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;
          const icon = options.tabBarIcon !== undefined ? options.tabBarIcon : undefined;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {

              if (index > 0) {
                transfromXOutAnim();
                transfromTab0HeightOutAnim();
                transfromTab0OpacityOutAnim();
                transfromTab1HieghtInAnim();
                transfromTab1OpacityInAnim();
              } else {
                transfromXInAnim();
                transfromTab0HieghtInAnim();
                transfromTab0OpacityInAnim();
                transfromTab1HeightOutAnim();
                transfromTab1OpacityOutAnim();
              }
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const params = {
            focused: isFocused,
            color: isFocused && 'rgba(255, 255, 255, 1)' || 'rgba(255, 255, 255, 0.54)',
            size: 12
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={Styles.footerBtn}
            >
              <Animated.View style={[Styles.footerBarMainContent, {
                height: index === 0 && transfromHeightAnim_tab0 || transfromHeightAnim_tab1
              }]}>
                <View>{icon && icon(params) || <></>}</View>
                <Animated.View style={{
                  opacity: index === 0 && transformOpacity_tab0 || transformOpacity_tab1
                }}>{typeof label === 'function' && label(params) || label}</Animated.View>
              </Animated.View>
            </TouchableOpacity>
          );
        })
        }
      </View >
    );
  }

  return (
    <BottomTab.Navigator
      initialRouteName={subRoute === 'Setting' && 'Setting' || 'Main'}
      tabBar={TabBar}
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}>
      <BottomTab.Screen
        name="Main"
        component={TabOneNavigator}
        options={{
          tabBarLabel: ({ focused, color }: {
            focused: boolean,
            color: string
          }) => <Text style={[Styles.label, { color: color }]}>{I18n.t('home-nav-my')}</Text>,
          tabBarIcon: ({ color }) => <Icon style={Styles.icon} name="ic_home_24px" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Setting"
        component={TabTwoNavigator}
        options={{
          tabBarLabel: ({ focused, color }) => <Text style={[Styles.label, { color: color }]}>{I18n.t('home-nav-preferences')}</Text>,
          tabBarIcon: ({ color }) => <Icon style={Styles.icon} name="ic_settings_applicat" size={24} color={color} />
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const MainStack = createStackNavigator<MainParamList>();

function TabOneNavigator() {
  const system = useSelector((state: ROOT_STATE) => state.system);
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="MainScreen"
        initialParams={{ token: system.keepToken }}
        component={MainScreen}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
}

const SettingStack = createStackNavigator<SettingParamList>();

function TabTwoNavigator() {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
    </SettingStack.Navigator>
  );
}

export default Home;
