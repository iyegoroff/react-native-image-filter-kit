package iyegoroff.imagefilterkit;

import com.facebook.common.memory.MemoryTrimType;
import com.facebook.common.memory.MemoryTrimmable;
import com.facebook.common.memory.MemoryTrimmableRegistry;

import java.util.LinkedList;
import java.util.List;

public class MemoryTrimmer implements MemoryTrimmableRegistry {

  private static final MemoryTrimmer sInstance =
    new MemoryTrimmer();

  public static MemoryTrimmer getInstance() {
    return sInstance;
  }

  private MemoryTrimmer() {
  }

  private final List<MemoryTrimmable> mTrimmables = new LinkedList<>();

  @Override
  public void registerMemoryTrimmable(final MemoryTrimmable trimmable) {
    mTrimmables.add(trimmable);
  }

  @Override
  public void unregisterMemoryTrimmable(final MemoryTrimmable trimmable) {
    mTrimmables.remove(trimmable);
  }

  public synchronized void trim(final MemoryTrimType trimType) {
    for (MemoryTrimmable trimmable : mTrimmables) {
      trimmable.trim(trimType);
    }
  }

  public boolean isUsed() {
    return !mTrimmables.isEmpty();
  }
}
