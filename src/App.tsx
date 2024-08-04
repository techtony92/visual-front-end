import Transformer from "./JSX_Transformer";
import { initStudio, createTheatreProject, createSheet } from "./initDefs";
import { useRef } from "./JSX_Ref";
function App(){
    const projectVisualFrontEnd = createTheatreProject("Visual-Front-End");
    initStudio();
    const propertiesCollection = createSheet(projectVisualFrontEnd, "properties");
    



   
    let divRef = useRef<HTMLDivElement| null>(null)
    return(
        <div id="titleParent" ref={divRef}>
            <h1 id="appTitle">App Working</h1>
        </div>
    )
    
}

export default App;