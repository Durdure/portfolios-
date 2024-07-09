import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function ScrollModelAnimation() {
    const [loading, setLoading] = useState(true);
    const [render, setRender] = useState(false);
    const [camera, setCamera] = useState(null);
    const [scene] = useState(new THREE.Scene());
    const [controls, setControls] = useState(null);

    const refContainer = useRef();

    useEffect(() => {
        const parameters = {
            materialColor: "#ff0000",
        };
        const { current: container } = refContainer;

        if (container && !render) {
            const textureLoader = new THREE.TextureLoader();
            const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");
            const particlesTexture = textureLoader.load("/textures/particles/1.png");

            const material = new THREE.MeshToonMaterial({
                color: parameters.materialColor,
                gradientMap: gradientTexture,
            });

            const objectDistance = 4;
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

            mesh1.position.x = 3;
            mesh2.position.x = -3;
            mesh3.position.x = 3;
            mesh4.position.x = -3;
            mesh5.position.x = 3;

            mesh1.position.y = objectDistance * 0;
            mesh2.position.y = objectDistance * 1;
            mesh3.position.y = objectDistance * 2;
            mesh4.position.y = objectDistance * 3;
            mesh5.position.y = objectDistance * 4;

            scene.add(mesh1, mesh2, mesh3, mesh4, mesh5);

            const sectionMeshes = [mesh1, mesh2, mesh3, mesh4, mesh5];
            mesh1.visible = false;

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(1, 1, 0);
            directionalLight.castShadow = true;

            scene.add(directionalLight);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            const particlesGeometry = new THREE.BufferGeometry();
            const count = 1000;
            const positions = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);

            for (let i = 0; i < count * 3; i++) {
                positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
                positions[i * 3 + 1] =
                    objectDistance * 0.5 - Math.random() * objectDistance * sectionMeshes.length;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
                colors[i] = Math.random();
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.1,
                sizeAttenuation: true,
                color: new THREE.Color('#ff88cc'),
                transparent: true,
                alphaMap: particlesTexture,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                vertexColors: true,
            });

            const particles = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particles);

            const sizes = {
                width: window.innerWidth,
                height: window.innerHeight,
            };

            const cameraGroup = new THREE.Group();
            scene.add(cameraGroup);

            const camera = new THREE.PerspectiveCamera(
                35,
                sizes.width / sizes.height,
                0.1,
                100
            );
            camera.position.z = 10;
            cameraGroup.add(camera);
            

            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
            });
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.outputColorSpace = THREE.SRGBColorSpace; // Updated line
            renderer.shadowMap.enabled = true;
            (container as HTMLDivElement).appendChild(renderer.domElement);

             const controls = new OrbitControls(camera, renderer.domElement);
        }
    }
    return (
        <div>
            ScrollModelAnimation
        </div>
    );
}

export default ScrollModelAnimation;
