const splitTablesEdges = function (parsedSchema) {
  let dataSubjects: any[] = [];
  let otherTables: any[] = [];

  //storing edge objects. ex: {annotation: 'owned_by', from: 'stories', to: 'user', edgeName: 'author'}
  let edges: any[] = [];

  for (const row of parsedSchema) {
    if (row.annotation === "data_subject") {
      dataSubjects.push(row.tableName);
    } else {
      edges.push(row);
    }
  }

  for (const row of parsedSchema) {
    if (row.annotation !== "data_subject") {
      if (!dataSubjects.includes(row.from) && !otherTables.includes(row.from)) {
        otherTables.push(row.from);
      }
      if (!dataSubjects.includes(row.to) && !otherTables.includes(row.to)) {
        otherTables.push(row.to);
      }
    }
  }
  return [dataSubjects, otherTables, edges];
};

export default splitTablesEdges;
