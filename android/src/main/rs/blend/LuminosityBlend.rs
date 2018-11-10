#pragma version(1)
#pragma rs java_package_name(iyegoroff.imagefilterkit.blend)
#pragma rs_fp_relaxed

#include "BlendUtils.rsh"

rs_allocation srcImage;
float4 srcColor;

static inline float4 luminosity(const float4 dst, const float4 src) {
  float4 srcDstAlpha = src * dst.a;
  float4 out;

  out.a = src.a + (1.0f - src.a) * dst.a;
  out.rgb = setLuminance(dst.rgb * src.a, srcDstAlpha.a, srcDstAlpha.rgb);
  out.rgb += (1.0 - src.a) * dst.rgb + (1.0 - dst.a) * src.rgb;

  return out;
}

uchar4 RS_KERNEL blendImage(uchar4 dst, uint32_t x, uint32_t y) {
  return rsPackColorTo8888(luminosity(
    rsUnpackColor8888(dst),
    rsUnpackColor8888(*(const uchar4*)rsGetElementAt(srcImage, x, y))
  ));
}

uchar4 RS_KERNEL blendColor(uchar4 dst, uint32_t x, uint32_t y) {
  return rsPackColorTo8888(luminosity(rsUnpackColor8888(dst), srcColor));
}
