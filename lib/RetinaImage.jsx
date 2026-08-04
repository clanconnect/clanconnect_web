'use client';
/**
 * Compatibility shim for the old `react-retina-image` API (which was itself
 * replaced when it turned out to be incompatible with React 19).
 *
 * Call sites pass `src` as a [1x, 2x, 3x] array of hand-exported variants, e.g.
 * mamaearth.png (138x19), @2x (277x39), @3x (415x59).
 *
 * The two halves have to come from different files:
 *
 *   - `src` is the *highest*-resolution variant, so the optimizer has the most
 *     detail to downscale from and retina screens still get a sharp image.
 *   - `width`/`height` are the *1x* dimensions, because they define the layout
 *     size. This matters: the surrounding CSS sizes these logos with
 *     `max-height` and no width (`.case-study-logo`), so the rendered size falls
 *     back to the intrinsic size. Handing over the @3x file alone made every
 *     logo render ~3x too large. The original markup avoided this implicitly --
 *     an `x`-descriptor srcset is density-corrected back to the 1x size no
 *     matter which file the browser downloads.
 *
 * Kept as a shim rather than deleted so the existing call sites, which all pass
 * the array form, keep working untouched.
 */
import React from 'react';
import Img, { getIntrinsicSize } from '@/components/ui/Img';

const RetinaImage = ({
  src,
  checkIfRetinaImgExists,
  forceOriginalDimensions,
  initialImage,
  width,
  height,
  style,
  ...rest
}) => {
  const sources = (Array.isArray(src) ? src : [src]).filter(Boolean);
  if (sources.length === 0) return null;

  const baseSize = getIntrinsicSize(sources[0]);
  const best = sources[sources.length - 1];

  // Without 1x dimensions there is nothing to anchor the layout to, so fall back
  // to the 1x file itself rather than rendering the high-res one oversized.
  if (!baseSize && sources.length > 1 && width == null && height == null) {
    return <Img src={sources[0]} style={style} {...rest} />;
  }

  return (
    <Img
      src={best}
      width={width ?? baseSize?.width}
      height={height ?? baseSize?.height}
      style={
        baseSize
          ? {
              // These logos are sized by `max-height` with no width, so their
              // rendered width falls back to the intrinsic width of whatever the
              // optimizer served. next/image rounds each request up to the next
              // configured size (138 -> 256), and because the source here is the
              // @3x file it can actually satisfy that -- so the image would lay
              // out ~1.85x too wide. Cap it at the 1x width, which is the size
              // the design intends. `min()` keeps the global
              // `img { max-width: 100% }` behaviour on narrow viewports.
              maxWidth: `min(100%, ${baseSize.width}px)`,
              ...style,
            }
          : style
      }
      {...rest}
    />
  );
};

export default RetinaImage;
