// Legacy: interleaved per-wave fetch (use default scan instead for per-board 5–20).
process.env.SCAN_STRATEGY = 'round_robin';
await import('./scan-greenhouse.mjs');
