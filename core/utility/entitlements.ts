/**
 * Entitlement limit helpers.
 *
 * Numeric entitlements returned by /get/subscription/plans/detail use `-1` as
 * the "Unlimited" sentinel. Anything >= 0 is a hard cap (0 = feature
 * unavailable). Mirrors clanconnect_2.0's core/utility/entitlements.ts so the
 * public pricing page and the in-app subscription tab print the same numbers.
 */

export const UNLIMITED_ENTITLEMENT = -1;

/** true when the entitlement value means "no cap". */
export const isUnlimitedEntitlement = (value: any): boolean => {
  const n = Number(value);
  return Number.isFinite(n) && n < 0;
};

/** Normalises a raw entitlement value to a number (missing/NaN -> fallback). */
export const entitlementLimit = (value: any, fallback = 0): number => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

/** Human-readable limit for labels ("Unlimited" / "1,000"). */
export const formatEntitlementLimit = (value: any): string => {
  if (isUnlimitedEntitlement(value)) return 'Unlimited';
  return entitlementLimit(value, 0).toLocaleString();
};
