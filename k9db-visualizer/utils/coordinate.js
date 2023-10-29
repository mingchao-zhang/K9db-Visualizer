// posX, posY
// height between two levels is roughly 100 px's

function sortedNodesToCoordinates(sortedNodes, width, height) {
    // calculate the height assigned to each level
    var levelNum = sortedNodes.length
    var heightPerLevel = Math.floor(height, levelNum * 3)
}