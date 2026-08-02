const themeInitScript = `
  (function () {
    try {
      var root = document.documentElement;

      var match = document.cookie.match(/theme=(light|dark|system)/);
      var theme = match ? match[1] : 'system';

      var resolved =
        theme === 'system'
          ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          : theme;

      root.classList.remove('light', 'dark');
      root.classList.add(resolved);
      root.style.colorScheme = resolved;

    } catch (_) {}
  })();
`;

export { themeInitScript };
