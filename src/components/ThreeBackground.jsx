import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../contexts/ThemeContext';

const ThreeBackground = () => {
  const containerRef = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    console.log('Three.js Isometric Background initializing...');

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 50);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Style the canvas
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';

    containerRef.current.appendChild(renderer.domElement);

    // Create isometric cubes
    const cubes = [];
    const hexagonalPattern = [
      // Center row (5 cubes)
      { x: -4, y: 0 }, { x: -2, y: 0 }, { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 4, y: 0 },
      // Second row up (4 cubes)
      { x: -3, y: 1.73 }, { x: -1, y: 1.73 }, { x: 1, y: 1.73 }, { x: 3, y: 1.73 },
      // Third row up (3 cubes)
      { x: -2, y: 3.46 }, { x: 0, y: 3.46 }, { x: 2, y: 3.46 },
      // Fourth row up (2 cubes)
      { x: -1, y: 5.19 }, { x: 1, y: 5.19 },
      // Top (1 cube)
      { x: 0, y: 6.92 },
      // Second row down (4 cubes)
      { x: -3, y: -1.73 }, { x: -1, y: -1.73 }, { x: 1, y: -1.73 }, { x: 3, y: -1.73 },
      // Third row down (3 cubes)
      { x: -2, y: -3.46 }, { x: 0, y: -3.46 }, { x: 2, y: -3.46 },
      // Fourth row down (2 cubes)
      { x: -1, y: -5.19 }, { x: 1, y: -5.19 },
      // Bottom (1 cube)
      { x: 0, y: -6.92 }
    ];

    // Create edges for isometric cube
    const createIsometricCube = (x, y, z, size, color, opacity) => {
      const group = new THREE.Group();

      // Define vertices for isometric cube
      const vertices = [
        // Top face
        new THREE.Vector3(-size, size, 0),
        new THREE.Vector3(0, size + size * 0.866, 0),
        new THREE.Vector3(size, size, 0),
        new THREE.Vector3(0, size - size * 0.866, 0),
        // Bottom face
        new THREE.Vector3(-size, -size, 0),
        new THREE.Vector3(0, -size + size * 0.866, 0),
        new THREE.Vector3(size, -size, 0),
        new THREE.Vector3(0, -size - size * 0.866, 0)
      ];

      // Create edges
      const edges = [
        // Top face
        [0, 1], [1, 2], [2, 3], [3, 0],
        // Bottom face
        [4, 5], [5, 6], [6, 7], [7, 4],
        // Connecting edges
        [0, 4], [1, 5], [2, 6], [3, 7]
      ];

      edges.forEach(edge => {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          vertices[edge[0]],
          vertices[edge[1]]
        ]);
        const material = new THREE.LineBasicMaterial({
          color: color,
          transparent: true,
          opacity: opacity
        });
        const line = new THREE.Line(geometry, material);
        group.add(line);
      });

      group.position.set(x, y, z);
      return group;
    };

    const cubeSize = 1;
    const color = isDarkMode ? 0xffffff : 0x000000;

    hexagonalPattern.forEach((pos, index) => {
      const cube = createIsometricCube(
        pos.x * 2,
        pos.y * 2,
        0,
        cubeSize,
        color,
        0.15
      );
      cube.userData = {
        initialRotation: cube.rotation.z,
        phase: index * 0.1,
        initialY: pos.y * 2
      };
      scene.add(cube);
      cubes.push(cube);
    });

    // Add additional layers for depth
    for (let layer = 1; layer <= 2; layer++) {
      hexagonalPattern.forEach((pos, index) => {
        const cube = createIsometricCube(
          pos.x * 2,
          pos.y * 2,
          -15 * layer,
          cubeSize * (1 + layer * 0.3),
          color,
          0.08 / layer
        );
        cube.userData = {
          initialRotation: cube.rotation.z,
          phase: index * 0.1 + layer,
          initialY: pos.y * 2,
          layer: layer
        };
        scene.add(cube);
        cubes.push(cube);
      });
    }

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.005;

      cubes.forEach((cube, index) => {
        // Gentle rotation
        cube.rotation.z = Math.sin(time + cube.userData.phase) * 0.05;

        // Gentle floating motion
        const floatY = Math.sin(time * 0.5 + cube.userData.phase) * 0.5;
        cube.position.y = cube.userData.initialY + floatY;

        // Subtle breathing/scaling
        const scale = 1 + Math.sin(time + cube.userData.phase * 2) * 0.05;
        cube.scale.set(scale, scale, 1);

        // Mouse parallax effect
        if (cube.userData.layer) {
          const parallaxStrength = 2 / cube.userData.layer;
          cube.position.x += (mouse.x * parallaxStrength - (cube.position.x - cube.userData.initialY * 0)) * 0.02;
        }
      });

      // Camera subtle movement
      camera.position.x = Math.sin(time * 0.3) * 2;
      camera.position.y = Math.cos(time * 0.2) * 1;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      cubes.forEach(cube => {
        cube.children.forEach(child => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
        scene.remove(cube);
      });

      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [isDarkMode]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
};

export default ThreeBackground;
