import { MarkerType } from "reactflow";

export enum EdgeType {
  Owns = "owns",
  OwnedBy = "owned_by",
  Accesses = "accesses",
  AccessedBy = "accessed_by",
}

export function getMarkerEnd(e: EdgeType) {
  switch (e) {
    case EdgeType.Owns:
      return ownsMarkerEnd;
    case EdgeType.OwnedBy:
      return ownedbyMarkerEnd;
    case EdgeType.Accesses:
      return accessesMarkerEnd;
    case EdgeType.AccessedBy:
      return accessedbyMarkerEnd;
  }
}

export function getFlowEdgeType(e: EdgeType) {
  switch (e) {
    case EdgeType.Owns:
      return "ownsedge";
    case EdgeType.OwnedBy:
      return "ownedbyedge";
    case EdgeType.Accesses:
      return "accessesedge";
    case EdgeType.AccessedBy:
      return "accessedbyedge";
  }
}

export const edgeStyle = {
  strokeWidth: 1.2,
};


const ownsMarkerEnd = {
  type: MarkerType.ArrowClosed,
  width: 18,
  height: 20,
};

const ownedbyMarkerEnd = {
  type: MarkerType.ArrowClosed,
  width: 18,
  height: 20,
};

const accessesMarkerEnd = {
  type: MarkerType.ArrowClosed,
  width: 18,
  height: 20,
};

const accessedbyMarkerEnd = {
  type: MarkerType.ArrowClosed,
  width: 18,
  height: 20,
};

export const initEdges = [
  {
    id: "edges-e1-2",
    source: "1",
    target: "2",
    type: "ownsedge",
    markerEnd: ownsMarkerEnd,
    style: edgeStyle,
  },
  {
    id: "edges-e2-2a",
    source: "2",
    target: "3",
    type: "ownedbyedge",
    markerEnd: ownedbyMarkerEnd,
    style: edgeStyle,
  },
  {
    id: "edges-e2-3",
    source: "2",
    target: "4",
    type: "accessesedge",
    markerEnd: accessesMarkerEnd,
    style: edgeStyle,
  },
  {
    id: "edges-e3-4",
    source: "4",
    target: "5",
    type: "accessedbyedge",
    markerEnd: accessedbyMarkerEnd,
    style: edgeStyle,
  },
];

const Edges = function (edges: any[]) {
  if (edges.length === 0) {
    return initEdges;
  }

  let ret: any[] = [];
  for (const e of edges) {
    ret.push({
      id: e.from + "_" + e.annotation + "_" + e.edgeName,
      sourceHandle: 's1',
      source: e.from,
      target: e.to,
      type: getFlowEdgeType(e.annotation),
      markerEnd: getMarkerEnd(e.annotation),
      style: edgeStyle,
    });
  }

  return ret;
};

export default Edges;
