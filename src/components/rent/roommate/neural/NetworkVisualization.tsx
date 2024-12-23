import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { InterestNode } from './NeuralMatch';

interface NetworkVisualizationProps {
  nodes: InterestNode[];
}

const NetworkVisualization = ({ nodes }: NetworkVisualizationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x4CAF50, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Create node geometries
    const nodeGeometry = new THREE.SphereGeometry(1, 32, 32);
    const nodeMaterial = new THREE.MeshPhongMaterial({ color: 0x4CAF50 });

    // Add nodes to scene
    nodes.forEach((node) => {
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      const position = node.position as { x: number; y: number; z: number };
      mesh.position.set(position.x, position.y, position.z);
      scene.add(mesh);
    });

    // Position camera
    camera.position.z = 100;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [nodes]);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default NetworkVisualization;