package iyegoroff.imagefilterkit.nativeplatform;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.Typeface;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.views.text.ReactFontManager;

import org.json.JSONObject;

import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.utility.GeneratorPostProcessor;

public class TextImagePostProcessor extends GeneratorPostProcessor {

  private @Nonnull final String mText;
  private @Nullable final String mFontName;
  private final float mFontSize;
  private final int mColor;

  private @Nullable final Typeface mTypeface;

  public TextImagePostProcessor(
    int width,
    int height,
    @Nullable JSONObject config,
    final Context context
  ) {
    super(width, height, config);

    InputConverter converter = new InputConverter(width, height);

    mText = converter.convertText(config, "text", "");
    mFontName = converter.convertText(config, "fontName", null);
    mFontSize = converter.convertDistance(config, "fontSize", "16");
    mColor = converter.convertColor(config, "color", Color.BLACK);

    mTypeface = ReactFontManager.getInstance()
      .getTypeface(mFontName, Typeface.NORMAL, context.getAssets());
  }

  @Override
  public String getName() {
    return "TextImagePostProcessor";
  }

  @Override
  public void processGenerated(@Nonnull Paint paint, @Nonnull Canvas canvas) {
    paint.setTypeface(mTypeface);
    paint.setAntiAlias(true);
    paint.setColor(mColor);
    paint.setTextAlign(Paint.Align.LEFT);
    paint.setTextSize(PixelUtil.toPixelFromDIP(mFontSize));

    Rect bounds = new Rect();
    paint.getTextBounds(mText, 0, mText.length(), bounds);

    canvas.drawText(
      mText,
      mWidth / 2.0f - bounds.width() / 2.0f - bounds.left,
      mHeight / 2.0f + bounds.height() / 2.0f - bounds.bottom,
      paint
    );
  }

  @Nonnull
  @Override
  public CacheKey generateCacheKey() {
    return new SimpleCacheKey(
      String.format(
        Locale.ROOT,
        "text_image_%s_%s_%f_%d_%d_%d",
        mText,
        mFontName,
        mFontSize,
        mColor,
        mWidth,
        mHeight
      )
    );
  }
}
