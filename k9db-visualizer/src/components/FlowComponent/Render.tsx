import Edges, { edgeStyle, getFlowEdgeType, getMarkerEnd, initEdges } from "./Edges";
import Nodes from "./Nodes";


function isFromToSame(nodes : any[], edge : any){
    

}

export function Render(e: any[], dataSubject: String[], otherTables: String[]){
    let nodes = Nodes(dataSubject, otherTables)
    if (e.length === 0) {
        return initEdges;
      }
    
      let ret: any[] = [];
      for (const edge of e) {

        ret.push({
          id: edge.from + "_" + edge.annotation + "_" + edge.edgeName,
          sourceHandle: 's1',
          source: edge.from,
          target: edge.to,
          type: getFlowEdgeType(edge.annotation),
          markerEnd: getMarkerEnd(edge.annotation),
          style: edgeStyle,
        });
      }
}