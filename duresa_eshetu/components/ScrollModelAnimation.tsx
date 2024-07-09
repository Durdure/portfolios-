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
            const gradientTexture = textureLoader.load("./../public/textures/gradients/3.jpg");
            const particlesTexture = textureLoader.load("./../public/textures/particles/1.png");
            

            const material = new THREE.MeshToonMaterial({
                color: paramerters.materialColor,
                gradientMap: gradientTexture,                
            })

            const objectDistance = 4
            const mesh1 = new THREE.Mesh(
                new THREE.TorusGeometry(1, 0.5, 16, 60),
                material
            );

         
            const mesh2 = new THREE.Mesh(
                new THREE.SphereGeometry(1, 32, 16),
                material
            );

            const mesh3 = new THREE.Mesh(
                new THREE.SphereGeometry(1, 32, 16),
                material
            );

            const mesh4 = new THREE.Mesh(
                new THREE.SphereGeometry(1, 32, 16),
                material
            );

            const mesh5 = new THREE.Mesh(
                new THREE.SphereGeometry(1, 32, 16),
                material
            );

            mesh1.position.x= 3
            mesh2.position.x= -3
            mesh3.position.x= 3
            mesh4.position.x= -3
            mesh5.position.x= 3

            mesh1.position.y= objectDistance * 0
            mesh2.position.y= objectDistance * 1
            mesh3.position.y= objectDistance * 2
            mesh4.position.y= objectDistance * 3
            mesh5.position.y= objectDistance * 4


            scen.add(mesh1, mesh2, mesh3, mesh4, mesh5);

            const sectionMeshes = [mesh1, mesh2, mesh3, mesh4, mesh5];
            mesh1.visible = false

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(1, 1, 0);
            directionalLight.castShadow = true;

            scen.add(directionalLight);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scen.add(ambientLight);



            const particlesGeometry = new THREE.BufferGeometry();
            const count = 1000;
            const positions = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);

            for (let i = 0; i < count * 3; i++) {
                positions[i*3 + 0] = (Math.random() - 0.5) * 10;
                positions[i*3 + 1] =
                    objectDistance * 0.5 - Math.random() * objectDistance * sectionMeshes.length;
                positions[i*3 + 2] = (Math.random() - 0.5) * 10;
                colors[i] = Math.random();
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const particlesMaterial = new THREE.PointsMaterial();
            particlesMaterial.size = 0.1;
            particlesMaterial.sizeAttenuation = true;
            particlesMaterial.color = new THREE.Color('#ff88cc');
            particlesMaterial.transparent = true;
        }
        

    }, []);
  return (
    <div>ScrollModelAnimation</div>
  ) 
}

export default ScrollModelAnimation