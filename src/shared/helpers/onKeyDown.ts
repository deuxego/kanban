import React from 'react';

export const onKeyDown = (
  key: string,
  e: React.KeyboardEvent<HTMLInputElement>,
  callback: () => void
) => {
  if (e.key === key) {
    callback();
  }
};
