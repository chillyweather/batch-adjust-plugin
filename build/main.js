var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@create-figma-plugin/utilities/lib/events.js
function on(name, handler) {
  const id = `${currentId}`;
  currentId += 1;
  eventHandlers[id] = { handler, name };
  return function() {
    delete eventHandlers[id];
  };
}
function invokeEventHandler(name, args) {
  let invoked = false;
  for (const id in eventHandlers) {
    if (eventHandlers[id].name === name) {
      eventHandlers[id].handler.apply(null, args);
      invoked = true;
    }
  }
  if (invoked === false) {
    throw new Error(`No event handler with name \`${name}\``);
  }
}
var eventHandlers, currentId, emit;
var init_events = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/events.js"() {
    eventHandlers = {};
    currentId = 0;
    emit = typeof window === "undefined" ? function(name, ...args) {
      figma.ui.postMessage([name, ...args]);
    } : function(name, ...args) {
      window.parent.postMessage({
        pluginMessage: [name, ...args]
      }, "*");
    };
    if (typeof window === "undefined") {
      figma.ui.onmessage = function(args) {
        if (!Array.isArray(args)) {
          return;
        }
        const [name, ...rest] = args;
        if (typeof name !== "string") {
          return;
        }
        invokeEventHandler(name, rest);
      };
    } else {
      window.onmessage = function(event) {
        if (typeof event.data.pluginMessage === "undefined") {
          return;
        }
        const args = event.data.pluginMessage;
        if (!Array.isArray(args)) {
          return;
        }
        const [name, ...rest] = event.data.pluginMessage;
        if (typeof name !== "string") {
          return;
        }
        invokeEventHandler(name, rest);
      };
    }
  }
});

// node_modules/@create-figma-plugin/utilities/lib/ui.js
function showUI(options, data) {
  if (typeof __html__ === "undefined") {
    throw new Error("No UI defined");
  }
  const html = `<div id="create-figma-plugin"></div><script>document.body.classList.add('theme-${figma.editorType}');const __FIGMA_COMMAND__='${typeof figma.command === "undefined" ? "" : figma.command}';const __SHOW_UI_DATA__=${JSON.stringify(typeof data === "undefined" ? {} : data)};${__html__}</script>`;
  figma.showUI(html, __spreadProps(__spreadValues({}, options), {
    themeColors: typeof options.themeColors === "undefined" ? true : options.themeColors
  }));
}
var init_ui = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/ui.js"() {
  }
});

// node_modules/@create-figma-plugin/utilities/lib/index.js
var init_lib = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/index.js"() {
    init_events();
    init_ui();
  }
});

// src/rgbToHsl.ts
function RGBToHSL(r, g, b) {
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s ? l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s)) : 0),
    100 * (2 * l - s) / 2
  ];
}
var init_rgbToHsl = __esm({
  "src/rgbToHsl.ts"() {
    "use strict";
  }
});

// src/colorAdjustmentCore.ts
function colorAdjustmentUI(color, hueShift = 0, saturationShift = 0, lightnessShift = 0) {
  const rgba = figma.util.rgba;
  const hsl = (h2, s2, l2, a = 100) => `hsl(${h2} ${s2}% ${l2}% / ${a}%)`;
  const hslColor = RGBToHSL(color.r, color.g, color.b);
  const h = Math.round(hslColor[0]);
  const s = Math.round(hslColor[1]);
  const l = Math.round(hslColor[2]);
  const newHue = h + hueShift > 360 ? h + hueShift - 360 : h + hueShift;
  const newSaturation = s + saturationShift > 100 ? 100 : s + saturationShift;
  const newLightness = l + lightnessShift > 100 ? 100 : l + lightnessShift;
  const newRGB = rgba(hsl(newHue, newSaturation, newLightness));
  return newRGB;
}
var init_colorAdjustmentCore = __esm({
  "src/colorAdjustmentCore.ts"() {
    "use strict";
    init_rgbToHsl();
  }
});

// src/propertyChecker.ts
function checkForVariableAlias(valuesByMode) {
  for (const mode in valuesByMode) {
    const values = valuesByMode[mode];
    if (!values.type)
      return true;
  }
  return false;
}
var init_propertyChecker = __esm({
  "src/propertyChecker.ts"() {
    "use strict";
  }
});

// src/getVarData.ts
function getVarData() {
  const vars = figma.variables.getLocalVariables().filter((v) => v.resolvedType === "COLOR").filter((v) => checkForVariableAlias(v.valuesByMode));
  const varData = vars.map((v) => {
    return {
      id: v.id,
      name: v.name,
      valuesByMode: v.valuesByMode,
      key: v.key
    };
  });
  return varData;
}
var init_getVarData = __esm({
  "src/getVarData.ts"() {
    "use strict";
    init_propertyChecker();
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
function main_default() {
  const varData = getVarData();
  emit("SET_VAR_DATA", varData);
  on("APPLY", (data) => {
    data.forEach((item) => {
      const foundVar = figma.variables.getVariableById(item.id);
      const key = Object.keys(item.valuesByMode)[0];
      const value = Object.values(item.valuesByMode)[0];
      foundVar == null ? void 0 : foundVar.setValueForMode(key, value);
    });
    figma.closePlugin();
  });
  on(
    "SHIFT",
    (hueShiftValue, saturationShiftValue, lightnessShiftValue, data) => {
      const currentColors = data;
      const result = currentColors.map((item) => {
        const key = Object.keys(item.valuesByMode)[0];
        const value = Object.values(item.valuesByMode)[0];
        const newValue = colorAdjustmentUI(
          value,
          Number(hueShiftValue),
          Number(saturationShiftValue),
          Number(lightnessShiftValue)
        );
        item.valuesByMode[key] = newValue;
        return item;
      });
      emit("NEW_SATURATION", result);
    }
  );
}
var init_main = __esm({
  "src/main.ts"() {
    "use strict";
    init_lib();
    init_colorAdjustmentCore();
    init_getVarData();
    showUI({
      height: 680,
      width: 870
    });
  }
});

// <stdin>
var modules = { "src/main.ts--default": (init_main(), __toCommonJS(main_exports))["default"] };
var commandId = true ? "src/main.ts--default" : figma.command;
modules[commandId]();
