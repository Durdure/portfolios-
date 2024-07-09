import React, {useEffect, useState, useRef} from 'react';
import * as THREE from 'three';
import { materialColor } from 'three/examples/jsm/nodes/Nodes.js';

function ScrollModelAnimation() {
    const [loading, setLoading] = useState(true);
    const [render, setRender] = useState(false);
    const [_camera, setCamera] = useState();
    const [scen] = useState(new THREE.Scene());
    const [_controls, setControls] = useState();

    const refContainer = useRef();

    useEffect(() => {
        const paramerters = {
            materialColor: "#ff0000",
        };
        const { current: container } = refContainer;

        if (container && !render) {
            const textureLoader = new THREE.TextureLoader();
            const gradientTexture = textureLoader.load("./../public/gradients/textures/3.jpg");
            

            const material = new THREE.MeshToonMaterial({
                color: paramerters.materialColor,
                gradientMap: gradientTexture,                
            })

            const objectDistance = 4
            const mesh1 = new THREE.Mesh(
                new THREE.TorusGeometry(1, 0.5, 16, 60),
                material
            )

         
            const mesh2 = new THREE.Mesh(
                new THREE.SphereGeometry(1, 32, 16),
                material
            )

            const mesh3 = new THREE.Mesh(
                new THREE.SphereGeometry(1, 32, 16),
                material
            )

            const mesh4 = new THREE.Mesh(
                new THREE.SphereGeometry(1, 32, 16),
                material
            )

            const mesh5 = new THREE.Mesh(
                new THREE.SphereGeometry(1, 32, 16),
                material
            )

        }
        

    }, []);
  return (
    <div>ScrollModelAnimation</div>
  ) 
}

export default ScrollModelAnimation