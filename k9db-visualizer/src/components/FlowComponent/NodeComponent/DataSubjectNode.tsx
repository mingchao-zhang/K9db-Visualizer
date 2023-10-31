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
        style={{ left: 40, background: "#555" }}
        isConnectable={false}
      />
      <Handle
        id="s2"
        type="source"
        position={Position.Top}
        style={{ right: 40, left: "auto", background: "#555" }}
        isConnectable={false}
      />
      <Handle
        id="t1"
        type="target"
        position={Position.Bottom}
        style={{ left: 40, background: "#555" }}
        isConnectable={false}
      />
      <Handle
        id="t2"
        type="target"
        position={Position.Bottom}
        style={{ right: 40, left: "auto", background: "#555" }}
        isConnectable={false}
      />
    </>
  );
}
