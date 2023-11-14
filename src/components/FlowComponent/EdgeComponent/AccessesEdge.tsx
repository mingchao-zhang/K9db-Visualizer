import React, { useState } from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps } from "reactflow";

import "./edge.css";
import { getSpecialPath } from "./getSpecialPath";

const onEdgeClick = (id) => {
  console.log("clicked owns edge: " + id);
};

export default function AccessesEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data, //offset?
}: EdgeProps) {
  const edgePathParams = {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  };

  const [path, labelX, labelY] = getSpecialPath(edgePathParams, data);
  const [isShown, setIsShown] = useState(false);

  return (
    <>
      <BaseEdge path={path} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          {isShown && <div>Accesses Placeholder</div>}
          <button
            className="edgeaccesses"
            onClick={() => onEdgeClick(id)}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          >
            ACCESSES
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
