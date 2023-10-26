import React from "react";
import MyControlButton from "./MyControlButton";
import { Controls } from "reactflow";

function ControlPanel() {
  return (
    <Controls>
      <MyControlButton name="s" />
      <MyControlButton name="v" />
    </Controls>
  );
}
export default ControlPanel;
