#ifndef __RNIFK_GRADIENT_UTILS_RSH__
#define __RNIFK_GRADIENT_UTILS_RSH__

#define MAX_COLORS 10

#define CLAMP_STEP 0
#define SMOOTH_STEP 1

static inline float clampstep(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0f, 1.0f);
}

static inline float smoothstep(float edge0, float edge1, float x) {
  float value = clampstep(edge0, edge1, x);

  return value * value * (3.0f - 2.0f * value);
}

#endif
