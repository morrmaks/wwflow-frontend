const THEMES = ['light', 'dark', 'system'] as const;
type Theme = (typeof THEMES)[number];

type ResolvedTheme = Exclude<Theme, 'system'>;

export { type ResolvedTheme, type Theme, THEMES };
