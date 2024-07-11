import gsap from 'gsap';
import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DivContainer, DivSpinner } from './ScrollPage';
import {loadGLTFModel} from "./../libs/models"


function ScrollModelAnimation() {
    const [loading, setLoading] = useState(true);
    const [render, setRender] = useState(false);
    const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
    const [scene] = useState(new THREE.Scene());
    const [controls, setControls] = useState<OrbitControls | null>(null);

    const refContainer = useRef<HTMLDivElement>(null);
    const sectionMeshes: THREE.Mesh[] = [];

    useEffect(() => {
        const parameters = {
            materialColor: "#ff0000",
        };
        const { current: container } = refContainer;

        if (container && !render) {
            const textureLoader = new THREE.TextureLoader();
            const eartTexture = textureLoader.load("/textures/earth/earth.jpeg");
            const moonTexture = textureLoader.load("/textures/moon/moon.jpeg");
            const sunTexture = textureLoader.load("/textures/sun/sun.jpeg");
            const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");
            gradientTexture.magFilter = THREE.NearestFilter;
            const particlesTexture = textureLoader.load("/textures/particles/1.png");
            

            const material = new THREE.MeshToonMaterial({
                color: parameters.materialColor,
                gradientMap: gradientTexture,
              });


            loadGLTFModel(scene, "/Desktop.glb", {
                receiveShadow: true,
                castShadow: true,
              }).then(() => {
                setLoading(false);
              });

            const objectDistance = 4;
            const mesh1 = new THREE.Mesh(
                new THREE.TorusGeometry(1, 0.4, 16, 60),
                material
            );


            const mesh2 = new THREE.Mesh(
                new THREE.SphereGeometry(1),
                new THREE.MeshStandardMaterial({
                map: moonTexture,
                })
            );


            const mesh3 = new THREE.Mesh(
                new THREE.SphereGeometry(1),
                new THREE.MeshStandardMaterial({
                  map: eartTexture,
                })
            );


            const mesh4 = new THREE.Mesh(
                new THREE.SphereGeometry(1),
                new THREE.MeshStandardMaterial({
                  map: sunTexture,
                })
              );


              const mesh5 = new THREE.Mesh(
                new THREE.SphereGeometry(1),
                new THREE.MeshStandardMaterial({
                  color: "red",
                  wireframe: true,
                })
              );

            mesh1.position.set(3, objectDistance * 0, 0);
            mesh2.position.set(-3, objectDistance * 1, 0);
            mesh3.position.set(3, objectDistance * 2, 0);
            mesh4.position.set(-3, objectDistance * 3, 0);
            mesh5.position.set(3, objectDistance * 4, 0);

            scene.add(mesh1, mesh2, mesh3, mesh4, mesh5);
            sectionMeshes.push(mesh1, mesh2, mesh3, mesh4, mesh5);
            mesh1.visible = false;

            mesh1.position.x = 3;
            mesh2.position.x = -3;
            mesh3.position.x = 3;
            mesh4.position.x = -3;
            mesh5.position.x = 3;

            mesh1.position.y = -objectDistance * 0;
            mesh2.position.y = -objectDistance * 1;
            mesh3.position.y = -objectDistance * 2;
            mesh4.position.y = -objectDistance * 3;
            mesh5.position.y = -objectDistance * 4;

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
                positions[i * 3 + 1] = objectDistance * 0.5 - Math.random() * objectDistance * sectionMeshes.length;
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
            camera.position.z = 6;
            cameraGroup.add(camera);
            setCamera(camera);

            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
            });
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.shadowMap.enabled = true;
            container.appendChild(renderer.domElement);

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.autoRotate = true;
            setControls(controls);

            let scrollY = window.scrollY;
            let currentSection = 0;

            window.addEventListener('scroll', () => {
                scrollY = window.scrollY;
                const newSection = Math.round(scrollY / sizes.height);

                if (newSection !== currentSection && newSection < sectionMeshes.length) {
                    currentSection = newSection;

                    gsap.to(sectionMeshes[currentSection].rotation, {
                        duration: 1.5,
                        ease: "power2.inOut",
                        x: "+=6",
                        y: "+=3",
                        z: "+=1.5",
                    });
                }
            });

            const cursor = { x: 0, y: 0 };

            window.addEventListener("mousemove", (e) => {
                cursor.x = e.clientX / sizes.width - 0.5;
                cursor.y = e.clientY / sizes.height - 0.5;
            });

            const clock = new THREE.Clock();
            let previousTime = 0;

            const animate = () => {
                const elapsedTime = clock.getElapsedTime();
                const deltaTime = elapsedTime - previousTime;
                previousTime = elapsedTime;

                particles.rotation.y = elapsedTime * 0.2;

                camera.position.y = (-scrollY / sizes.height) * objectDistance;

                const parallaxX = -cursor.x * 0.5;
                const parallaxY = cursor.y * 0.5;

                cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
                cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

                for (const mesh of sectionMeshes) {
                    mesh.rotation.x += deltaTime * 0.1;
                    mesh.rotation.y += deltaTime * 0.12;
                }

                renderer.render(scene, camera);
                requestAnimationFrame(animate);
            };
            animate();
            setRender(true);
            setLoading(false);
        }

        return () => {
            const { current: container } = refContainer;
            if (container) {
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
            }
        };
    }, []);

    return (
        <DivContainer ref={refContainer}>
            {loading && <DivSpinner />}
        </DivContainer>
    );
}

export default ScrollModelAnimation;
