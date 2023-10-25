// Import rollup plugins
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import css from "rollup-plugin-import-css";
import { copy } from '@web/rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import summary from 'rollup-plugin-summary';

export default {
  plugins: [
    // Entry point for application build; can specify a glob to build multiple
    // HTML files for non-SPA app
    html({
      input: ['index.html', 'pages/*.html', 'components/**/*.html']
    }),
    css(),
    // Resolve bare module specifiers to relative paths
    resolve(),
    // Print bundle summary
    summary(),
    // Optional: copy any static assets to build directory
    copy({
      patterns: ['images/**/*'],
    }),
  ],
  output: {
    dir: 'build',
  },
  preserveEntrySignatures: 'strict',
};