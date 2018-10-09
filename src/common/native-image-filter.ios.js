import { requireNativeComponent } from 'react-native';
import createImageFilter from './create-image-filter';

export const NativeImageFilterWithColorManagement = createImageFilter(
  requireNativeComponent('RNImageFilterWithColorManagement')
);

export const NativeImageFilterWithoutColorManagement = createImageFilter(
  requireNativeComponent('RNImageFilterWithoutColorManagement')
);
