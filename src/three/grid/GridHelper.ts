import * as Three from "three";
type gridProps = {
    divisions:number;
    size:number;
    colorOfLineCenter?:Three.Color | string,
    colorOfGridLines?:Three.Color | string,
}
function GridHelper({divisions, size, colorOfLineCenter, colorOfGridLines }:gridProps){

    const helper = new Three.GridHelper(size, divisions, colorOfLineCenter, colorOfGridLines);

    return helper;
}

export default GridHelper
