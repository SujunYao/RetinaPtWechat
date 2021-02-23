import { useReducer } from 'react';
import { combineReducers } from 'redux';
import { systemReducer } from './system/reducer';
import { userReducer } from './user/reducer';
import { reportReducer } from './report/reducer';
import { apptReducer } from './appt/reducer';


export const rootReducer = combineReducers({
  system: systemReducer,
  user: userReducer,
  report: reportReducer,
  appt: apptReducer,
})

export type RootState = ReturnType<typeof rootReducer>
