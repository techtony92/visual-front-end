import { getTheatreProject, getPropertiesSheet, createTheatreProject, createSheet } from "./initDefs";
import { getRefById } from "./JSX_Ref";
import { getCollection } from "./mem_constants/collections";
import { get3Dlib } from "./three/threeInit";
import { NormalBufferAttributes, Object3DEventMap,DoubleSide, Group, Color , Mesh, DirectionalLight, BufferGeometry, MeshBasicMaterial, LineBasicMaterial, MeshPhongMaterial, LineSegments} from "three";
import { BaseGeometry } from "./three/geometryTypes/BaseGeometry";
import { BaseMaterial } from "./three/materialTypes/BaseMaterial";
import { MaterialType, GeometryType } from "./types/types";
import { types } from "@theatre/core";

// CSS Theatre
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
                    z:30,
                }
            }
        });



        threeConfigObserver.onValuesChange((updated) =>{
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
    }
}