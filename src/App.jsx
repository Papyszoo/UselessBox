import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import Box from "./Box";

function App() {
    return (
        <>
            <Canvas>
                <OrbitControls />
                <Stage>
                    <Box />
                </Stage>
            </Canvas>
        </>
    );
}

export default App;
