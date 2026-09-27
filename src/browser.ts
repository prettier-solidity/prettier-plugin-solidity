import plugin from './index.ts';

interface PluginsHost {
  prettierPlugins?: Record<string, unknown>;
}

// Node's global object, which TypeScript only declares with `@types/node`.
declare const global: PluginsHost | undefined;

// Loaded through a <script> tag, the standalone bundle registers itself on
// `prettierPlugins`, using the same global lookup as Prettier's UMD plugins.
const root = (
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof global !== 'undefined'
      ? global
      : typeof self !== 'undefined'
        ? self
        : this || {}
) as PluginsHost;
root.prettierPlugins ??= {};
root.prettierPlugins.solidity = plugin;

export default plugin;
