import { InitialState } from "@react-navigation/native";

import { SystemState } from './system/types';
import { UserState } from './user/types';
import { ReportState } from './report/types';
import { ApptState } from './appt/types';

export interface ROOT_STATE {
  system: SystemState,
  user: UserState,
  report: ReportState,
  appt: ApptState
};