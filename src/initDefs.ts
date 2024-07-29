import * as core from "@theatre/core";
import type { IProject, ISheet } from "@theatre/core";
import studio from "@theatre/studio";

let project:IProject|undefined = undefined;
let propertySheet:ISheet|undefined = undefined;

export function createTheatreProject(projectName:string){
    project = core.getProject(projectName);
    return project;
}

export function initStudio(){
    studio.initialize();
}

export function createSheet(project:IProject, sheetId:string){
    propertySheet = project.sheet(sheetId);
    return propertySheet;
}

export function getTheatreProject(name:string):IProject{
    return core.getProject(name);
}

export function getPropertiesSheet(){
    return propertySheet;
}