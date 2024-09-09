import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useFBX } from "@react-three/drei";
import { EffectComposer, Bloom, SSAO } from "@react-three/postprocessing"; // Post-processing effects

const classToModelPath = {
  Hatchling: "/minigame/Hatchling.fbx",
  Juvenile: "/minigame/Juvenile.fbx",
  Explorer: "/minigame/Explorer.fbx",
  Guardian: "/minigame/Guardian.fbx",
  Master: "/minigame/Master.fbx",
  Top1: "/minigame/Top1.fbx",
};

function SeaTurtleModel({ modelPath }) {
  const fbx = useFBX(modelPath);

  // Apply MeshStandardMaterial for better lighting interaction
  return (
    <primitive
      object={fbx}
      scale={0.03}
      material={<meshStandardMaterial metalness={0.5} roughness={0.4} />}
    />
  );
}

export default function ModelDisplay({ className }) {
  const modelPath = classToModelPath[className];
  return (
    <Canvas
      shadows
      style={{ height: "400px", width: "80%", paddingBottom: "80px" }}
      camera={{ position: [0, 5, 10], fov: 35 }} // Slightly adjust camera position for better view
    >
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.3} />

      {/* Point light coming from the front to light up the model from viewer's perspective */}
      <pointLight position={[0, 5, 10]} intensity={1.8} castShadow />

      {/* Optional directional light from a slight overhead angle */}
      <directionalLight
        position={[0, 5, 15]} // Positioned in front of the model
        intensity={0.9}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Hemisphere light for environment illumination */}
      <hemisphereLight
        skyColor={0xffffff}
        groundColor={0x444444}
        intensity={0.4}
      />

      {/* Model loader */}
      <Suspense fallback={null}>
        <SeaTurtleModel modelPath={modelPath} />
      </Suspense>

      {/* Add Orbit controls */}
      <OrbitControls />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.3} height={300} />
        <SSAO radius={0.02} intensity={20} />
      </EffectComposer>
    </Canvas>
  );
}
