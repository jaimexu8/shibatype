import { Theme } from "../interfaces/store.interface";

export const isStitchPreview = (): boolean =>
  process.env.STITCH_PREVIEW === "1" ||
  process.env.NODE_ENV === "stitch-preview";

export const STITCH_PREVIEW_THEMES: Theme[] = [
  {
    name: "dark",
    primaryColor: "#636669",
    secondaryColor: "#D6985C",
    backgroundColor: "#333437",
    primaryDark: "#2B2E31",
    primaryLight: "#636669",
  },
  {
    name: "cafe",
    primaryColor: "#dda15e",
    secondaryColor: "#fefae0",
    backgroundColor: "#763F0E",
    primaryDark: "#283618",
    primaryLight: "#606c38",
  },
  {
    name: "pine",
    primaryColor: "#dad7cd",
    secondaryColor: "#a3b18a",
    backgroundColor: "#588157",
    primaryDark: "#3a5a40",
    primaryLight: "#344e41",
  },
];

export const STITCH_PREVIEW_LEADERBOARD = [
  {
    displayName: "SwiftTyper",
    wpm: 142.5,
    accuracy: 98.2,
    testDate: "2026-06-15",
  },
  {
    displayName: "KeyNinja",
    wpm: 128.3,
    accuracy: 96.8,
    testDate: "2026-06-14",
  },
  {
    displayName: "WordRunner",
    wpm: 115.7,
    accuracy: 94.5,
    testDate: "2026-06-13",
  },
  {
    displayName: "TypeMaster",
    wpm: 108.2,
    accuracy: 97.1,
    testDate: "2026-06-12",
  },
  {
    displayName: "ShibaFan",
    wpm: 95.4,
    accuracy: 92.3,
    testDate: "2026-06-11",
  },
  {
    displayName: "CoffeeCoder",
    wpm: 88.6,
    accuracy: 91.0,
    testDate: "2026-06-10",
  },
  {
    displayName: "PineTypist",
    wpm: 82.1,
    accuracy: 89.5,
    testDate: "2026-06-09",
  },
  {
    displayName: "NightOwl",
    wpm: 76.3,
    accuracy: 88.2,
    testDate: "2026-06-08",
  },
  {
    displayName: "BeginnerBob",
    wpm: 65.8,
    accuracy: 85.0,
    testDate: "2026-06-07",
  },
  {
    displayName: "NewbieNina",
    wpm: 52.4,
    accuracy: 82.7,
    testDate: "2026-06-06",
  },
];
