#pragma version(1)
#pragma rs java_package_name(iyegoroff.imagefilterkit.blend)
#pragma rs_fp_relaxed

rs_allocation gSrc;
// float gDivisorGuard = 0.00000001f;

static float4 colorBurn(const float4 dst, const float4 src) {
  float4 out;
  float d;

  out.a = src.a + (1.0f - src.a) * dst.a;

  if (dst.a == dst.r) {
    out.r = src.a * dst.a + src.r * (1.0f - dst.a) + dst.r * (1.0f - src.a);
  } else if (0.0f == src.r) {
    out.r = dst.r * (1.0f - src.a);
  } else {
    d = fmax(0.0f, dst.a - (dst.a - dst.r) * src.a / src.r); // (src.r + gDivisorGuard)
    out.r = src.a * d + src.r * (1.0f - dst.a) + dst.r * (1.0f - src.a);
  }

  if (dst.a == dst.g) {
    out.g = src.a * dst.a + src.g * (1.0f - dst.a) + dst.g * (1.0f - src.a);
  } else if (0.0f == src.g) {
    out.g = dst.g * (1.0f - src.a);
  } else {
    d = fmax(0.0f, dst.a - (dst.a - dst.g) * src.a / src.g); // (src.g + gDivisorGuard)
    out.g = src.a * d + src.g * (1.0f - dst.a) + dst.g * (1.0f - src.a);
  }

  if (dst.a == dst.b) {
    out.b = src.a * dst.a + src.b * (1.0f - dst.a) + dst.b * (1.0f - src.a);
  } else if (0.0f == src.b) {
    out.b = dst.b * (1.0f - src.a);
  } else {
    d = fmax(0.0f, dst.a - (dst.a - dst.b) * src.a / src.b); // (src.b + gDivisorGuard)
    out.b = src.a * d + src.b * (1.0f - dst.a) + dst.b * (1.0f - src.a);
  }

  return out;
}

uchar4 RS_KERNEL root(uchar4 dst, uint32_t x, uint32_t y) {
  float4 dstColor = rsUnpackColor8888(dst);
  float4 srcColor = rsUnpackColor8888(*(const uchar4*)rsGetElementAt(gSrc, x, y));
  float4 outColor = colorBurn(dstColor, srcColor);

  return rsPackColorTo8888(outColor);
}
