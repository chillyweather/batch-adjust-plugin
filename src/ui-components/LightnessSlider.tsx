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
  setLightnessShift: (value: string) => void;
}

export default function LightnessSlider({
  selectedColors,
  saturationShift,
  setLightnessShift,
  hueShift,
  lightnessShift,
}: Props) {
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const lightnessShiftValue = event.currentTarget.value;
    setLightnessShift(lightnessShiftValue);
    emit(
      "SHIFT",
      hueShift,
      saturationShift,
      lightnessShiftValue,
      selectedColors
    );
  }
  return (
    <Fragment>
      <RangeSlider
        maximum={100}
        minimum={-100}
        onInput={handleInput}
        value={lightnessShift}
      />
      <VerticalSpace space="small" />
      <TextboxNumeric
        maximum={100}
        minimum={-100}
        onInput={handleInput}
        value={lightnessShift}
        variant="border"
      />
    </Fragment>
  );
}
