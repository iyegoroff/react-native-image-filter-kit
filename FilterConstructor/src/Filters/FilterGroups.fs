namespace FilterConstructor

open Fable.Helpers.ReactNative

module CF = CombinedFilter

module FilterGroups =

  type Category =
    | Fresco
    | LightingColorFilter
    | ColorMatrix
    | CICategoryBlur
    | CICategoryColorAdjustment
    | CICategoryColorEffect
    | CICategoryCompositeOperation
    | CICategoryDistortionEffect
    | CICategoryGenerator
    | CICategoryGeometryAdjustment
    | CICategoryGradient
    | CICategoryHalftoneEffect
    | CICategoryReduction
    | CICategorySharpen
    | CICategoryStylize
    | CICategoryTileEffect
    | CICategoryTransition

  type GroupedModel = Category * (CombinedFilter.Model array)


  let private commonSingularFilters: GroupedModel array =
    [| ColorMatrix,
       [| CF.Normal
          CF.Saturate
          CF.HueRotate
          CF.LuminanceToAlpha
          CF.Invert
          CF.Grayscale
          CF.Sepia
          CF.Nightvision
          CF.Warm
          CF.Cool
          CF.Brightness
          CF.Exposure
          CF.Contrast
          CF.Temperature
          CF.Tint
          CF.Threshold
          CF.Technicolor
          CF.Polaroid
          CF.ToBGR
          CF.Kodachrome
          CF.Browni
          CF.Vintage
          CF.Night
          CF.Predator
          CF.Lsd
          CF.ColorTone
          CF.Protanomaly
          CF.Deuteranomaly
          CF.Tritanomaly
          CF.Protanopia
          CF.Deuteranopia
          CF.Tritanopia
          CF.Achromatopsia
          CF.Achromatomaly |] |]

  let private androidSingularFilters =
    Array.concat
      [ commonSingularFilters
        [| Fresco,
           [| CF.RoundAsCircle
              CF.IterativeBoxBlur |]
           
           LightingColorFilter,
           [| CF.LightingColorFilter |] |] ]

  let private iosSingularFilters =
    Array.concat
      [ commonSingularFilters

        [| CICategoryBlur,
           [| CF.CIBoxBlur
              CF.CIDiscBlur
              CF.CIGaussianBlur
              CF.CIMedianFilter
              CF.CIMotionBlur
              CF.CINoiseReduction
              CF.CIZoomBlur |];

            CICategoryColorAdjustment,
            [| CF.CIColorClamp
               CF.CIColorControls
               CF.CIColorMatrix
               CF.CIColorPolynomial
               CF.CIExposureAdjust
               CF.CIGammaAdjust
               CF.CIHueAdjust
               CF.CILinearToSRGBToneCurve
               CF.CISRGBToneCurveToLinear
               CF.CITemperatureAndTint
               CF.CIToneCurve
               CF.CIVibrance |];
                
            CICategoryColorEffect,
            [| CF.CIColorInvert
               CF.CIColorPosterize
               CF.CIMaskToAlpha
               CF.CIMaximumComponent
               CF.CIMinimumComponent
               CF.CIPhotoEffectChrome
               CF.CIPhotoEffectFade
               CF.CIPhotoEffectInstant
               CF.CIPhotoEffectMono
               CF.CIPhotoEffectNoir
               CF.CIPhotoEffectProcess
               CF.CIPhotoEffectTonal
               CF.CIPhotoEffectTransfer
               CF.CISepiaTone
               CF.CIVignette
               CF.CIVignetteEffect |];
            
            CICategoryDistortionEffect,
            [| CF.CIBumpDistortion
               CF.CIBumpDistortionLinear
               CF.CICircleSplashDistortion
               CF.CICircularWrap
               CF.CIVortexDistortion |];
            
            CICategoryGeometryAdjustment,
            [| |];
            
            CICategoryGradient,
            [| |];
            
            CICategoryHalftoneEffect,
            [| CF.CICircularScreen
               CF.CIDotScreen
               CF.CILineScreen |];
               
            CICategoryReduction,
            [| |];
            
            CICategorySharpen,
            [| CF.CISharpenLuminance
               CF.CIUnsharpMask |];
               
            CICategoryStylize,
            [| CF.CICrystallize
               CF.CIEdges
               CF.CILineOverlay
               CF.CIPixellate
               CF.CIPointillize |];
            
            CICategoryTileEffect,
            [| CF.CIOpTile |];
            
            CICategoryTransition,
            [| |] |] ]

  let singularFilters =
    Platform.select
      [ Platform.Ios iosSingularFilters
        Platform.Android androidSingularFilters ]

  let private commonCompositionFilters: GroupedModel array = [||]

  let private androidCompositionFilters =
    Array.concat
      [ commonCompositionFilters
        [||] ]

  let private iosCompositionFilters =
    Array.concat
      [ commonCompositionFilters

        [| CICategoryBlur,
           [| CF.CIMaskedVariableBlur |];
           
            CICategoryCompositeOperation,
            [| CF.CIAdditionCompositing |]; |] ]

  let compositionFilters =
    Platform.select
      [ Platform.Ios iosCompositionFilters
        Platform.Android androidCompositionFilters ]

  let private commonGenerators: GroupedModel array = [||]

  let private androidGenerators =
    Array.concat
      [ commonGenerators
        [||] ]

  let private iosGenerators =
    Array.concat
      [ commonGenerators

        [| CICategoryGenerator,
           [| CF.CIConstantColorGenerator
              CF.CIRandomGenerator |]; |] ]

  let generators = 
    Platform.select
      [ Platform.Ios iosGenerators
        Platform.Android androidGenerators ]
        