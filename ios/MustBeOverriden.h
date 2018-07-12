#ifndef MustBeOverriden_h
#define MustBeOverriden_h

#define MUST_BE_OVERRIDEN()                                                                                                                             \
NSString *reason = [NSString stringWithFormat:@"Method %@ must be overriden in %@ class", NSStringFromSelector(_cmd), NSStringFromClass([self class])]; \
@throw [NSException exceptionWithName:NSInternalInconsistencyException reason:reason userInfo:nil];

#endif /* MustBeOverriden_h */
