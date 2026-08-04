/**
 * Drop-in replacement for raw <img>, backed by next/image.
 *
 * The site sizes images entirely through SCSS classes and stores its ~700 image
 * paths as plain strings, so the two things next/image needs -- intrinsic
 * dimensions and a `sizes` hint -- are resolved here instead of at every call
 * site:
 *
 *   - Dimensions come from lib/generated/image-manifest.json (measured at build
 *     time by scripts/generate-image-manifest.mjs). They set the aspect ratio so
 *     the browser can reserve layout space; the rendered size still comes from
 *     the existing CSS.
 *   - `sizes` is passed only by call sites that know their layout (the card
 *     grids, the banners). It is deliberately NOT defaulted -- see the comment
 *     on the `sizes` prop below for why a default corrupts small images. Where
 *     it matters, pass one, e.g.
 *     sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 33vw".
 *
 * Not marked 'use client' on purpose, so it works in both server and client
 * components.
 */
import React from "react";
import NextImage from "next/image";
import manifest from "@/lib/generated/image-manifest.json";

const isRemote = (src) => /^https?:\/\//i.test(src);

/** Looks up build-time measured dimensions for a public/ path. */
export function getIntrinsicSize(src) {
  if (!src || isRemote(src)) return null;
  const key = src.split(/[?#]/)[0];
  const dims = manifest[key] || manifest[`/${key.replace(/^\/+/, "")}`];
  return dims ? { width: dims[0], height: dims[1] } : null;
}

const Img = ({
  src,
  alt = "",
  width,
  height,
  sizes,
  fill = false,
  priority = false,
  className,
  style,
  ...rest
}) => {
  if (!src) return null;

  // `fill` is for images in a fixed-size, positioned box (object-fit: cover
  // cards). Dimensions are irrelevant there, so hand off directly.
  if (fill) {
    return (
      <NextImage
        src={src}
        alt={alt}
        fill
        sizes={sizes || "100vw"}
        priority={priority}
        className={className}
        style={style}
        {...rest}
      />
    );
  }

  const intrinsic = getIntrinsicSize(src);

  // Several call sites carry over a single `width` (or `height`) attribute from
  // the old markup, where the browser derived the other from the file. Mixing an
  // explicit width with the *intrinsic* height would set a wrong aspect ratio,
  // so derive the missing side from the real one instead.
  let resolvedWidth = width ?? intrinsic?.width;
  let resolvedHeight = height ?? intrinsic?.height;
  if (intrinsic && width != null && height == null) {
    resolvedHeight = Math.round((Number(width) * intrinsic.height) / intrinsic.width);
  } else if (intrinsic && height != null && width == null) {
    resolvedWidth = Math.round((Number(height) * intrinsic.width) / intrinsic.height);
  }

  // Unmeasurable source (remote URL with no explicit dimensions, or a path built
  // at runtime). Fall back to a plain <img> rather than guessing an aspect ratio
  // and distorting it -- still lazy, just not resized. Use `fill` at the call
  // site when the container has a fixed box and you want these optimized too.
  if (!resolvedWidth || !resolvedHeight) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        className={className}
        style={style}
        {...rest}
      />
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={resolvedWidth}
      height={resolvedHeight}
      // Only pass `sizes` when the call site actually knows the layout.
      //
      // Defaulting it is a trap: `sizes` switches next/image to a
      // width-descriptor srcset, and a `sizes` containing a vw unit narrows the
      // candidates to deviceSizes (>= 640px here). The optimizer never upscales,
      // so for a source narrower than that -- every logo, badge and icon -- a
      // candidate advertised as "640w" actually returns the original 186px file.
      // The browser trusts the descriptor, back-computes the density, and lays
      // the image out at 186/(640/186) ~= 54px. Omitting `sizes` instead yields
      // an `x`-descriptor srcset (1x/2x of the intrinsic width), which is both
      // honest and exactly how the plain <img> behaved.
      sizes={sizes}
      priority={priority}
      className={className}
      style={style}
      {...rest}
    />
  );
};

export default Img;
