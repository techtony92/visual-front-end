import { getTheatreProject, getPropertiesSheet } from "./initDefs";
import { getRefById } from "./JSX_Ref";
import { getCollection } from "./mem_constants/collections";

// CSS Theatre
export function activeTheatre(){
    const currentProject = getTheatreProject("Visual-Front-end");
    const propertySheet = getPropertiesSheet();
    const componentRoot = getRefById(1);
   
    if(propertySheet && componentRoot.current){
        let shadowDiv = propertySheet?.object("shadowDiv", {
            position:{
                x:0,
                y:0,
            },
            size:{
                width:0,
                height:0
            },
            perspective:0,
            perspectiveOrigin:{
                xOrigin:0,
                yOrigin:0,
            },
            transform:{
                    rotate:{
                        x:0,
                        y:0,
                        z:0,
                    },
                    scale:{
                        x:0,
                        y:0,
                    },
                    translate:{
                        x:0,
                        y:0,
                        z:0
                    }
            }
        })

        const div = document.createElement("div");
        div.style.cssText = `
        position: absolute;
        width:20rem;
        height:20rem;
        background:#EEE;
        `
        componentRoot.current.appendChild(div);
        componentRoot.current.style.cssText = `
            transform-style:preserve-3d;
            perspective:1000px;
        `
        shadowDiv.onValuesChange((newValues) =>{
            div.style.left = newValues.position.x + 'px';
            div.style.top = newValues.position.y + 'px';
            div.style.width = newValues.size.width + "rem";
            div.style.height = newValues.size.height + "rem";
            div.style.transform = `translate3d(${newValues.transform.translate.x}px, 
                ${newValues.transform.translate.y}px, 
                ${newValues.transform.translate.z}px)`;
            componentRoot.current!.style.perspectiveOrigin = `${newValues.perspectiveOrigin.xOrigin}% ${newValues.perspectiveOrigin.yOrigin}%`;
            componentRoot.current!.style.perspective = `${newValues.perspective}px`

        })
    }
}