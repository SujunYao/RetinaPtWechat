import logger from './log';
import promiseMiddleware from './promise';
import api from './api';

export default {
  loggerMiddleware: logger.loggerMiddleware,
  apiMiddleware: api,
  // crashReporterMiddleware: logger.crashReporter,
  vanillaPromiseMiddleware: promiseMiddleware.vanillaPromise,
  readyStatePromiseMiddleware: promiseMiddleware.readyStatePromise,
}