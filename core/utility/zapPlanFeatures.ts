import {
  formatEntitlementLimit,
  isUnlimitedEntitlement,
  formatAutomationSurfaces,
  isAnyMediaAutomationAllowed,
  isFollowGateAllowed,
} from './entitlements';

/**
 * The ZAP section of a subscription card, as plain strings.
 *
 * One builder for all three surfaces — Settings > Subscription on web, the
 * mobile Subscription screen, and the public pricing page — so the three can
 * never drift apart again. Everything is read from the plan's own
 * `entitlements` (plan_entitlements rows, served with the plan), so a limit
 * change in the DB needs no release.
 *
 * The wording here is the wording these cards have always used. An earlier
 * pass rewrote every line into wizard prose ("Ask people to follow you before
 * your DM", "One Zap that covers every post or story", "1 Zap running at once")
 * on the theory that the pricing page should speak the simplified wizard's
 * language. That was wrong on both counts: a pricing card wants short feature
 * NAMES a reader can scan, not sentences, and the free-tier lines were never
 * the problem. Those rewrites are reverted.
 *
 * The one real gap the pass did find is kept: `zap_forms_enabled` — the
 * wizard's "Collect leads" goal — is a paid feature that no plan card
 * mentioned, so people were buying it without being told.
 */
const isBasicPlanName = (planName?: string): boolean =>
  ['basic', 'foc'].includes((planName || '').toLowerCase());

export function zapPlanFeatures(entitlements: any, planName?: string): string[] {
  if (!entitlements) return [];
  const e = entitlements;
  const isBasic = isBasicPlanName(planName);
  const limit = (key: string) => formatEntitlementLimit(e?.[key]);

  const out: (string | null)[] = [
    // "Unlimited" replies never reset, so the daily-reset note is dropped.
    e.daily_interaction_limit != null
      ? `${limit('daily_interaction_limit')} comment replies/DMs${
          isUnlimitedEntitlement(e.daily_interaction_limit) ? '' : ' (resets daily)'
        }`
      : null,

    // The surfaces come off allowed_content_types, never hardcoded — FOC is
    // 'post' only while every trial/paid plan is 'post,story,live'.
    e.max_active_automation_posts != null
      ? `${limit('max_active_automation_posts')} active automation (${formatAutomationSurfaces(e)})`
      : null,

    e.max_dm_rules != null ? `${limit('max_dm_rules')} rule per automation` : null,

    e.max_keywords_per_rule != null
      ? `${limit('max_keywords_per_rule')} trigger keyword per rule`
      : null,

    !isBasic && e.zap_link_limit != null ? `${limit('zap_link_limit')} zap links per rule` : null,

    // Catch-all zaps and button templates go through the entitlement helpers,
    // never the raw key — see 2026-08-30_any_media_automation_entitlement.sql.
    isAnyMediaAutomationAllowed(e) ? 'Any Post / Any Story automations' : null,
    isFollowGateAllowed(e) ? 'Ask to Follow & button messages' : null,

    // The line that was genuinely missing before.
    e.zap_forms_enabled ? 'Lead collection forms' : null,

    !isBasic ? 'No ClanConnect Branding' : null,
    e.storefront_enabled ? 'Zap Storefront' : null,
    e.link_in_bio_enabled ? 'Zap Link in Bio' : null,
  ];

  return out.filter((x): x is string => !!x);
}

/** Heading above the list. */
export const zapPlanHeading = (planName?: string): string =>
  isBasicPlanName(planName) ? 'ZAP BASIC' : 'ZAP PRO';
