import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import Box from "./Box";
import { createXRStore, XR } from "@react-three/xr";
import UI from "./UI";
import XRControls from "./XRControls";

const store = createXRStore();

function App() {
    return (
        <>
            <UI XRstore={store} />
            <Canvas camera={{ position: [0, 0.6, 1] }}>
                <XR store={store}>
                    <XRControls />
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
                        shadows={false}
                    >
                        <Box scale={0.75} rotation-y={-Math.PI} />
                    </Stage>
                </XR>
            </Canvas>
        </>
    );
}

export default App;
