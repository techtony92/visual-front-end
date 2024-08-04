import { getTheatreProject, getPropertiesSheet, createTheatreProject, createSheet } from "./initDefs";
import { getRefById } from "./JSX_Ref";
import { getCollection } from "./mem_constants/collections";
import { get3Dlib } from "./three/threeInit";
import { NormalBufferAttributes, Object3DEventMap,DoubleSide, Group, Color , Mesh, DirectionalLight, BufferGeometry, MeshBasicMaterial, LineBasicMaterial, MeshPhongMaterial, LineSegments} from "three";
import { BaseGeometry } from "./three/geometryTypes/BaseGeometry";
import { BaseMaterial } from "./three/materialTypes/BaseMaterial";
import { MaterialType, GeometryType } from "./types/types";
import { types } from "@theatre/core";
import GridHelper from "./three/grid/GridHelper";
// CSS Theatre

let scrollPercent = 0;


export function activeTheatre(){
    const currentProject = getTheatreProject("Visual-Front-end");
    const propertySheet = getPropertiesSheet();
    const componentRoot = getRefById(1);
    const threeLib = get3Dlib(componentRoot.current as HTMLElement);
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
            width:100%;
            height:100%;
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


    const lights = [];
	lights[ 0 ] = new DirectionalLight( 0xffffff, 3 );
	lights[ 1 ] = new DirectionalLight( 0xffffff, 3 );
	lights[ 2 ] = new DirectionalLight( 0xffffff, 3 );
	lights[ 0 ].position.set( 0, 200, 0 );
	lights[ 1 ].position.set( 100, 200, 100 );
	lights[ 2 ].position.set( - 100, - 200, - 100 );
	threeLib.scene.add( lights[ 0 ] );
	threeLib.scene.add( lights[ 1 ] );
	threeLib.scene.add( lights[ 2 ] );
    const threeTheaterProject = createTheatreProject("threeTheatreProject");
    const threeAttributeConfig = createSheet(threeTheaterProject, "threeAttributeConfig");
    threeLib.scene.background = new Color("#333333");
    if(componentRoot.current && threeAttributeConfig){
   
        let threeConfigObserver = threeAttributeConfig.object("threeConfigProperties",{
            rendererProperties:{
                width:0,
                height:0,
            },
            cameraProperties:{
                position:{
                    x:0,
                    y:0,
                    z:30,

                }
            }
        });



        threeConfigObserver.onValuesChange((updated) =>{
            threeLib.camera.position.x = updated.cameraProperties.position.x;
            threeLib.camera.position.y = updated.cameraProperties.position.y;
            threeLib.camera.position.z = updated.cameraProperties.position.z;
            threeLib.renderer.setSize(updated.rendererProperties.width, updated.rendererProperties.height);

        })
    }
    let sphereGeometryConfig:BufferGeometry|undefined = undefined
    let sphereMaterialConfig:MeshBasicMaterial|undefined = undefined
    let LineMaterial:LineBasicMaterial|undefined = undefined;
    let MeshPhongMaterial:MeshPhongMaterial|undefined = undefined;
    let sphereSegments:LineSegments|undefined = undefined;
    let sphere:Mesh|undefined = undefined;

    const sphereProject = createTheatreProject("threeSphere");
    const spherePropertySheet = createSheet(sphereProject, "sphereProperties");
    if(componentRoot.current && spherePropertySheet){
        const spherePropertyObserver = spherePropertySheet.object("Sphere Properties",{
            radius:types.number(15, {range:[0.1,30.0]}),
            widthSegments:types.number(32, {range:[3, 64]}),
            enableMesh:types.boolean(false, {label:"Enable Mesh"}),
            persistMesh:types.boolean(false, {label:"Persist Mesh"}),
        
        })

        spherePropertyObserver.onValuesChange((updates)=>{
            if(sphereSegments !== undefined){
                sphereSegments.geometry.dispose();
                threeLib.scene.remove(sphereSegments);
            }

            if(sphere !== undefined){
                if(updates.persistMesh === false){
                    sphere.geometry.dispose();
                    threeLib.scene.remove(sphere);    
                }
                
            }

            LineMaterial = BaseMaterial(MaterialType.lineBasic, {color: 0xffffff, transparent: true, opacity: 0.5 } );
            MeshPhongMaterial = BaseMaterial(MaterialType.meshPhong, {color: 0x156289, emissive: 0x072534, side: DoubleSide, flatShading: true })
            sphereGeometryConfig = BaseGeometry(GeometryType.Sphere, updates.radius, updates.widthSegments);
            //sphereMaterialConfig = BaseMaterial(MaterialType.meshBasic, {color:0xffff00});
            sphereSegments = new LineSegments<BufferGeometry<NormalBufferAttributes>, LineBasicMaterial, Object3DEventMap>(sphereGeometryConfig, LineMaterial);
            sphere = new Mesh(sphereGeometryConfig, MeshPhongMaterial);
            
            threeLib.scene.add(sphereSegments);
            if(updates.enableMesh){
                threeLib.scene.add(sphere);
            }
            
        })
        const threeGridProject = createTheatreProject("threeGrid");
        const threeGridProperties = createSheet(threeGridProject, "theeGridProperties");
        const helper = GridHelper({size: 10, divisions: 10, colorOfLineCenter: '0xaec6cf', colorOfGridLines:"0xaec6cf" });
        threeLib.scene.add(helper);
        if(threeGridProperties && componentRoot.current){
            const threeGridObserver = threeGridProperties.object("gridProperties",{
                position:{
                    x:0,
                    y:0,
                    z:types.number(20, {range:[0 , 50]}),
                }

            })

            threeGridObserver.onValuesChange((updates) =>{
                helper.position.x = updates.position.x;
                helper.position.y = updates.position.y;
                helper.position.z = updates.position.z;
            })

        }
    }

    function onWindowResize(){
        threeLib.camera.aspect = window.innerWidth / window.innerHeight;
        threeLib.camera.updateProjectionMatrix();
        threeLib.renderer.setSize(window.innerWidth, window.innerHeight);
        threeLib.renderer.render(threeLib.scene,threeLib.camera)
    }

    window.addEventListener("resize", onWindowResize, false);
        /* Liner Interpolation
        * lerp(min, max, ratio)
        * eg,
        * lerp(20, 60, .5)) = 40
        * lerp(-20, 60, .5)) = 20
        * lerp(20, 60, .75)) = 50
        * lerp(-20, -10, .1)) = -.19
        */
        function lerp(x: number, y: number, a: number): number {
            return (1 - a) * x + a * y
        }

        function scalePercent(start: number, end: number) {
            return (scrollPercent - start) / (end - start)
        }
        // definition of our animation steps
        const animationScripts: { start: number; end: number; func: () => void }[] = [];

        animationScripts.push({
            start: 0,
            end: 101,
            func: () => {
                let rgbGreen = MeshPhongMaterial!.color.g
                //material.color.g
                rgbGreen -= 0.05
                if (rgbGreen <= 0) {
                    rgbGreen = 1.0
                }
                MeshPhongMaterial!.color.g = rgbGreen;
                // material.color.g = g
            },
        })
        //add an animation that moves the camera between 60-80 percent of scroll
        animationScripts.push({
            start: 60,
            end: 80,
            func: () => {
                threeLib.camera.position.x = lerp(0, 5, scalePercent(60, 80))
                threeLib.camera.position.y = lerp(1, 5, scalePercent(60, 80))
               // threeLib.camera.lookAt(cube.position)
                //console.log(camera.position.x + " " + camera.position.y)
            },
        });

        function playScrollAnimations() {
            animationScripts.forEach((a) => {
                if (scrollPercent >= a.start && scrollPercent < a.end) {
                    a.func()
                }
            })
        }

        const scrollProgress = document.createElement("div");
        scrollProgress.setAttribute("id", "scrollProgress");
        scrollProgress.style.cssText = `
        position:absolute;
        bottom:10px;
        left:0px;
        font-size:3.2rem;
        font-weight:500;
        `;

        componentRoot.current?.appendChild(scrollProgress);
        document.body.onscroll = () => {
            //calculate the current scroll progress as a percentage
            scrollPercent =
                ((document.documentElement.scrollTop || document.body.scrollTop) /
                    ((document.documentElement.scrollHeight || document.body.scrollHeight) -
                        document.documentElement.clientHeight)) * 100;
                (document.getElementById('scrollProgress') as HTMLDivElement).innerText =
                'Scroll Progress : ' + scrollPercent.toFixed(2)

        }
        
        window.addEventListener("scroll", playScrollAnimations);
        window.scrollTo({ top: 0, behavior: 'smooth' })
        // Generate Section elements:
        for(let i = 0; i < 6; i++){
            const section = document.createElement("section");
            section.setAttribute("id", `section${i}`);
            section.style.cssText = `
                
                width:100%;
                height:100vh;
            `
            componentRoot.current?.appendChild(section);
        }
        // const stats = new Stats()
        // document.body.appendChild(stats.dom)

}