import React from "react";
import "./App.css";

import Flow from "./components/FlowComponent/Flow";
import MyCollapse from "./components/MenuComponent/Collapse";

export default function App() {

  const parserRes = [[ { annotation: 'data_subject', tableName: 'users' } ],
  [
    {
      annotation: 'owned_by',
      from: 'stories',
      to: 'user',
      edgeName: 'author'
    }
  ],
  [],
  [
    {
      annotation: 'owned_by',
      from: 'taggings',
      to: 'stories',
      edgeName: 'story_id'
    },
    {
      annotation: 'accesses',
      from: 'tag',
      to: 'taggings',
      edgeName: 'tag_id'
    }
  ],
  [
    {
      annotation: 'owned_by',
      from: 'messages',
      to: 'user',
      edgeName: 'sender'
    },
    {
      annotation: 'owned_by',
      from: 'messages',
      to: 'user',
      edgeName: 'receiver'
    }
  ]]

  const dataSubject = ['users'];
  const otherTables = ['messages', 'taggings', 'tags', 'stories'];

  return (
    <div>
      <div class="split left">
        <MyCollapse />
      </div>

      <div class="split right">
        <Flow />
      </div>
    </div>
  );
}
