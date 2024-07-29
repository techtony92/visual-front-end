export let refCollection:Array<{current:HTMLElement|undefined|null, id:number}> = [];

export function populate(populated:Array<{current:HTMLElement|undefined|null, id:number}>){
    refCollection = populated;
}


export function getCollection(){
    return refCollection;
}