export const Annotations = {
    DataSubject: "data_subject",
    OwnedBy: "owned_by",
    AccessedBy: "accessed_by",
    Owns: "owns",
    Accesses: "accesses"
}

export class Node {
    constructor(tableName) {
        this.tableName = tableName
    }
}

export class Edge {
    constructor(annotation, fromNode, toNode, fieldName) {
        this.annotation = annotation,
        this.fromNode = fromNode,
        this.toNode = toNode,
        this.fieldName = fieldName
    }
}
