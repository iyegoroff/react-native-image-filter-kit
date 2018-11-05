#pragma version(1)
#pragma rs java_package_name(iyegoroff.imagefilterkit.blend)
#pragma rs_fp_relaxed

#include "BlendUtils.rsh"

rs_allocation src;

static inline float4 luminosity(const float4 dst, const float4 src) {
  float4 srcDstAlpha = src * dst.a;
  float4 out;

  out.a = src.a + (1.0f - src.a) * dst.a;
  out.rgb = setLuminance(dst.rgb * src.a, srcDstAlpha.a, srcDstAlpha.rgb);
  out.rgb += (1.0 - src.a) * dst.rgb + (1.0 - dst.a) * src.rgb;

  return out;
}

uchar4 RS_KERNEL root(uchar4 dst, uint32_t x, uint32_t y) {
  float4 dstColor = rsUnpackColor8888(dst);
  float4 srcColor = rsUnpackColor8888(*(const uchar4*)rsGetElementAt(src, x, y));
  float4 outColor = luminosity(dstColor, srcColor);

  return rsPackColorTo8888(outColor);
}
