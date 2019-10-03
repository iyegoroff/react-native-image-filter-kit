package iyegoroff.imagefilterkit.nativeplatform.shape;

import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import org.json.JSONObject;

import java.util.Locale;
import java.util.Objects;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.utility.GeneratorPostProcessor;

public class PathShapePostProcessor extends GeneratorPostProcessor {

  private @Nonnull final Path mPath;
  private @Nonnull final String mPathAsString;
  private final int mColor;

  public PathShapePostProcessor(int width, int height, @Nullable JSONObject config) {
    super(width, height, config);

    InputConverter converter = new InputConverter(width, height);

    mPath = converter.convertPath(config, "path", new Path());
    mPathAsString = Objects.requireNonNull(
      (config != null && config.optJSONObject("path") != null) ? config.optJSONObject("path") : ""
    ).toString();
    mColor = converter.convertColor(config, "color", Color.BLACK);
  }

  @Override
  public String getName() {
    return "PathShapePostProcessor";
  }

  @Override
  public void processGenerated(@Nonnull Paint paint, @Nonnull Canvas canvas) {
    paint.setFlags(Paint.ANTI_ALIAS_FLAG | Paint.DITHER_FLAG | Paint.FILTER_BITMAP_FLAG);
    paint.setColor(mColor);
    final float centerX = mWidth / 2.0f;
    final float centerY = mHeight / 2.0f;

    canvas.scale(1.0f, -1.0f, centerX, centerY);
    canvas.translate(centerX, centerY);

    canvas.drawPath(mPath, paint);
  }

  @Nonnull
  @Override
  public CacheKey generateCacheKey() {
    return new SimpleCacheKey(
      String.format(Locale.ROOT, "path_shape_%s_%d_%d_%d", mPathAsString, mColor, mWidth, mHeight)
    );
  }
}
