import { h, JSX } from "preact";
import { Textbox, TextboxMultiline } from "@create-figma-plugin/ui";
import { useState } from "preact/hooks";

export function textBoxElement() {
  const [value, setValue] = useState<string>("");
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    console.log(newValue);
    setValue(newValue);
  }
  return (
    <input
      onInput={handleInput}
      placeholder="Title"
      value={value}
      style={{
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "6px 12px",
      }}
    />
  );
}
