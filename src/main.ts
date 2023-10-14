import { emit, on, showUI } from "@create-figma-plugin/utilities";
import { colorAdjustmentUI } from "./colorAdjustmentCore";
import { getVarData } from "./getVarData";

export default function () {
  const varData = getVarData();

  emit("SET_VAR_DATA", varData);

  on("APPLY", (data) => {
    data.forEach((item: any) => {
      const foundVar = figma.variables.getVariableById(item.id);
      const key = Object.keys(item.valuesByMode)[0];
      const value = Object.values(item.valuesByMode)[0];
      foundVar?.setValueForMode(key, value as any);
    });
    figma.closePlugin();
  });

  on(
    "SHIFT",
    (hueShiftValue, saturationShiftValue, lightnessShiftValue, data) => {
      const currentColors = data;

      const result = currentColors.map((item: any) => {
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

showUI({
  height: 680,
  width: 870,
});
