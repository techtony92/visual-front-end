
import { refCollection, populate, getCollection } from "./mem_constants/collections";
export function mountRef<Type extends HTMLElement | undefined | null>(initialValue?:Type):{current:Type|undefined| null, id:number} {
    const ref = {current:initialValue, id:refCollection.length};
    if(refCollection.length > 0 && refCollection[refCollection.length -1].current === null){
        refCollection[refCollection.length -1].current = ref.current;
        refCollection[refCollection.length - 1].id = ref.id;
         
    }else{
        refCollection.push(ref);
        populate(refCollection)
    }
    
    console.log(refCollection);
    return ref;
}

export function useRef<Type extends HTMLElement |undefined| null>(initialValue:Type):{current:Type|undefined | null}{
    return mountRef(initialValue);
}

export function getRefById(searchParam:number){
    const refCollection = getCollection();
    console.log(refCollection);
    return refCollection.filter(ref => {
        if(ref.id === searchParam){
            console.log(ref);
            return ref;
        }})[0];
}

// TODO
export function purgeRef(searchParam:number){
    refCollection.forEach((element, index) =>{
        if(refCollection[index].id === searchParam){

        }
    })
}