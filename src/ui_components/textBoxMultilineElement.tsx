import { h, JSX } from "preact";
import { useState } from "preact/hooks";

export function textBoxMultilineElement() {
  const [textareaValue, setTextAreaValue] = useState<string>("");
  function handleTextAreaInput(event: JSX.TargetedEvent<HTMLTextAreaElement>) {
    const newValue = event.currentTarget.value;
    console.log(newValue);
    setTextAreaValue(newValue);
  }
  return (
    <textarea
      onInput={() => handleTextAreaInput}
      placeholder="Section content"
      value={textareaValue}
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "6px 12px",
      }}
    />
  );
}
