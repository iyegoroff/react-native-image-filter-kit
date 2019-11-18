package iyegoroff.imagefilterkit;

import android.content.Context;
import android.graphics.Bitmap;
import android.net.Uri;

import androidx.annotation.NonNull;

import com.facebook.common.executors.UiThreadImmediateExecutorService;
import com.facebook.common.logging.FLog;
import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.image.CloseableBitmap;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.react.bridge.GuardedAsyncTask;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.common.ReactConstants;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.concurrent.Callable;

import bolts.Task;

class TempFileUtils {

  private static final String TEMP_FILE_SUFFIX = ".rnifk.png";

  static class CleanTask extends GuardedAsyncTask<Void, Void> implements FilenameFilter {
    private final File cacheDir;
    private final File externalCacheDir;
    private final String mSuffix;

    CleanTask(@NonNull ReactContext context, @NonNull String suffix) {
      //noinspection deprecation
      super(context);

      cacheDir = context.getCacheDir();
      externalCacheDir = context.getExternalCacheDir();
      mSuffix = suffix;
    }

    CleanTask(@NonNull ReactContext context) {
      this(context, TEMP_FILE_SUFFIX);
    }

    @Override
    protected void doInBackgroundGuarded(Void... params) {
      if (null != cacheDir) {
        cleanDirectory(cacheDir);
      }

      if (externalCacheDir != null) {
        cleanDirectory(externalCacheDir);
      }
    }

    @Override
    public final boolean accept(File dir, String filename) {
      return filename.endsWith(mSuffix);
    }

    private void cleanDirectory(@NonNull final File directory) {
      final File[] toDelete = directory.listFiles(this);

      if (toDelete != null) {
        for (File file : toDelete) {
          if (file.delete()) {
            FLog.w(
              ReactConstants.TAG,
              "ImageFilterKit: deleted file " + file.getAbsolutePath()
            );
          }
        }
      }
    }
  }

  static void writeFile(
    @NonNull final ReactContext context,
    @NonNull final CloseableReference<CloseableImage> ref,
    @NonNull final Functor.Arity1<String> sendUri,
    @NonNull final Functor.Arity1<String> sendError
  ) {
    CloseableReference<CloseableImage> cloned = ref.clone();

    Task.callInBackground((Callable<Void>) () -> {
      try {
        final File outputFile = createFile(context);
        final FileOutputStream fos = new FileOutputStream(outputFile);
        final Bitmap bitmap = ((CloseableBitmap) cloned.get()).getUnderlyingBitmap();

        bitmap.compress(Bitmap.CompressFormat.PNG, 100, fos);

        final String path = Uri.fromFile(outputFile).toString();

        FLog.w(ReactConstants.TAG, "ImageFilterKit: created file " + path);

        Task.call((Callable<Void>) () -> {
          sendUri.call(path);

          return null;
        }, UiThreadImmediateExecutorService.getInstance());

      } catch (Exception e) {
        Task.call((Callable<Void>) () -> {
          sendError.call(e.getMessage());

          return null;
        }, UiThreadImmediateExecutorService.getInstance());

      } finally {
        CloseableReference.closeSafely(cloned);
      }

      return null;
    });
  }

  @NonNull
  private static File createFile(@NonNull final Context context) throws IOException {
    final File externalCacheDir = context.getExternalCacheDir();
    final File internalCacheDir = context.getCacheDir();
    final File cacheDir;

    if (externalCacheDir == null && internalCacheDir == null) {
      throw new IOException("No cache directory available");
    }

    if (externalCacheDir == null) {
      cacheDir = internalCacheDir;
    } else if (internalCacheDir == null) {
      cacheDir = externalCacheDir;
    } else {
      cacheDir = externalCacheDir.getFreeSpace() > internalCacheDir.getFreeSpace() ?
        externalCacheDir : internalCacheDir;
    }

    return File.createTempFile("tmp", TEMP_FILE_SUFFIX, cacheDir);
  }
}
