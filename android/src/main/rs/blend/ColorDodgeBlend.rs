#pragma version(1)
#pragma rs java_package_name(iyegoroff.imagefilterkit.blend)
#pragma rs_fp_relaxed

rs_allocation src;

static inline float colorDodgeComponent(float dstC, float srcC, float dstA, float srcA) {
  if (0.0f == dstC) {
    return srcC * (1.0f - dstA);

  } else {
    float d = srcA - srcC;

    if (0.0f == d) {
      return srcA * dstA + srcC * (1.0f - dstA) + dstC * (1.0f - srcA);

    } else {
      d = min(dstA, dstC * srcA / d);

      return d * srcA + srcC * (1.0f - dstA) + dstC * (1.0f - srcA);
    }
  }
}

static inline float4 colorDodge(const float4 dst, const float4 src) {
  return (float4){
    colorDodgeComponent(dst.r, src.r, dst.a, src.a),
    colorDodgeComponent(dst.g, src.g, dst.a, src.a),
    colorDodgeComponent(dst.b, src.b, dst.a, src.a),
    src.a + (1.0f - src.a) * dst.a
  };
}

uchar4 RS_KERNEL root(uchar4 dst, uint32_t x, uint32_t y) {
  float4 dstColor = rsUnpackColor8888(dst);
  float4 srcColor = rsUnpackColor8888(*(const uchar4*)rsGetElementAt(src, x, y));
  float4 outColor = colorDodge(dstColor, srcColor);

  return rsPackColorTo8888(outColor);
}
