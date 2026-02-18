"use client";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function SolarPanel() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.3;
  });

  return (
    <mesh ref={ref} rotation={[-0.2, 0, 0]}>
      <boxGeometry args={[3, 0.1, 2]} />
      <meshStandardMaterial color="#020617" metalness={0.7} roughness={0.15} />
    </mesh>
  );
}
