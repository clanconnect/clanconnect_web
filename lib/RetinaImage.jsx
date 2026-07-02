'use client';
/**
 * Drop-in replacement for `react-retina-image`, which is incompatible with
 * React 19 (it relies on removed legacy ref behaviour and crashes at runtime).
 * Accepts the same `src` prop (string or [1x, 2x, 3x] array) and renders a
 * plain <img> with a srcSet so the browser picks the right density.
 */
import React from 'react';

const RetinaImage = ({ src, checkIfRetinaImgExists, forceOriginalDimensions, initialImage, ...rest }) => {
  const sources = (Array.isArray(src) ? src : [src]).filter(Boolean);
  if (sources.length === 0) return null;

  const srcSet =
    sources.length > 1 ? sources.map((s, i) => `${s} ${i + 1}x`).join(', ') : undefined;

  return <img src={sources[0]} srcSet={srcSet} {...rest} />;
};

export default RetinaImage;
