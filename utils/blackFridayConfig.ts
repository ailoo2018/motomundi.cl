// ─────────────────────────────────────────────────────────────
//  Black Friday campaign settings: the ONE place to configure it.
//
//  enabled → turns on the "Black Friday -X%" tag and the countdown
//            on product cards and on the product detail page.
//  endsAt  → when the countdown reaches zero (Chile time, UTC-3 in
//            November). The countdown hides itself after this.
// ─────────────────────────────────────────────────────────────
export const BLACK_FRIDAY = {
  enabled: false,
  endsAt: '2026-11-28T23:59:59-03:00',
} as const
