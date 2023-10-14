import { h } from "preact";
import { useState } from "preact/hooks";
import { Text } from "@create-figma-plugin/ui";
import CheckboxElement from "./Checkbox";
import { textBoxElement } from "./textBoxElement";
import { textBoxMultilineElement } from "./textBoxMultilineElement";

interface EditorFrameProps {
  selectedCardType: string;
}

const [publish, setPublish] = useState(false);
const [title, setTitle] = useState("");

const cardStyle = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  padding: "8px",
  gap: "8px",
};

const textContentCard = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",
        height: "100%",
        width: "100%",
      }}
    >
      {textBoxElement()}
      {textBoxMultilineElement()}
    </div>
  );
};

export default function EditorFrame({ selectedCardType }: EditorFrameProps) {
  console.log(selectedCardType === "text");
  return (
    <div className="editorFrame" style={cardStyle}>
      {selectedCardType === "text" && textContentCard()}
      <CheckboxElement />
    </div>
  );
}

//TODO: content text + title
//TODO: content load button
//TODO: content two column text
//TODO: video select
//TODO: content table
