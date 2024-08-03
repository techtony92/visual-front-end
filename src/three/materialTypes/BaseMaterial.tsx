import * as Three from "three";
import { MaterialType } from "../../types/types";

export function BaseMaterial(type:MaterialType,...args:Array<any>){
    switch(type){
        case MaterialType.meshBasic:
            return new Three.MeshBasicMaterial(...args);
        case MaterialType.lineBasic:
            return new Three.LineBasicMaterial(...args);
        case MaterialType.meshPhong:
            return new Three.MeshPhongMaterial(...args);
        default:
            return undefined;
    }
}