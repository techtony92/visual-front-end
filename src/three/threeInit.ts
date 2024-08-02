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
    renderer.setAnimationLoop(animate);
    camera.position.z = 30;
    componentRoot.appendChild(renderer.domElement);
    function animate(){
        renderer.render(scene, camera)
    }

    return {
        scene,
        renderer,
        camera
    } satisfies threeConfig;

}