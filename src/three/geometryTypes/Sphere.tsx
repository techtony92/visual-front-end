import * as Three from "three";

export function SphereCore(...args:Array<number|undefined>){

    return new Three.SphereGeometry(...args);
}