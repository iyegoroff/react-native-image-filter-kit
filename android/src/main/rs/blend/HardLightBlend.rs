#pragma version(1)
#pragma rs java_package_name(iyegoroff.imagefilterkit.blend)
#pragma rs_fp_relaxed

rs_allocation src;

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

uchar4 RS_KERNEL root(uchar4 dst, uint32_t x, uint32_t y) {
  float4 dstColor = rsUnpackColor8888(dst);
  float4 srcColor = rsUnpackColor8888(*(const uchar4*)rsGetElementAt(src, x, y));
  float4 outColor = hardLight(dstColor, srcColor);

  return rsPackColorTo8888(outColor);
}
