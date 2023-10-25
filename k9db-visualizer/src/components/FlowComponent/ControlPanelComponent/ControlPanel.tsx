import React from "react";
import MyControlButton from "./MyControlButton";
import { Controls } from "reactflow";

function ControlPanel() {
  return (
    <Controls>
      <MyControlButton name="s" action={() => console.log("schema")} />
      <MyControlButton name="v" action={() => console.log("validate")} />
    </Controls>
  );
}
export default ControlPanel;
