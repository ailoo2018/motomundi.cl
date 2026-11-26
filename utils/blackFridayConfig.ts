// ─────────────────────────────────────────────────────────────
//  Black Friday campaign settings: the ONE place to configure it.
//
//  enabled  → master switch. false = Black Friday is off, whatever the dates.
//  startsAt → Black Friday turns on at this moment (Chile time, UTC-3 in November).
//  endsAt   → Black Friday turns off and the countdown reaches zero.
//
//  Black Friday is active only when enabled is true AND
//  startsAt <= now < endsAt. It switches on/off live in the browser,
//  no deploy needed when the dates arrive.
// ─────────────────────────────────────────────────────────────
export const BLACK_FRIDAY = {
  enabled: true,
  startsAt: '2026-11-27T00:00:00-03:00',
  endsAt: '2026-11-28T23:59:59-03:00',
} as const
