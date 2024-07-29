import { mountRef } from "./JSX_Ref";
function Transformer(
    tag:JSX.Tag|JSX.Component,
    attributes:{[Key:string]:any}|null,
    ...children:Node[]
){
    if(typeof tag === "function"){
        return tag(attributes ?? {}, children);    
    }
    type Tag = typeof tag;
    const element:JSX.HTML5ElementTagNameMap[Tag] = document.createElement(tag);

    // Assign attributes:
    let map = attributes ?? {};
    let attrs: keyof typeof map;
    for(attrs of Object.keys(map) as any){
        // Extract Values
        attrs = attrs.toString();
        const value = map[attrs] as any;
        const referencedAsAny = element as any;
        if(attrs === "ref"){
            mountRef(element)
        }
        if(typeof referencedAsAny[attrs] === "undefined"){
            element.setAttribute(attrs, value);
        }else{
            referencedAsAny[attrs] = value;
        }
    }

    for(let child of children){
        if(typeof child === "string"){
            element.innerText += child;
            continue;
        }
        if(Array.isArray(child)){
            element.append(...child);
            continue;
        }
        element.appendChild(child);
    }
    return element;
}

export default Transformer;