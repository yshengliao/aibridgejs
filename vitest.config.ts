import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      include: ["src/**/*.ts"],
      exclude: ["src/index.ts", "src/types.ts"],
      thresholds: {
        // Vitest 4 + v8 coverage scores defensive race-recovery if-guards
        // (e.g. `if (!current) return;` in timeout/abort/post handlers) as
        // separate statements that are not deterministically reachable.
        // Lines and functions remain at 100% so any genuinely dead code
        // still trips the gate.
        statements: 95,
        branches: 90,
        functions: 100,
        lines: 100,
      },
    },
    typecheck: {
      enabled: false,
    },
  },
});
