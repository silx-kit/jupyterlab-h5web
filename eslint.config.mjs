import { createConfig, detectOpts } from '@esrf/eslint-config';
import { defineConfig, globalIgnores } from 'eslint/config';

const opts = detectOpts(import.meta.dirname);

const config = defineConfig([
  globalIgnores(['jupyterlab_h5web/', 'lib/']),
  ...createConfig(opts),
]);

export default config;
