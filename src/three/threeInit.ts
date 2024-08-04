import * as Three from "three";



type threeConfig = {
    scene: Three.Scene;
    renderer: Three.WebGLRenderer;
    camera: Three.Camera;
}
export function get3Dlib(componentRoot:HTMLElement){
    return initThree(componentRoot);
}

function initThree(componentRoot:HTMLElement){
    const scene = new Three.Scene();
    const renderer = new Three.WebGLRenderer({antialias:true});
    renderer.setPixelRatio( window.devicePixelRatio );
    const camera = new Three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    camera.position.z = 30;
    const layer3D = document.createElement("div");
    layer3D.setAttribute("id","layer3D");
    layer3D.style.cssText = `
    position:fixed;
    width:100%;
    height:100vh;
    z-index:10;
    `
    componentRoot.appendChild(layer3D);

    renderer.domElement.style.cssText = `
        position:absolute;
        left:50%;
        transform:translateX(-50%);
        width:75%;
        height:75%;
    `
    layer3D.appendChild(renderer.domElement);
    function animate(){
        renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(animate);
    return {
        scene,
        renderer,
        camera
    } satisfies threeConfig;

}