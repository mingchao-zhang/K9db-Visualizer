import React, { useCallback } from "react";
import "reactflow/dist/style.css";
import ReactFlow, {
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import ControlPanel from "./ControlPanelComponent/ControlPanel";

import initialNodes from "./Nodes.js";
import initialEdges from "./Edges.js";
import OwnsEdge from "./EdgeComponent/OwnsEdge";
import OwnedByEdge from "./EdgeComponent/OwnedByEdge";
import AccessesEdge from "./EdgeComponent/AccessesEdge";
import AccessedByEdge from "./EdgeComponent/AccessedByEdge";
import DataSubjectNode from "./NodeComponent/DataSubjectNode";
import NonDataSubjectNode from "./NodeComponent/NonDataSubjectNode";

const edgeTypes = {
  ownsedge: OwnsEdge,
  ownedbyedge: OwnedByEdge,
  accessesedge: AccessesEdge,
  accessedbyedge: AccessedByEdge,
};

const nodeTypes = {
  datasubjectnode: DataSubjectNode,
  nondatasubjectnode: NonDataSubjectNode,
};

const createStatements = [
  `CREATE DATA_SUBJECT TABLE users (
      id INT PRIMARY KEY
  );`,
  `CREATE TABLE stories (
      id INT PRIMARY KEY,
      title TEXT,
      author INT NOT NULL OWNED_BY user(id) 
  );`,
  `CREATE TABLE tags (
      id INT PRIMARY KEY,
      tag TEXT
  );`,
  `CREATE TABLE taggings (
      id INT PRIMARY KEY,
      story_id INT NOT NULL OWNED_BY stories(id), 
      tag_id INT NOT NULL ACCESSES tag(id)
  );`,
  `CREATE TABLE messages (
      id INT PRIMARY KEY, 
      body text, 
      sender INT NOT NULL OWNED_BY user(id), 
      receiver INT NOT NULL OWNED_BY user(id), 
      ON DEL sender ANON (sender),
      ON DEL receiver ANON (receiver)
  );`,
];

const Flow = ({ handleParsedSchema }) => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div style={{ width: "100vw", height: "100vh", alignSelf: "center" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        snapToGrid={true}
        fitView
        attributionPosition="top-right"
      >
        <ControlPanel handleParsedSchema={handleParsedSchema} />
        <MiniMap
          nodeColor={(n) => {
            if (n.type === "datasubjectnode") return "#423E37";
            return "#eee";
          }}
        />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default Flow;
