import { Pane } from 'tweakpane';
export * from 'tweakpane';

const tweakpaneMap = new Map<string, Pane>();

/** 调试面板hook */
export const useTweakpane = (key: string) => {
  /** 获取/添加 tweakpane 实例 */
  const get = () => {
    if (tweakpaneMap.has(key)) {
      return tweakpaneMap.get(key);
    } else {
      tweakpaneMap.set(key, new Pane({ title: `🎉 Littlesmart3 Pane 🎉` }));
      return tweakpaneMap.get(key);
    }
  };
  /** 删除 tweakpane 实例 */
  const remove = () => {
    if (tweakpaneMap.has(key)) tweakpaneMap.delete(key);
  };
  return { get, remove };
};
