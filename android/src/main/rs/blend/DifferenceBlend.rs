#pragma version(1)
#pragma rs java_package_name(iyegoroff.imagefilterkit.blend)
#pragma rs_fp_relaxed

rs_allocation src;

static inline float4 difference(const float4 dst, const float4 src) {
  float4 out;

  out.a = src.a + (1.0f - src.a) * dst.a;
  out.rgb = src.rgb + dst.rgb - 2.0f * min(src.rgb * dst.a, dst.rgb * src.a);

  return out;
}

uchar4 RS_KERNEL root(uchar4 dst, uint32_t x, uint32_t y) {
  float4 dstColor = rsUnpackColor8888(dst);
  float4 srcColor = rsUnpackColor8888(*(const uchar4*)rsGetElementAt(src, x, y));
  float4 outColor = difference(dstColor, srcColor);

  return rsPackColorTo8888(outColor);
}
