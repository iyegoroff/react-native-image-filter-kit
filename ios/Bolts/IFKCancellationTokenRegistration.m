/*
 *  Copyright (c) 2014, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 */

#import "IFKCancellationTokenRegistration.h"

#import "IFKCancellationToken.h"

NS_ASSUME_NONNULL_BEGIN

@interface IFKCancellationTokenRegistration ()

@property (nonatomic, weak) IFKCancellationToken *token;
@property (nullable, nonatomic, strong) IFKCancellationBlock cancellationObserverBlock;
@property (nonatomic, strong) NSObject *lock;
@property (nonatomic) BOOL disposed;

@end

@interface IFKCancellationToken (IFKCancellationTokenRegistration)

- (void)unregisterRegistration:(IFKCancellationTokenRegistration *)registration;

@end

@implementation IFKCancellationTokenRegistration

+ (instancetype)registrationWithToken:(IFKCancellationToken *)token delegate:(IFKCancellationBlock)delegate {
    IFKCancellationTokenRegistration *registration = [IFKCancellationTokenRegistration new];
    registration.token = token;
    registration.cancellationObserverBlock = delegate;
    return registration;
}

- (instancetype)init {
    self = [super init];
    if (!self) return self;

    _lock = [NSObject new];
    
    return self;
}

- (void)dispose {
    @synchronized(self.lock) {
        if (self.disposed) {
            return;
        }
        self.disposed = YES;
    }

    IFKCancellationToken *token = self.token;
    if (token != nil) {
        [token unregisterRegistration:self];
        self.token = nil;
    }
    self.cancellationObserverBlock = nil;
}

- (void)notifyDelegate {
    @synchronized(self.lock) {
        [self throwIfDisposed];
        self.cancellationObserverBlock();
    }
}

- (void)throwIfDisposed {
    NSAssert(!self.disposed, @"Object already disposed");
}

@end

NS_ASSUME_NONNULL_END
