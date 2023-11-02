import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import "./node.css";

export default function DataSubjectNode({ data }: NodeProps) {
  return (
    <>
      <div className="datasubjectnode">{data.label}</div>
      <Handle
        id="s1"
        type="source"
        position={Position.Top}
        style={{background: "#555" }}
        isConnectable={false}
      />
      <Handle
        id="t2"
        type="target"
        position={Position.Bottom}
        style={{ background: "#555" }}
        isConnectable={false}
      />
    </>
  );
}
