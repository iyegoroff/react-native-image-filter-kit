/*
 *  Copyright (c) 2014, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in this directory. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 */

#import "IFKCancellationTokenSource.h"

#import "IFKCancellationToken.h"

NS_ASSUME_NONNULL_BEGIN

@interface IFKCancellationToken (IFKCancellationTokenSource)

- (void)cancel;
- (void)cancelAfterDelay:(int)millis;

- (void)dispose;
- (void)throwIfDisposed;

@end

@implementation IFKCancellationTokenSource

#pragma mark - Initializer

- (instancetype)init {
    self = [super init];
    if (!self) return self;

    _token = [IFKCancellationToken new];

    return self;
}

+ (instancetype)cancellationTokenSource {
    return [IFKCancellationTokenSource new];
}

#pragma mark - Custom Setters/Getters

- (BOOL)isCancellationRequested {
    return _token.isCancellationRequested;
}

- (void)cancel {
    [_token cancel];
}

- (void)cancelAfterDelay:(int)millis {
    [_token cancelAfterDelay:millis];
}

- (void)dispose {
    [_token dispose];
}

@end

NS_ASSUME_NONNULL_END
