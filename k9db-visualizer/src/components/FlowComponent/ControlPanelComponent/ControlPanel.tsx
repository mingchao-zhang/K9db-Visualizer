import React from "react";
import MyControlButton from "./MyControlButton";
import { Controls } from "reactflow";

function ControlPanel({ handleParsedSchema }) {
  return (
    <Controls>
      <MyControlButton name="s" handleParsedSchema={handleParsedSchema} />
      <MyControlButton name="v" handleParsedSchema={handleParsedSchema} />
    </Controls>
  );
}
export default ControlPanel;
