#pragma version(1)
#pragma rs java_package_name(iyegoroff.imagefilterkit.blend)
#pragma rs_fp_relaxed

rs_allocation gSrc;

static float4 exclusion(const float4 dst, const float4 src) {
  float4 out;

  out.a = src.a + (1.0f - src.a) * dst.a;
  out.rgb = dst.rgb + src.rgb - 2.0f * dst.rgb * src.rgb;

  return out;
}

uchar4 RS_KERNEL root(uchar4 dst, uint32_t x, uint32_t y) {
  float4 dstColor = rsUnpackColor8888(dst);
  float4 srcColor = rsUnpackColor8888(*(const uchar4*)rsGetElementAt(gSrc, x, y));
  float4 outColor = exclusion(dstColor, srcColor);

  return rsPackColorTo8888(outColor);
}
