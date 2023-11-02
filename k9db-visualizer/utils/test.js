import { parser } from './parse.js';
import { getGraph, topoSort } from './graph.js';
import { calculateCoordinates } from './coordinate.js'

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

// get graph and topologically-sorted nodes
var parsedObjects = parser(createStatements)
var graph = getGraph(parsedObjects)
var sortedNodes = topoSort(graph)
console.log(graph)
console.log(sortedNodes)

// calculate coordinates
var canvasWidth = 1000
var canvasHeight = 1000
var coords = calculateCoordinates(sortedNodes, graph, canvasWidth, canvasHeight)
console.log(coords)