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

/* ---------------------------------------------------------------------
 * Boolean / set entitlements
 *
 * Mirrors clanconnect_2.0 src/core/utility/entitlements.ts and
 * clanconnect_mobile modules/shared/helper/entitlements.ts. The migrations
 * are explicit that these keys must never be read raw off a possibly-empty
 * entitlements object, so the public pricing page goes through the same
 * helpers as the two apps.
 * ------------------------------------------------------------------- */

/**
 * true when the plan may create automations for this content type
 * ('post' | 'story' | 'live'). Backed by the `allowed_content_types` array
 * entitlement — FOC carries 'post' only, every trial/paid plan carries
 * 'post,story,live'.
 *
 * An empty/missing list means "no restriction configured" and allows
 * everything, matching how the apps have always read it.
 */
export const isContentTypeAllowed = (entitlements: any, contentType: string): boolean => {
  const list = entitlements?.allowed_content_types;
  if (!Array.isArray(list) || list.length === 0) return true;
  return list.includes(contentType);
};

/**
 * The surfaces a plan may automate, rendered for a plan/pricing card:
 * "posts", "posts & stories", "posts, stories & live".
 *
 * Derived from isContentTypeAllowed() rather than re-reading the key, so the
 * card and the create-automation gate can never disagree. Moving the policy in
 * the DB re-labels the card with no release — the same reason the numeric
 * limits are read from entitlements instead of being hardcoded.
 */
export const formatAutomationSurfaces = (entitlements: any): string => {
  const surfaces = [
    isContentTypeAllowed(entitlements, 'post') ? 'posts' : null,
    isContentTypeAllowed(entitlements, 'story') ? 'stories' : null,
    isContentTypeAllowed(entitlements, 'live') ? 'live' : null,
  ].filter(Boolean) as string[];

  if (surfaces.length === 0) return 'posts';
  if (surfaces.length === 1) return surfaces[0];
  return `${surfaces.slice(0, -1).join(', ')} & ${surfaces[surfaces.length - 1]}`;
};

/**
 * true when the plan allows catch-all ("Any Post" / "Any Story") automations.
 * Backed by `any_media_automation_enabled` — FOC/Basic false, Trial and every
 * paid plan true. Missing reads as FALSE.
 */
export const isAnyMediaAutomationAllowed = (entitlements: any): boolean => {
  const v = entitlements?.any_media_automation_enabled;
  return v === true || v === 'true' || v === 1 || v === '1';
};

/**
 * true when the plan allows BUTTON TEMPLATES on a Zap rule — the opener card,
 * the link button on the delivered DM, and the "Ask to Follow" check. Backed by
 * `follow_gate_enabled`, whose scope widened on 2026-09-01 but whose name is
 * unchanged because plan_entitlements rows reference it in every environment.
 * FOC/Basic false, Trial and every paid plan true. Missing reads as FALSE.
 */
export const isFollowGateAllowed = (entitlements: any): boolean => {
  const v = entitlements?.follow_gate_enabled;
  return v === true || v === 'true' || v === 1 || v === '1';
};
