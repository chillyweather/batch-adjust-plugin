import { emit } from "@create-figma-plugin/utilities";
import {
  RangeSlider,
  VerticalSpace,
  TextboxNumeric,
} from "@create-figma-plugin/ui";
import { Fragment } from "preact";
import { h, JSX } from "preact";

interface Props {
  selectedColors: { color: string }[];
  hueShift: string;
  saturationShift: string;
  lightnessShift: string;
  setSaturationShift: (value: string) => void;
}

export default function SaturationSlider({
  selectedColors,
  saturationShift,
  setSaturationShift,
  hueShift,
  lightnessShift,
}: Props) {
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const saturationShiftValue = event.currentTarget.value;
    setSaturationShift(saturationShiftValue);
    emit(
      "SHIFT",
      hueShift,
      saturationShiftValue,
      lightnessShift,
      selectedColors
    );
  }
  return (
    <Fragment>
      <RangeSlider
        maximum={100}
        minimum={-100}
        onInput={handleInput}
        value={saturationShift}
      />
      <VerticalSpace space="small" />
      <TextboxNumeric
        maximum={100}
        minimum={-100}
        onInput={handleInput}
        value={saturationShift}
        variant="border"
      />
    </Fragment>
  );
}
