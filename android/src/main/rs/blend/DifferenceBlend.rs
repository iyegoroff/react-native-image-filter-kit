#pragma version(1)
#pragma rs java_package_name(iyegoroff.imagefilterkit.blend)
#pragma rs_fp_relaxed

rs_allocation srcImage;
float4 srcColor;

static inline float4 difference(const float4 dst, const float4 src) {
  float4 out;

  out.a = src.a + (1.0f - src.a) * dst.a;
  out.rgb = src.rgb + dst.rgb - 2.0f * min(src.rgb * dst.a, dst.rgb * src.a);

  return out;
}

uchar4 RS_KERNEL blendImage(uchar4 dst, uint32_t x, uint32_t y) {
  return rsPackColorTo8888(difference(
    rsUnpackColor8888(dst),
    rsUnpackColor8888(*(const uchar4*)rsGetElementAt(srcImage, x, y))
  ));
}

uchar4 RS_KERNEL blendColor(uchar4 dst, uint32_t x, uint32_t y) {
  return rsPackColorTo8888(difference(rsUnpackColor8888(dst), srcColor));
}
