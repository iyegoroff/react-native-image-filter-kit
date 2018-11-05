#ifndef __RNIFK_BLEND_UTILS_RSH__
#define __RNIFK_BLEND_UTILS_RSH__

static inline float getLuminance(const float3 color) {
  return dot((float3){0.3f, 0.59f, 0.11f}, color);
}

static inline float3 setLuminance(const float3 hueSat, float alpha, const float3 lumColor) {
  float diff = getLuminance(lumColor - hueSat);
  float3 outColor = hueSat + diff;
  float outLum = getLuminance(outColor);
  float minComp = min(min(outColor.r, outColor.g), outColor.b);
  float maxComp = max(max(outColor.r, outColor.g), outColor.b);

  if (minComp < 0.0f && outLum != minComp) {
    outColor = outLum + ((outColor - (float3){outLum, outLum, outLum}) * outLum) /
      (outLum - minComp);
  }

  if (maxComp > alpha && maxComp != outLum) {
    outColor = outLum + ((outColor - (float3){outLum, outLum, outLum}) * (alpha - outLum)) /
      (maxComp - outLum);
  }

  return outColor;
}

static inline float getSaturation(const float3 color) {
  return max(max(color.r, color.g), color.b) - min(min(color.r, color.g), color.b);
}

static inline float3 setSaturationHelper(float minComp, float midComp, float maxComp, float sat) {
  if (minComp < maxComp) {
    return (float3){0.0f, sat * (midComp - minComp) / (maxComp - minComp), sat};
  } else {
    return (float3){0.0f, 0.0f, 0.0f};
  }
}

static inline float3 setSaturation(const float3 hueLumColor, const float3 satColor) {
  float sat = getSaturation(satColor);

  if (hueLumColor.r <= hueLumColor.g) {
    if (hueLumColor.g <= hueLumColor.b) {
      hueLumColor.rgb = setSaturationHelper(hueLumColor.r, hueLumColor.g, hueLumColor.b, sat);

    } else if (hueLumColor.r <= hueLumColor.b) {
      hueLumColor.rbg = setSaturationHelper(hueLumColor.r, hueLumColor.b, hueLumColor.g, sat);

    } else {
      hueLumColor.brg = setSaturationHelper(hueLumColor.b, hueLumColor.r, hueLumColor.g, sat);
    }

  } else if (hueLumColor.r <= hueLumColor.b) {
    hueLumColor.grb = setSaturationHelper(hueLumColor.g, hueLumColor.r, hueLumColor.b, sat);

  } else if (hueLumColor.g <= hueLumColor.b) {
    hueLumColor.gbr = setSaturationHelper(hueLumColor.g, hueLumColor.b, hueLumColor.r, sat);

  } else {
    hueLumColor.bgr = setSaturationHelper(hueLumColor.b, hueLumColor.g, hueLumColor.r, sat);
  }

  return hueLumColor;
}

#endif