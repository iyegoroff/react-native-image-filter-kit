#pragma version(1)
#pragma rs java_package_name(iyegoroff.imagefilterkit.blend)
#pragma rs_fp_relaxed

rs_allocation srcImage;
float4 srcColor;

static inline float colorBurnComponent(float dstC, float srcC, float dstA, float srcA) {
  if (dstA == dstC) {
    return srcA * dstA + srcC * (1.0f - dstA) + dstC * (1.0f - srcA);

  } else if (0.0f == srcC) {
    return dstC * (1.0f - srcA);

  } else {
    float d = max(0.0f, dstA - (dstA - dstC) * srcA / srcC);

    return srcA * d + srcC * (1.0f - dstA) + dstC * (1.0f - srcA);
  }
}

static inline float4 colorBurn(const float4 dst, const float4 src) {
  return (float4){
    colorBurnComponent(dst.r, src.r, dst.a, src.a),
    colorBurnComponent(dst.g, src.g, dst.a, src.a),
    colorBurnComponent(dst.b, src.b, dst.a, src.a),
    src.a + (1.0f - src.a) * dst.a
  };
}

uchar4 RS_KERNEL blendImage(uchar4 dst, uint32_t x, uint32_t y) {
  return rsPackColorTo8888(colorBurn(
    rsUnpackColor8888(dst),
    rsUnpackColor8888(*(const uchar4*)rsGetElementAt(srcImage, x, y))
  ));
}

uchar4 RS_KERNEL blendColor(uchar4 dst, uint32_t x, uint32_t y) {
  return rsPackColorTo8888(colorBurn(rsUnpackColor8888(dst), srcColor));
}
