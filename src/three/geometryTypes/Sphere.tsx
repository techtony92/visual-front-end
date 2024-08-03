import * as Three from "three";

export function SphereCore(...args:Array<number|undefined>){
    console.log(args);
    return new Three.SphereGeometry(...args);
}