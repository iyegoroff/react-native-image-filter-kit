#pragma version(1)
#pragma rs java_package_name(iyegoroff.imagefilterkit.gradients)
#pragma rs_fp_relaxed

uint32_t width;
uint32_t height;
float4 bottomLeftColor;
float4 bottomRightColor;
float4 topLeftColor;
float4 topRightColor;

uchar4 RS_KERNEL generate(uchar4 src, uint32_t x, uint32_t y) {
  float2 uv = (float2){x / (float)width, y / (float)height};
  float4 color = mix(
    mix(bottomLeftColor, bottomRightColor, uv.x),
    mix(topLeftColor, topRightColor, uv.x),
    uv.y
  );

  return rsPackColorTo8888(color);
}
