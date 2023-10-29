import { parse } from './parse.js';

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
var parsedRes = parse(createStatements)

console.log(parsedRes)
// get nodes and edges
var [nodes, edges] = getNodesAndEdges(parsedRes)
// topologically sort 
var sortedNodes = topoSort(nodes, edges)
console.log(sortedNodes)