#pragma version(1)
#pragma rs java_package_name(iyegoroff.imagefilterkit.hazeremoval)
#pragma rs_fp_relaxed

float slope;
float dist;
float4 color;

static inline float4 premultiply(const float4 col) {
  return (float4){
    col.r * col.a,
    col.g * col.a,
    col.b * col.a,
    col.a
  };
}

static inline float4 unpremultiply(const float4 col) {
  return col.a > 0.0f
    ? (float4){
      col.r / col.a,
      col.g / col.a,
      col.b / col.a,
      col.a
    }
    : col;
}

static inline float4 hazeRemoval(const float4 src, uint32_t y) {
  float d = y * slope + dist;

  return clamp(premultiply((unpremultiply(src) - d * color) / (1.0f - d)), 0.0f, 1.0f);
}

uchar4 RS_KERNEL filterImage(uchar4 src, uint32_t x, uint32_t y) {
  return rsPackColorTo8888(hazeRemoval(rsUnpackColor8888(src), y));
}
