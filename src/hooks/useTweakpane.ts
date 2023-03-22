import { Pane } from 'tweakpane';
export * from 'tweakpane';

const tweakpaneMap = new Map<string, Pane>();

/** 调试面板hook */
export const useTweakpane = (key: string) => {
  if (tweakpaneMap.has(key)) {
    return tweakpaneMap.get(key);
  } else {
    tweakpaneMap.set(key, new Pane({ title: `🎉 Littlesmart3 Pane 🎉` }));
    return tweakpaneMap.get(key);
  }
};
