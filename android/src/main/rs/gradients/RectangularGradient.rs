#pragma version(1)
#pragma rs java_package_name(iyegoroff.imagefilterkit.gradients)
#pragma rs_fp_relaxed

#include "GradientUtils.rsh"

int amount;
int mixStep;
float halfWidth;
float halfHeight;
float centerX;
float centerY;
float positions[MAX_COLORS];
float4 colors[MAX_COLORS];

uchar4 RS_KERNEL generate(uchar4 src, uint32_t x, uint32_t y) {
  float2 uv = (float2){x, y};
  float d = fmax(
    fabs(uv.x - centerX) / (halfWidth * 2.0f),
    fabs(uv.y - centerY) / (halfHeight * 2.0f)
  ) * 2.0f;
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
