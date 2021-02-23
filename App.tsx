import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ImageBackground } from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { View } from './components/Themed';
import styles from './constants/Shell';
// import rootReducer from './reducers'
import configureStore from './store/configureStore';


const store = configureStore();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <View style={styles.shellCon}>
            <View style={styles.loadingCon}>
              <ImageBackground style={styles.loading} source={require("./assets/images/loading.gif")} />
            </View>
            <Navigation colorScheme={colorScheme} />
          </View>
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
