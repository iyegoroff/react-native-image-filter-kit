#pragma version(1)
#pragma rs java_package_name(iyegoroff.imagefilterkit.blend)
#pragma rs_fp_relaxed

rs_allocation gSrc;
// float gDivisorGuard = 0.00000001f;

static float4 colorDodge(const float4 dst, const float4 src) {
  float4 out;
  float d;

  out.a = src.a + (1.0f - src.a) * dst.a;

  if (0.0f == dst.r) {
    out.r = src.r * (1.0f - dst.a);
  } else {
    d = src.a - src.r;
    if (0.0f == d) {
      out.r = src.a * dst.a + src.r * (1.0f - dst.a) + dst.r * (1.0f - src.a);
    } else {
      d = fmin(dst.a, dst.r * src.a / d); // (d + gDivisorGuard));
      out.r = d * src.a + src.r * (1.0f - dst.a) + dst.r * (1.0f - src.a);
    }
  }

  if (0.0f == dst.g) {
    out.g = src.g * (1.0f - dst.a);
  } else {
    d = src.a - src.g;
    if (0.0f == d) {
      out.g = src.a * dst.a + src.g * (1.0f - dst.a) + dst.g * (1.0f - src.a);
    } else {
      d = fmin(dst.a, dst.g * src.a / d); // (d + gDivisorGuard));
      out.g = d * src.a + src.g * (1.0f - dst.a) + dst.g * (1.0f - src.a);
    }
  }


  if (0.0f == dst.b) {
    out.b = src.b * (1.0f - dst.a);
  } else {
    d = src.a - src.b;
    if (0.0f == d) {
      out.b = src.a * dst.a + src.b * (1.0f - dst.a) + dst.b * (1.0f - src.a);
    } else {
      d = fmin(dst.a, dst.b * src.a / d); // (d + gDivisorGuard));
      out.b = d * src.a + src.b * (1.0f - dst.a) + dst.b * (1.0f - src.a);
    }
  }

  return out;
}

uchar4 RS_KERNEL root(uchar4 dst, uint32_t x, uint32_t y) {
  float4 dstColor = rsUnpackColor8888(dst);
  float4 srcColor = rsUnpackColor8888(*(const uchar4*)rsGetElementAt(gSrc, x, y));
  float4 outColor = colorDodge(dstColor, srcColor);

  return rsPackColorTo8888(outColor);
}
