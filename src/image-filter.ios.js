import { requireNativeComponent } from 'react-native';
import createImageFilter from './create-image-filter';

export const ImageFilterWithColorManagement = createImageFilter(
  requireNativeComponent('RNImageFilterWithColorManagement')
);

export const ImageFilterWithoutColorManagement = createImageFilter(
  requireNativeComponent('RNImageFilterWithoutColorManagement')
);
