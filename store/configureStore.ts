import prodConfigureStore from './configureStore.prod';
import devConfigureStore from './configureStore.dev';
import tuneConfigureStore from './configureStore.tune';

export default (process.env.NODE_ENV === 'production' && prodConfigureStore)
  || (process.env.NODE_ENV === 'tune' && tuneConfigureStore)
  || devConfigureStore;
