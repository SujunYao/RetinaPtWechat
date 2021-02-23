import { Middleware } from 'redux';
// import * as Raven from 'raven';
import { RootState } from '../store/root';

const loggerMiddleware: Middleware<{}, RootState> = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

/**
 * Sends crash reports as state is updated and listeners are notified.
 */
// const crashReporter: Middleware<{}, RootState> = store => next => action => {
//   try {
//     return next(action);
//   } catch (err) {
//     console.error('Caught an exception!', err);
//     Raven.captureException(err, {
//       extra: {
//         action,
//         state: store.getState()
//       }
//     });
//     throw err;
//   }
// }

export default {
  loggerMiddleware,
  // crashReporter
};