"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import SolarPanel from "./SolarPanel";

export default function SolarCanvas() {
  return (
    <Canvas camera={{ position: [5, 3, 5], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Float speed={2}>
        <SolarPanel />
      </Float>
      <Environment preset="sunset" />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
