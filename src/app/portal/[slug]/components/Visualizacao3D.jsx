"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment, useGLTF } from "@react-three/drei";

function GalpaoIlustrativo({ percentual }) {
  const progresso = Math.max(0, Math.min(100, percentual)) / 100;
  return (
    <group position={[0, -0.35, 0]}>
      <mesh position={[0, -0.08, 0]} receiveShadow>
        <boxGeometry args={[3.5, 0.12, 2.2]} />
        <meshStandardMaterial color="#292d2b" roughness={0.85} />
      </mesh>

      {/* Volume principal do galpão */}
      <mesh position={[0, 0.78, 0]} castShadow>
        <boxGeometry args={[2.8, 1.55, 1.75]} />
        <meshStandardMaterial color="#183d32" metalness={0.12} roughness={0.65} />
      </mesh>

      {/* Fachada frontal preenchida conforme o percentual geral */}
      <mesh position={[-1.405 + (2.82 * progresso) / 2, 0.78, 0.884]}>
        <boxGeometry args={[Math.max(0.001, 2.82 * progresso), 1.53, 0.025]} />
        <meshStandardMaterial color="#159b79" transparent opacity={0.78} roughness={0.45} />
      </mesh>

      {/* Cobertura */}
      <mesh position={[0, 1.62, 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[3.02, 0.12, 1.98]} />
        <meshStandardMaterial color="#287e66" metalness={0.18} roughness={0.55} />
      </mesh>

      {/* Vigas laterais */}
      {[-1.42, 1.42].map((x) => (
        <mesh key={x} position={[x, 0.78, 0]} castShadow>
          <boxGeometry args={[0.07, 1.65, 1.9]} />
          <meshStandardMaterial color="#36b38f" />
        </mesh>
      ))}
    </group>
  );
}

function ModeloGLB({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene.clone()} scale={1.6} position={[0, -0.7, 0]} />;
}

export default function Visualizacao3D({ modeloUrl, percentual }) {
  return (
    <div className="h-[260px] overflow-hidden rounded-xl border border-white/[0.05] bg-[radial-gradient(ellipse_at_center,_#202522_0%,_#101211_75%)]">
      <Canvas camera={{ position: [4.5, 3.2, 5], fov: 38 }} shadows dpr={[1, 1.7]}>
        <ambientLight intensity={1.15} />
        <directionalLight position={[4, 7, 5]} intensity={2} castShadow />
        <Suspense fallback={<GalpaoIlustrativo percentual={percentual} />}>
          {modeloUrl
            ? <ModeloGLB url={modeloUrl} />
            : <GalpaoIlustrativo percentual={percentual} />}
          <Environment preset="city" />
        </Suspense>
        <ContactShadows position={[0, -0.48, 0]} opacity={0.4} scale={7} blur={2.5} far={3} />
        <OrbitControls enablePan={false} minDistance={3.5} maxDistance={9} maxPolarAngle={Math.PI / 2.05} />
      </Canvas>
    </div>
  );
}
