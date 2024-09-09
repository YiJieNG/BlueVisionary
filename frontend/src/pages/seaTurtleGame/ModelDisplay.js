import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useFBX } from "@react-three/drei";

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
  return <primitive object={fbx} scale={0.02} />;
}

export default function ModelDisplay({ className }) {
  const modelPath = classToModelPath[className];
  return (
    <Canvas style={{ height: "400px", width: "80%", paddingBottom: "80px" }}>
      <ambientLight intensity={0.5} />

      <pointLight position={[10, 10, 10]} intensity={1.5} />

      <directionalLight position={[-10, 10, 5]} intensity={0.7} />

      <Suspense fallback={null}>
        <SeaTurtleModel modelPath={modelPath} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
