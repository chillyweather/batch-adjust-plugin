import { Checkbox, Text } from "@create-figma-plugin/ui";
import { h, JSX } from "preact";
import { useState } from "preact/hooks";

export default function CheckboxElement() {
  const [value, setValue] = useState<boolean>(false);
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.checked;
    console.log(newValue);
    setValue(newValue);
  }
  return (
    <Checkbox onChange={handleChange} value={value}>
      <Text>Publish</Text>
    </Checkbox>
  );
}
