import * as Three from "three";
import { SphereCore } from "./Sphere";
import  { GeometryType } from "../../types/types";

export function BaseGeometry(type:GeometryType, ...args:Array<number|undefined>){
 
    let currentGeometry:Three.BufferGeometry|undefined = undefined;
    switch(type){
        case GeometryType.Sphere:
            currentGeometry = SphereCore(...args);
    }

    return currentGeometry;
}