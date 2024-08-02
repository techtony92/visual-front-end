import * as Three from "three";
import { MaterialType } from "../../types/types";

export function BaseMaterial(type:MaterialType,...args:Array<any>){
    switch(type){
        case MaterialType.meshBasic:
            return new Three.MeshBasicMaterial(...args);
    }
}