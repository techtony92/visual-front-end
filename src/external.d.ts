/*
* @jsx jsx
*/

/// <reference lib="DOM" />


declare module JSX{
    // Combines Tag names of HTML Elements and SVG elements
    export interface HTML5ElementTagNameMap extends HTMLElementTagNameMap, Omit<SVGElementTagNameMap, "a"| "script"| "style" | "title" > {
    }
    
    interface IntrinsicElements extends IntrinsicElementMap {}

    // IntrinsicElementMap grabs all the standard HTML tags in the TS DOM lib and mapps them all the objects with keys of type "string" and values of "any"
    type IntrinsicElementMap = {
        [K in keyof HTML5ElementTagNameMap]: {
            [k: string]: any;
        };
    };

    // Dynamic type of Tag that can be any key of IntrinsicElements.
    type Tag = keyof JSX.IntrinsicElements;


      // return type of our JSX factory , a base HTMLElement
    type Element = HTMLElement;

     // A type of Tag that can be a collection of returned IntrinsicElements : think a react component's return segement that returns JSX elements(html tags).
    interface Component { 
        (property?: { [key: string]: any }, children?: Node[]): Node; // Node is an abstract base class that objects like Document, Element and DocumentFragment 
    }

    //function protottype signatures
    // paramTypeAnnotation extends T is a constrain, restricting the param to a specified type.
    function jsx<paramTypeAnnotation extends JSX.Tag = JSX.Tag>(
        tag:paramTypeAnnotation,
        attributes:{[key:string]:any}|null,
        ...children:Node[]
    ): JSX.Element
  
    function jsx(
        tag:JSX.Component,
        attributes:Parameters<typeof tag> | null,
        ...children:Node[]
    ): Node;

}
