import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import Box from "./Box";

function App() {
    return (
        <>
            <Canvas camera={{ position: [0.35, 0.6, 1] }}>
                <color attach="background" args={["skyblue"]} />
                <ambientLight intensity={0.5} />
                <OrbitControls
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 1.9}
                    makeDefault
                />
                <Stage
                    preset="rembrandt"
                    adjustCamera={false}
                    center={{ bottom: -0.01 }}
                    intensity={0.5}
                >
                    <Box scale={0.75} rotation-y={-Math.PI} />
                </Stage>
            </Canvas>
        </>
    );
}

export default App;
