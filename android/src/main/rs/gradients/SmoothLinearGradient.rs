#pragma version(1)
#pragma rs java_package_name(iyegoroff.imagefilterkit.gradients)
#pragma rs_fp_relaxed

#include "GradientUtils.rsh"

int amount;
float x0;
float y0;
float x1;
float y1;
float positions[MAX_COLORS];
float4 colors[MAX_COLORS];

uchar4 RS_KERNEL generate(uchar4 src, uint32_t x, uint32_t y) {
  float2 start = (float2){x0, y0};
  float2 end = (float2){x1, y1};
  float2 dt = end - start;
  float2 pt = (float2){(float)x, (float)y} - start;
  float d = dot(pt, dt) / dot(dt, dt);
  float4 color = colors[0];

  for (int i = 1; i < amount; i++) {
    color = mix(color, colors[i], smoothstep(positions[i - 1], positions[i], d));
  }

  return rsPackColorTo8888(color);
}
