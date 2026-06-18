#!/usr/bin/env npx tsx
/**
 * Capture Stitch preview HTML for all Shibatype routes.
 *
 * Requires:
 * - MongoDB running with URI in root .env
 * - API server on http://localhost:3000
 * - Vite dev server on http://localhost:5173 (proxies /api to the backend)
 *
 * Usage:
 *   npm run stitch:capture
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const snapshotScript = path.resolve(
  rootDir,
  ".cursor/skills/extract-static-html/scripts/snapshot.ts"
);

interface PageCapture {
  url: string;
  output: string;
  title: string;
  wait: number;
  waitForSelector?: string;
}

const PAGES: PageCapture[] = [
  {
    url: "http://localhost:5173/",
    output: ".stitch/home.html",
    title: "Shibatype - Typing Test",
    wait: 2000,
  },
  {
    url: "http://localhost:5173/leaderboard",
    output: ".stitch/leaderboard.html",
    title: "Shibatype - Leaderboard",
    wait: 1000,
    waitForSelector: "tbody tr",
  },
  {
    url: "http://localhost:5173/store",
    output: ".stitch/store.html",
    title: "Shibatype - Store",
    wait: 1000,
    waitForSelector: "h3",
  },
  {
    url: "http://localhost:5173/account",
    output: ".stitch/account.html",
    title: "Shibatype - Account",
    wait: 1500,
    waitForSelector: "input[type='email'], input[type='password']",
  },
];

async function waitForUrl(
  url: string,
  label: string,
  attempts = 30,
  delayMs = 1000
): Promise<void> {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url, { method: "GET" });
      if (response.ok || response.status < 500) {
        console.log(`✓ ${label} is reachable at ${url}`);
        return;
      }
    } catch {
      // retry
    }

    if (attempt === attempts) {
      throw new Error(`${label} is not reachable at ${url}`);
    }

    console.log(
      `Waiting for ${label} (${attempt}/${attempts}) at ${url}...`
    );
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
}

function runSnapshot(page: PageCapture): void {
  const args = [
    snapshotScript,
    "--url",
    page.url,
    "--output",
    path.resolve(rootDir, page.output),
    "--title",
    page.title,
    "--wait",
    String(page.wait),
  ];

  if (page.waitForSelector) {
    args.push("--wait-for-selector", page.waitForSelector);
    args.push("--wait-for-selector-timeout", "20000");
  }

  console.log(`\nCapturing ${page.output} from ${page.url}`);

  const tsxCli = path.join(rootDir, "node_modules", "tsx", "dist", "cli.mjs");
  const result = spawnSync(process.execPath, [tsxCli, ...args], {
    cwd: rootDir,
    stdio: "inherit",
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`Snapshot failed for ${page.url}`);
  }
}

async function main(): Promise<void> {
  console.log("Checking prerequisites...");

  await waitForUrl("http://localhost:3000/api/store/themes", "API server");
  await waitForUrl("http://localhost:5173/", "Vite dev server");

  const themesResponse = await fetch("http://localhost:3000/api/store/themes");
  const themesData = await themesResponse.json();
  const themeCount = Array.isArray(themesData.themes)
    ? themesData.themes.length
    : 0;

  if (themeCount === 0) {
    throw new Error(
      "No themes returned from the API. Start the server with preview data: npm run stitch:dev:server"
    );
  }

  const leaderboardResponse = await fetch(
    "http://localhost:3000/api/test/leaderboard/?sortOrder=-1&count=10"
  );
  const leaderboardData = await leaderboardResponse.json();
  if (!Array.isArray(leaderboardData) || leaderboardData.length === 0) {
    throw new Error(
      "Leaderboard API returned no rows. Start the server with preview data: npm run stitch:dev:server"
    );
  }

  console.log(
    `API data ready (${themeCount} themes, ${leaderboardData.length} leaderboard entries)`
  );

  for (const page of PAGES) {
    runSnapshot(page);
  }

  console.log("\nAll Stitch captures written to .stitch/");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
