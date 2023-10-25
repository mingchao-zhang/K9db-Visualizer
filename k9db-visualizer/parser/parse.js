// Helper Functions
/* returns the text before the first '(', left parenthesis
   for example, "stories(id)" => "stories" and
   "users(id) => "users"
*/
function textBeforeLeftParen(text) {
    let leftParenIdx = text.indexOf('(')
    if (leftParenIdx === -1) {
        return text
    } else {
        return text.substring(0, leftParenIdx)
    }
}

/* return a dictionary with parsed tokens. For example
story_id int not null owned_by stories(id) =>
{
    annotation: 'owned_by',
    from: 'taggings',
    to: 'stories',
    edgeName: 'story_id'
}
*/
function getNodesAndEdgeDict(inputString, currTableName) {
    let tokens = inputString.split(' ')
    tokens = tokens.filter(token => token !== '')

    // Check if the string contains "owned_by" or "accessed_by"
    const byKeywords = ["owned_by", "accessed_by"]
    for (const byKeyword of byKeywords) {
        if (inputString.includes(byKeyword)) {
            return {
                annotation: byKeyword,
                from: currTableName,
                to: textBeforeLeftParen(tokens.at(-1)),
                edgeName: tokens.at(0)
            }
        }
    }

    // Check if the string contains "owns" or "accesses"
    const keywords = ["owns", "accesses"]
    for (const keyword of keywords) {
        if (inputString.includes(keyword)) {
            return {
                annotation: keyword,
                from: textBeforeLeftParen(tokens.at(-1)),
                to: currTableName,
                edgeName: tokens.at(0)
            }
        }
    }

    return {}
}

/* Given a create SQL statement with k9db annotations,
returns an array of dictionaries For example, 
[{ annotation: 'data_subject', tableName: 'users' },
 { annotation: 'owned_by', from: 'stories', to: 'user', edgeName: 'author' },
 ...]
*/
function parseCreateStatement(inputString) {
    // 1: Remove extra spaces and convert to lowercase
    inputString = inputString.replace(/\s+/g, ' ').replace(/[\t\r\n]+/g, '')
    inputString = inputString.trim().toLowerCase()

    // 2: Extract the table name
    let tokens = inputString.split(' ')
    let tableIdx = tokens.indexOf("table")
    console.assert(tableIdx < tokens.length, "No table name")
    let tableName = tokens[tableIdx + 1]
    console.assert(tableName.length > 0, "Invalid table name")

    // 2: Check if the annotation, 'data_subject', exists
    if (inputString.includes("data_subject")) {
        return [{
          annotation: "data_subject",
          tableName: tableName
        }];
    }
  
    // 3: Extract text between the first '(' and the last ')'
    //    Split the text by comma (',')
    const firstParenIdx = inputString.indexOf('(')
    const lastParenIdx = inputString.lastIndexOf(')')
    if (firstParenIdx === -1 || lastParenIdx === -1 || 
        lastParenIdx <= firstParenIdx) {
      return null; // No valid match found
    }
    const textBetween = inputString.substring(firstParenIdx + 1, lastParenIdx);
    const splitText = textBetween.split(',');

    // 4: construct the result array
    let res = []
    for (const subStr of splitText) {
        let dict = getNodesAndEdgeDict(subStr, tableName)
        if (Object.keys(dict).length > 0) {
            res.push(dict)
        }
    }
    return res
  }

//-----------------------------------------------------------------------------
// Parse API's
// Given a SQL statement with K9db annotations, returns a list of objects that 
// could either be a node (data subject) or an edge
function parse(statement) {
    if (statement.toLowerCase().indexOf("create") !== -1) {
        return parseCreateStatement(statement)
    }
}

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

// Given a set of unique nodes and a list of edges objects, return a list of
// lists of nodes like res = [[A], [B, C], [D]] where A (data subject) has 
// inDegree 0, B and C have inDegree 1 and D has inDegree 2.
// If the graph is invalid (has a cycle), returns an empty list
function topoSort(nodes, edges) {
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
//-----------------------------------------------------------------------------
// TESTS
const createStatements = [
    `CREATE DATA_SUBJECT TABLE users (
        id INT PRIMARY KEY
    );`,
    `CREATE TABLE stories (
        id INT PRIMARY KEY,
        title TEXT,
        author INT NOT NULL OWNED_BY users(id) 
    );`,
    `CREATE TABLE tags (
        id INT PRIMARY KEY,
        tag TEXT
    );`,
    `CREATE TABLE taggings (
        id INT PRIMARY KEY,
        story_id INT NOT NULL OWNED_BY stories(id), 
        tag_id INT NOT NULL ACCESSES tags(id)
    );`,
    `CREATE TABLE messages (
        id INT PRIMARY KEY, 
        body text, 
        sender INT NOT NULL OWNED_BY users(id), 
        receiver INT NOT NULL OWNED_BY users(id), 
        ON DEL sender ANON (sender),
        ON DEL receiver ANON (receiver)
    );`
]

// get all objects
var parsedRes = []
for (const statement of createStatements) {
    parsedRes.push(...parse(statement))
}
// get nodes and edges
var [nodes, edges] = getNodesAndEdges(parsedRes)
// topologically sort 
var sortedNodes = topoSort(nodes, edges)
console.log(sortedNodes)