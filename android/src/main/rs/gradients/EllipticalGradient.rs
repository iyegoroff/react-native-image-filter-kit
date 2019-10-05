#pragma version(1)
#pragma rs java_package_name(iyegoroff.imagefilterkit.gradients)
#pragma rs_fp_relaxed

#include "GradientUtils.rsh"

int amount;
int mixStep;
float radiusX;
float radiusY;
float centerX;
float centerY;
float positions[MAX_COLORS];
float4 colors[MAX_COLORS];

static inline float radius(uint32_t x, uint32_t y, float2 center, float radiusX, float radiusY) {
  float rad = atan2((float)y - center.y, (float)x - center.x);

  return (radiusX * radiusY) /
    sqrt(radiusX * radiusX * sin(rad) * sin(rad) + radiusY * radiusY * cos(rad) * cos(rad));
}

uchar4 RS_KERNEL generate(uchar4 src, uint32_t x, uint32_t y) {
  float2 center = (float2){centerX, centerY};

  float d = distance(center, (float2){x, y}) / radius(x, y, center, radiusX, radiusY);
  float4 color = colors[0];

  for (int i = 1; i < amount; i++) {
    color = mix(
      color,
      colors[i],
      mixStep == CLAMP_STEP
        ? clampstep(positions[i - 1], positions[i], d)
        : smoothstep(positions[i - 1], positions[i], d)
    );
  }

  return rsPackColorTo8888(color);
}
