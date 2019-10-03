#pragma version(1)
#pragma rs java_package_name(iyegoroff.imagefilterkit.gradients)
#pragma rs_fp_relaxed

#include "GradientUtils.rsh"

int amount;
float radius;
float centerX;
float centerY;
float positions[MAX_COLORS];
float4 colors[MAX_COLORS];

uchar4 RS_KERNEL generate(uchar4 src, uint32_t x, uint32_t y) {
  float d = distance((float2){centerX, centerY}, (float2){x, y}) / radius;
  float4 color = colors[0];

  for (int i = 1; i < amount; i++) {
    color = mix(color, colors[i], smoothstep(positions[i - 1], positions[i], d));
  }

  return rsPackColorTo8888(color);
}
