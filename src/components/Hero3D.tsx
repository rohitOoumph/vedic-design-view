import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xD4A574, 0.5);
    pointLight.position.set(-5, 5, -5);
    scene.add(pointLight);

    // Create geometric shapes representing interior elements
    const geometry1 = new THREE.BoxGeometry(3, 4, 0.2);
    const material1 = new THREE.MeshStandardMaterial({ 
      color: 0x8B7355,
      roughness: 0.5,
      metalness: 0.2
    });
    const wall = new THREE.Mesh(geometry1, material1);
    wall.position.set(0, 0, -2);
    scene.add(wall);

    // Furniture piece 1
    const geometry2 = new THREE.BoxGeometry(2, 0.8, 1.5);
    const material2 = new THREE.MeshStandardMaterial({ 
      color: 0xD4A574,
      roughness: 0.4,
      metalness: 0.3
    });
    const furniture1 = new THREE.Mesh(geometry2, material2);
    furniture1.position.set(-2, -1, 0);
    scene.add(furniture1);

    // Furniture piece 2
    const geometry3 = new THREE.BoxGeometry(1.5, 1.2, 1.2);
    const material3 = new THREE.MeshStandardMaterial({ 
      color: 0xA0826D,
      roughness: 0.6,
      metalness: 0.1
    });
    const furniture2 = new THREE.Mesh(geometry3, material3);
    furniture2.position.set(2, -0.8, 0.5);
    scene.add(furniture2);

    // Accent piece
    const geometry4 = new THREE.CylinderGeometry(0.3, 0.3, 2, 32);
    const material4 = new THREE.MeshStandardMaterial({ 
      color: 0xD4A574,
      roughness: 0.2,
      metalness: 0.8
    });
    const accent = new THREE.Mesh(geometry4, material4);
    accent.position.set(-3, 0, 1);
    scene.add(accent);

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Subtle rotation
      wall.rotation.y = Math.sin(Date.now() * 0.0003) * 0.1;
      furniture1.rotation.y += 0.002;
      furniture2.rotation.y -= 0.001;
      accent.rotation.y += 0.005;

      // Floating animation
      furniture1.position.y = -1 + Math.sin(Date.now() * 0.001) * 0.1;
      furniture2.position.y = -0.8 + Math.cos(Date.now() * 0.0012) * 0.08;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full absolute inset-0 opacity-30"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default Hero3D;
