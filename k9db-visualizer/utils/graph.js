// Given a list of objects (nodes and edges), return [uniqueNodes, edges]
// where uniqueNodes is a set of table names and edges are edge objects
function getNodesAndEdges(objects) {
    const nodes = new Set()
    var edges = []
    for (const obj of parsedRes) {
        if (obj.annotation === "data_subject") {
            nodes.add(obj.tableName)
        } else {
            nodes.add(obj.from)
            nodes.add(obj.to)
            edges.push(obj)
        }
    }
    return [nodes, edges]
}

function sortedNodesToCoordinates(sortedNodes, width, height) {
    // calculate the height assigned to each level
    var levelNum = sortedNodes.length
    var heightPerLevel = Math.floor(height, levelNum * 3)
}


// Given a set of unique nodes and a list of edges objects, return a list of
// lists of nodes like res = [[A], [B, C], [D]] where A (data subject) has 
// inDegree 0, B and C have inDegree 1 and D has inDegree 2.
// If the graph is invalid (has a cycle), returns an empty list
export function topoSort(nodes, edges) {
    // 1. create a graph (adjacency list) and an inDegree map
    const G = new Map();
    const inNodes = new Map();
    for (const node of nodes) {
        G[node] = new Set()
        inNodes[node] = new Set()
    }
    for (const edge of edges) {
        G[edge.to].add(edge.from)
        inNodes[edge.from].add(edge.to)
    }
    // 2. get all nodes that have zero dependencies
    var q = []
    for (const node of nodes) {
        if (inNodes[node].size === 0) {
            q.push(node)
        }
    }
    // 3. use Khan's algorithm to construct the result array
    const res = []
    var processedNodeCt = 0
    while (q.length > 0) {
        var nextQ = []
        for (const curr of q) {
            processedNodeCt++
            for (const neighbor of G[curr]) {
                inNodes[neighbor].delete(curr)
                if (inNodes[neighbor].size === 0) {
                    nextQ.push(neighbor)
                }
            }
        }
        res.push(q)
        q = nextQ
    }
    // 4. check if the graph is a DAG
    if (processedNodeCt < nodes.length) {
        return []
    } else {
        return res
    }
}