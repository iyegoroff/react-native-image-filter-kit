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

  private static final String TEMP_FILE_PREFIX = "rnifk_";

  static class CleanTask extends GuardedAsyncTask<Void, Void> implements FilenameFilter {
    private final File cacheDir;
    private final File externalCacheDir;

    CleanTask(ReactContext context) {
      super(context);

      cacheDir = context.getCacheDir();
      externalCacheDir = context.getExternalCacheDir();
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
      return filename.startsWith(TEMP_FILE_PREFIX);
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

  static void writeTmpFile(
    @NonNull final ReactContext context,
    @NonNull final CloseableReference<CloseableImage> ref,
    @NonNull final Functor.Arity1<String> sendUri,
    @NonNull final Functor.Arity1<String> sendError
  ) {
    CloseableReference<CloseableImage> cloned = ref.clone();

    Task.callInBackground((Callable<Void>) () -> {
      try {
        final File outputFile = createTempFile(context);
        final FileOutputStream fos = new FileOutputStream(outputFile);
        final Bitmap bitmap = ((CloseableBitmap) cloned.get()).getUnderlyingBitmap();

        bitmap.compress(Bitmap.CompressFormat.PNG, 100, fos);

        Task.call((Callable<Void>) () -> {
          sendUri.call(Uri.fromFile(outputFile).toString());

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
  private static File createTempFile(@NonNull final Context context) throws IOException {
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

    return File.createTempFile(TEMP_FILE_PREFIX, ".rnifk.png", cacheDir);
  }
}
