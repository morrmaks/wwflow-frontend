// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { eslint } from '@siberiacancode/eslint';

export default eslint({
  next: true,
  typescript: true,
  rules: {
    'node/prefer-global/process': ['error', 'always'],
    'node/prefer-global/buffer': ['error', 'always']
  }
});
