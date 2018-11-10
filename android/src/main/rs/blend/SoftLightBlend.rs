#pragma version(1)
#pragma rs java_package_name(iyegoroff.imagefilterkit.blend)
#pragma rs_fp_relaxed

rs_allocation srcImage;
float4 srcColor;

static inline float softLightComponent(float dstC, float srcC, float dstA, float srcA) {
  if (2.0f * srcC <= srcA) {
    return (dstC * dstC * (srcA - 2.0f * srcC)) / dstA + (1.0f - dstA) * srcC +
      dstC * (-srcA + 2 * srcC + 1.0f);

  } else if (4.0f * dstC <= dstA) {
    float dstCSqd = dstC * dstC;
    float dstCCub = dstCSqd * dstC;
    float dstASqd = dstA * dstA;
    float dstACub = dstASqd * dstA;

    return (dstASqd * (srcC - dstC * (3.0f * srcA - 6.0f * srcC - 1.0f)) +
      12.0f * dstA * dstCSqd * (srcA - 2.0f * srcC) - 16.0f * dstCCub * (srcA - 2.0f * srcC) -
      dstACub * srcC) / dstASqd;

  } else {
    return dstC * (srcA - 2.0f * srcC + 1.0f) + srcC -
      sqrt(dstA * dstC) * (srcA - 2.0f * srcC) - dstA * srcC;
  }
}

static inline float4 softLight(const float4 dst, const float4 src) {
  return (0.0f == dst.a)
    ? (float4){src.r, src.g, src.b, src.a}
    : (float4){
        softLightComponent(dst.r, src.r, dst.a, src.a),
        softLightComponent(dst.g, src.g, dst.a, src.a),
        softLightComponent(dst.b, src.b, dst.a, src.a),
        src.a + (1.0f - src.a) * dst.a
      };
}

uchar4 RS_KERNEL blendImage(uchar4 dst, uint32_t x, uint32_t y) {
  return rsPackColorTo8888(softLight(
    rsUnpackColor8888(dst),
    rsUnpackColor8888(*(const uchar4*)rsGetElementAt(srcImage, x, y))
  ));
}

uchar4 RS_KERNEL blendColor(uchar4 dst, uint32_t x, uint32_t y) {
  return rsPackColorTo8888(softLight(rsUnpackColor8888(dst), srcColor));
}
