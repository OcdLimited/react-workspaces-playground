import React, { ReactNode } from 'react';

export const isFunction = (obj: unknown): obj is Function => typeof obj === 'function';

export const isEmptyChildren = (children: ReactNode): boolean => React.Children.count(children) === 0;
