#pragma version(1)
#pragma rs java_package_name(iyegoroff.imagefilterkit.compositing)
#pragma rs_fp_relaxed

rs_allocation srcImage;

static inline float4 sourceOut(const float4 dst, const float4 src) {
  float4 out;

  out.rgb = (1.0f - dst.a) * src.rgb;
  out.a = (1.0f - dst.a) * src.a;

  return out;
}

uchar4 RS_KERNEL composeImage(uchar4 dst, uint32_t x, uint32_t y) {
  return rsPackColorTo8888(sourceOut(
    rsUnpackColor8888(dst),
    rsUnpackColor8888(*(const uchar4*)rsGetElementAt(srcImage, x, y))
  ));
}
