import { emit } from "@create-figma-plugin/utilities";
import {
  RangeSlider,
  VerticalSpace,
  TextboxNumeric,
} from "@create-figma-plugin/ui";
import { Fragment } from "preact";
import { useState } from "preact/hooks";
import { h, JSX } from "preact";

interface Props {
  selectedColors: { color: string }[];
  hueShift: string;
  saturationShift: string;
  lightnessShift: string;
  setHueShift: (value: string) => void;
}

export default function HueSlider({
  selectedColors,
  saturationShift,
  setHueShift,
  hueShift,
  lightnessShift,
}: Props) {
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const hueShiftValue = event.currentTarget.value;
    emit(
      "SHIFT",
      hueShiftValue,
      saturationShift,
      lightnessShift,
      selectedColors
    );
    setHueShift(hueShiftValue);
  }
  return (
    <Fragment>
      <RangeSlider
        maximum={180}
        minimum={-179}
        onInput={handleInput}
        value={hueShift}
      />
      <VerticalSpace space="small" />
      <TextboxNumeric
        maximum={180}
        minimum={-179}
        onInput={handleInput}
        value={hueShift}
        variant="border"
      />
    </Fragment>
  );
}
