const splitTablesEdges = function (parsedSchema) {
  let dataSubjects: any[] = [];
  let otherTables: any[] = [];

  //storing edge objects. ex: {annotation: 'owned_by', from: 'stories', to: 'user', edgeName: 'author'}
  let edges: any[] = [];

  for (const row of parsedSchema) {
    for (const nestedRow of row) {
      if (nestedRow.annotation === "data_subject") {
        dataSubjects.push(nestedRow.tableName);
      } else {
        edges.push(nestedRow);
      }
    }
  }

  for (const row of parsedSchema) {
    for (const nestedRow of row) {
      if (nestedRow.annotation !== "data_subject") {
        if (
          !dataSubjects.includes(nestedRow.from) &&
          !otherTables.includes(nestedRow.from)
        ) {
          otherTables.push(nestedRow.from);
        }
        if (
          !dataSubjects.includes(nestedRow.to) &&
          !otherTables.includes(nestedRow.to)
        ) {
          otherTables.push(nestedRow.to);
        }
      }
    }
  }
  return [dataSubjects, otherTables, edges];
};

export default splitTablesEdges;
