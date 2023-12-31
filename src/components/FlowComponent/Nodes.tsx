const initNodes = [
  {
    id: "1",
    type: "datasubjectnode",
    data: {
      label: "example_data_subject",
      valid: true,
      warningMsg: ["name"],
    },
    position: { x: 250, y: 0 },
  },
  {
    id: "2",
    type: "nondatasubjectnode",
    data: {
      label: "example_table1",
      valid: true,
      warningMsg: [],
    },
    position: { x: 150, y: 200 },
  },
  {
    id: "3",
    type: "nondatasubjectnode",
    data: {
      label: "example_table2",
      valid: true,
      warningMsg: ["name", "email"],
    },
    position: { x: 0, y: 400 },
  },
  {
    id: "4",
    type: "nondatasubjectnode",
    data: {
      label: "example_table3",
      valid: true,
      warningMsg: ["name", "email"],
    },
    position: { x: 250, y: 400 },
  },
  {
    id: "5",
    type: "nondatasubjectnode",
    data: {
      label: "example_table4",
      valid: true,
      warningMsg: ["name", "email"],
    },
    position: { x: 150, y: 600 },
  },
];

const Nodes = function (dataSubject: any[], otherTables: any[]) {
  if (dataSubject.length === 0 && otherTables.length === 0) {
    return initNodes;
  }

  console.log(dataSubject)
  let ret: any[] = [];
  for (const sub of dataSubject) {
    console.log(sub.warningMsg);
    ret.push({
      id: sub.tableName,
      type: "datasubjectnode",
      data: {
        label: sub.tableName,
        valid: !sub.hasOwnProperty("errorMsg"),
        warningMsg: sub.warningMsg,
      },
      position: { x: sub.posX, y: sub.posY },
      draggable: true,
    });
  }

  for (const sub of otherTables) {
    ret.push({
      id: sub.tableName,
      type: "nondatasubjectnode",
      data: {
        label: sub.tableName,
        valid: !sub.hasOwnProperty("errorMsg"),
        warningMsg: sub.warningMsg,
      },
      position: { x: sub.posX, y: sub.posY },
      draggable: true,
    });
  }
  console.log(ret)
  return ret;
};

export default Nodes;
