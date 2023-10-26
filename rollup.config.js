import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import css from "rollup-plugin-import-css";
import { copy } from '@web/rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import summary from 'rollup-plugin-summary';

export default {
  plugins: [
    html({
      input: ['index.html', 'pages/*.html', 'components/**/*.html']
    }),
    css(),
    resolve(),
    summary(),
    copy({
      patterns: ['images/**/*'],
    }),
  ],
  output: {
    dir: 'build',
  },
  preserveEntrySignatures: 'strict',
};