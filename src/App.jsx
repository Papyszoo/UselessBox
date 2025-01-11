import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import Box from "./Box";

function App() {
    return (
        <>
            <Canvas>
                <color attach="background" args={["skyblue"]} />
                {/* <ambientLight intensity={0.5} /> */}
                <OrbitControls />
                <Stage
                    preset="rembrandt"
                    adjustCamera={false}
                    center={false}
                    position-y={-0.01}
                    intensity={0.5}
                >
                    <Box scale={0.75} rotation-y={-Math.PI} />
                </Stage>
            </Canvas>
        </>
    );
}

export default App;
