package iyegoroff.RNImageFilterKit;

import android.content.Context;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.views.view.ReactViewGroup;

import javax.annotation.Nullable;
import javax.annotation.Nonnull;

public abstract class RNImageFilterBase extends ReactViewGroup {

  protected @Nullable String mName = null;
  protected @Nonnull String[] mParamTypes = {};
  protected @Nonnull String[] mParamNames = {};
  protected @Nonnull String[] mImageNames = {};

  protected @Nullable ReadableArray mMatrix;
  protected @Nullable String mRadius;
  protected @Nullable String mBlurRadius;
  protected @Nullable String mIterations;
  protected float mMul;
  protected float mAdd;
  protected float mColor;
  protected @Nullable String mX0;
  protected @Nullable String mY0;
  protected @Nullable String mX1;
  protected @Nullable String mY1;
  protected @Nullable ReadableArray mColors;
  protected @Nullable ReadableArray mLocations;
  protected @Nullable String mCenterX;
  protected @Nullable String mCenterY;
  protected @Nullable ReadableArray mStops;
  protected @Nullable String mTileMode;
  protected @Nullable String mMode;

  public RNImageFilterBase(Context context) {
    super(context);
  }

  protected abstract void runFilterPipeline();

  public void setParamTypes(@Nullable ReadableArray paramTypes) {
    if (paramTypes != null) {
      mParamTypes = new String[paramTypes.size()];

      for (int i = 0; i < mParamTypes.length; i++) {
        mParamTypes[i] = paramTypes.getString(i);
      }
    }
  }

  public void setParamNames(@Nullable ReadableArray imageNames) {
    if (imageNames != null) {
      mImageNames = new String[imageNames.size()];

      for (int i = 0; i < mImageNames.length; i++) {
        mImageNames[i] = imageNames.getString(i);
      }
    }
  }

  public void setImageNames(@Nullable ReadableArray paramNames) {
    if (paramNames != null) {
      mParamNames = new String[paramNames.size()];

      for (int i = 0; i < mParamNames.length; i++) {
        mParamNames[i] = paramNames.getString(i);
      }
    }
  }

  public void setName(String name) {
    mName = name;

    this.runFilterPipeline();
  }

  public void setMatrix(@Nullable ReadableArray matrix) {
    mMatrix = matrix;

    this.runFilterPipeline();
  }

  public void setRadius(@Nullable String radius) {
    mRadius = radius;

    this.runFilterPipeline();
  }

  public void setBlurRadius(@Nullable String blurRadius) {
    mBlurRadius = blurRadius;

    this.runFilterPipeline();
  }

  public void setIterations(@Nullable String iterations) {
    mIterations = iterations;

    this.runFilterPipeline();
  }

  public void setMul(float mul) {
    mMul = mul;

    this.runFilterPipeline();
  }

  public void setAdd(float add) {
    mAdd = add;

    this.runFilterPipeline();
  }

  public void setColor(float color) {
    mColor = color;

    this.runFilterPipeline();
  }

  public void setX0(@Nullable String x0) {
    mX0 = x0;

    this.runFilterPipeline();
  }

  public void setY0(@Nullable String y0) {
    mY0 = y0;

    this.runFilterPipeline();
  }

  public void setX1(@Nullable String x1) {
    mX1 = x1;

    this.runFilterPipeline();
  }

  public void setY1(@Nullable String y1) {
    mY1 = y1;

    this.runFilterPipeline();
  }

  public void setColors(@Nullable ReadableArray colors) {
    mColors = colors;

    this.runFilterPipeline();
  }

  public void setLocations(@Nullable ReadableArray locations) {
    mLocations = locations;

    this.runFilterPipeline();
  }

  public void setCenterX(@Nullable String centerX) {
    mCenterX = centerX;

    this.runFilterPipeline();
  }

  public void setCenterY(@Nullable String centerY) {
    mCenterY = centerY;

    this.runFilterPipeline();
  }

  public void setStops(@Nullable ReadableArray stops) {
    mStops = stops;

    this.runFilterPipeline();
  }

  public void setTileMode(@Nullable String tileMode) {
    mTileMode = tileMode;

    this.runFilterPipeline();
  }

  public void setMode(@Nullable String mode) {
    mMode = mode;

    this.runFilterPipeline();
  }
}
