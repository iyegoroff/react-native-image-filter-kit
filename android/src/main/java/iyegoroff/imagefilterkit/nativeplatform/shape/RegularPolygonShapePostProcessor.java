package iyegoroff.imagefilterkit.nativeplatform.shape;

import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.PointF;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.utility.GeneratorPostProcessor;

public class RegularPolygonShapePostProcessor extends GeneratorPostProcessor {

  private final float mCircumradius;
  private @Nonnull final float[] mBorderRadiuses;
  private final int mColor;

  public RegularPolygonShapePostProcessor(int width, int height, @Nullable JSONObject config) {
    super(width, height, config);

    InputConverter converter = new InputConverter(width, height);

    mCircumradius = converter.convertDistance(config, "circumradius", "50min");
    mBorderRadiuses = converter.convertDistanceVector(config , "borderRadiuses", new float[3]);
    mColor = converter.convertColor(config, "color", Color.BLACK);
  }

  @Override
  public String getName() {
    return "RegularPolygonShapePostProcessor";
  }

  @Override
  public void processGenerated(@Nonnull Paint paint, @Nonnull Canvas canvas) {
    paint.setFlags(Paint.ANTI_ALIAS_FLAG | Paint.DITHER_FLAG | Paint.FILTER_BITMAP_FLAG);
    paint.setColor(mColor);
    final float centerX = mWidth / 2.0f;
    final float centerY = mHeight / 2.0f;

    canvas.translate(centerX, centerY);

    final List<PointF> points = new ArrayList<>();
    points.add(new PointF(mCircumradius, 0));

    final int n = mBorderRadiuses.length;
    for (int i = 1; i < n; i++) {
      points.add(new PointF(
        (float) (mCircumradius * Math.cos(2.0 * Math.PI * i / n)),
        (float) (mCircumradius * Math.sin(2.0 * Math.PI * i / n))
      ));
    }

    final Path path = new Path();

    for (int i = 0; i < n; i++) {
      final PointF prev = points.get(i == 0 ? (n - 1) : (i - 1));
      final PointF cur = points.get(i);
      final PointF next = points.get(i == (n - 1) ? 0 : (i + 1));
      final double dist = Math.sqrt(Math.pow(prev.x - cur.x, 2) + Math.pow(prev.y - cur.y, 2));
      final float radius = mBorderRadiuses[i];
      final double fract = radius / dist;

      if (radius > 0) {
        final PointF target = new PointF(
          (float) (cur.x - (cur.x - prev.x) * fract),
          (float) (cur.y - (cur.y - prev.y) * fract)
        );

        if (i == 0) {
          path.moveTo(target.x, target.y);

        } else {
          path.lineTo(target.x, target.y);
        }

        path.quadTo(
          cur.x,
          cur.y,
          (float) (cur.x + (next.x - cur.x) * fract),
          (float) (cur.y + (next.y - cur.y) * fract)
        );

      } else if (i == 0) {
        path.moveTo(cur.x, cur.y);

      } else {
        path.lineTo(cur.x, cur.y);
      }
    }

    path.close();

    canvas.drawPath(path, paint);
  }

  @Nonnull
  @Override
  public CacheKey generateCacheKey() {
    return new SimpleCacheKey(
      String.format(
        Locale.ROOT,
        "regular_polygon_shape_%f_%s_%d_%d_%d",
        mCircumradius,
        Arrays.toString(mBorderRadiuses),
        mColor,
        mWidth,
        mHeight
      )
    );
  }
}
