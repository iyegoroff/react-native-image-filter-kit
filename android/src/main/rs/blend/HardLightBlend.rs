#pragma version(1)
#pragma rs java_package_name(iyegoroff.imagefilterkit.blend)
#pragma rs_fp_relaxed

rs_allocation srcImage;
float4 srcColor;

static inline float hardLightComponent(float dstC, float srcC, float dstA, float srcA) {
  return (2.0f * srcC <= srcA)
    ? 2.0f * srcC * dstC
    : srcA * dstA - 2.0f * (dstA - dstC) * (srcA - srcC);
}

static inline float4 hardLight(const float4 dst, const float4 src) {
  float4 out = (float4){
    hardLightComponent(dst.r, src.r, dst.a, src.a),
    hardLightComponent(dst.g, src.g, dst.a, src.a),
    hardLightComponent(dst.b, src.b, dst.a, src.a),
    src.a + (1.0f - src.a) * dst.a
  };
  out.rgb += src.rgb * (1.0f - dst.a) + dst.rgb * (1.0f - src.a);

  return out;
}

uchar4 RS_KERNEL blendImage(uchar4 dst, uint32_t x, uint32_t y) {
  return rsPackColorTo8888(hardLight(
    rsUnpackColor8888(dst),
    rsUnpackColor8888(*(const uchar4*)rsGetElementAt(srcImage, x, y))
  ));
}

uchar4 RS_KERNEL blendColor(uchar4 dst, uint32_t x, uint32_t y) {
  return rsPackColorTo8888(hardLight(rsUnpackColor8888(dst), srcColor));
}
