import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { InterestNode } from './types';

interface NetworkVisualizationProps {
  nodes: InterestNode[];
}

const NetworkVisualization = ({ nodes }: NetworkVisualizationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x101010);
    
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x4CAF50, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Create node geometries
    const nodeGeometry = new THREE.SphereGeometry(1, 32, 32);
    const nodeMaterial = new THREE.MeshPhongMaterial({
      color: 0x4CAF50,
      emissive: 0x2E7D32,
      emissiveIntensity: 0.3,
      shininess: 50,
    });

    // Add nodes to scene
    const nodeObjects: THREE.Mesh[] = [];
    nodes.forEach((node) => {
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      if (node.position) {
        mesh.position.set(
          node.position.x / 2,
          node.position.y / 2,
          node.position.z / 2
        );
      }
      mesh.scale.setScalar(0.5 + (node.weight || 1) * 0.2);
      nodeObjects.push(mesh);
      scene.add(mesh);
    });

    // Create connections between nodes
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x4CAF50,
      opacity: 0.3,
      transparent: true,
    });

    nodes.forEach((node) => {
      if (node.connections && node.connections.length > 0) {
        node.connections.forEach((targetId) => {
          const targetNode = nodes.find((n) => n.id === targetId);
          if (targetNode && node.position && targetNode.position) {
            const points = [
              new THREE.Vector3(
                node.position.x / 2,
                node.position.y / 2,
                node.position.z / 2
              ),
              new THREE.Vector3(
                targetNode.position.x / 2,
                targetNode.position.y / 2,
                targetNode.position.z / 2
              ),
            ];
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(lineGeometry, lineMaterial);
            scene.add(line);
          }
        });
      }
    });

    // Position camera
    camera.position.z = 50;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate nodes slightly
      nodeObjects.forEach((node) => {
        node.rotation.y += 0.005;
      });
      
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
      renderer.dispose();
    };
  }, [nodes]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[600px] rounded-lg overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #101010 0%, #1a1a1a 100%)' }}
    />
  );
};

export default NetworkVisualization;