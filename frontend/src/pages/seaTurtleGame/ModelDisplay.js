import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useFBX, useTexture } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

const classToModelPath = {
  Hatchling: "/minigame/Hatchling.fbx",
  Juvenile: "/minigame/Juvenile.fbx",
  Explorer: "/minigame/Explorer.fbx",
  Guardian: "/minigame/Guardian.fbx",
  Master: "/minigame/Master.fbx",
  Top1: "/minigame/Top1.fbx",
};

const classToTexturePath = {
  Hatchling: "/minigame/Hatchling.png",
  Juvenile: "/minigame/Juvenile.png",
  Explorer: "/minigame/Explorer.png",
  Guardian: "/minigame/Guardian.png",
  Master: "/minigame/Master.png",
  Top1: "/minigame/Top1.png",
};

function SeaTurtleModel({ modelPath, texturePath }) {
  const fbx = useFBX(modelPath);
  const texture = useTexture(texturePath);

  // Animations for scale and continuous rotation
  const { scale, rotation } = useSpring({
    from: { scale: [0, 0, 0], rotation: [0, Math.PI, 0] }, // Start with the back facing the user
    to: { scale: [0.03, 0.03, 0.03], rotation: [0, Math.PI * 2, 0] }, // Rotate 360 degrees
    loop: false, // Keep looping the animation
    config: { duration: 5000 }, // Set a decent speed for continuous spinning
  });

  // Traverse the FBX model to apply the texture to all mesh materials
  fbx.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        map: texture, // Apply the loaded texture
        metalness: 0.2,
        roughness: 0.4,
      });
    }
  });

  return <animated.primitive object={fbx} scale={scale} rotation={rotation} />;
}

export default function ModelDisplay({ className }) {
  const modelPath = classToModelPath[className];
  const texturePath = classToTexturePath[className];

  return (
    <Canvas
      shadows
      style={{ height: "400px", width: "80%", paddingBottom: "80px" }}
      camera={{ position: [0, 5, 10], fov: 35 }} // Slightly adjust camera position for better view
    >
      <ambientLight intensity={0.3} />

      <pointLight position={[0, 5, 10]} intensity={1.8} castShadow />

      <directionalLight
        position={[0, 5, 15]} // Positioned in front of the model
        intensity={0.6}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <hemisphereLight
        skyColor={0xffffff}
        groundColor={0x444444}
        intensity={0.4}
      />

      {/* Model loader */}
      <Suspense fallback={null}>
        <SeaTurtleModel modelPath={modelPath} texturePath={texturePath} />
      </Suspense>

      {/* Add Orbit controls */}
      <OrbitControls />

      {/* Post-processing effects can be uncommented */}
      {/* <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.3} height={300} />
      </EffectComposer> */}
    </Canvas>
  );
}
