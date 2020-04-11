/**
 * @format
 */

import {AppRegistry, YellowBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings([
    'Calling `getNode()` on the ref of an Animated component is no longer necessary. You can now directly use the ref instead.',
]);

AppRegistry.registerComponent(appName, () => App);
