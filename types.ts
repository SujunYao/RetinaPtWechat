import { HEALTH_REC_VIEW_MDOE } from "./store/enum";

export type RootStackParamList = {
  Home: { token: string, subRoute?: string };
  Login: { token: string };
  RecordList: { token: string, id?: number };
  Report: { token: string, id: number, from?: string };
  HealthRecord: { token: string, mode?: HEALTH_REC_VIEW_MDOE, from?: string };
  SetPwd: { token: string };
  ReSetPwd: { token: string };
  NotFound: undefined;
  Info: { token: string };
};

export type BottomTabParamList = {
  Main: { token: string };
  Setting: { token: string };
};

export type MainParamList = {
  MainScreen: { token: string };
};

export type SettingParamList = {
  SettingScreen: { token: string };
};
