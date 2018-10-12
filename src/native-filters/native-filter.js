import { requireNativeComponent } from 'react-native';
import createImageFilter from './create-native-filter';

export const NativeImageFilter = createImageFilter(
  requireNativeComponent('RNImageFilter')
);
