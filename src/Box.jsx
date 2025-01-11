import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, useCursor } from "@react-three/drei";
import * as THREE from "three";

const Box = (props) => {
    const group = useRef();
    const { nodes, animations } = useGLTF("/box.glb");
    const { actions, mixer } = useAnimations(animations, group);
    const [hovered, setHovered] = useState();
    useCursor(hovered);

    useEffect(() => {
        const finishedListener = mixer.addEventListener("finished", (event) => {
            onFinishedAnimation(event);
        });
        return mixer.removeEventListener("finished", finishedListener);
    }, []);

    const turnOn = () => {
        if (
            actions.TurnOn.isRunning() ||
            (actions.TurnOff.isRunning() && actions.TurnOff.time < 2)
        ) {
            return;
        }
        actions.TurnOn.setLoop(THREE.LoopOnce);
        actions.TurnOn.clampWhenFinished = true;
        actions.TurnOn.play();
    };

    const onFinishedAnimation = (event) => {
        if (event.action.getClip().name === "TurnOn") {
            actions.TurnOn.stop();
            actions.TurnOn.reset();
            if (actions.TurnOff.isRunning()) {
            }
            actions.TurnOff.setLoop(THREE.LoopOnce);
            actions.TurnOff.clampWhenFinished = true;
            actions.TurnOff.play();
        } else if (event.action.getClip().name === "TurnOff") {
            actions.TurnOff.stop();
            actions.TurnOff.fadeOut();
            actions.TurnOff.reset();
        }
    };

    return (
        <group ref={group} {...props} dispose={null}>
            <mesh
                name="Box"
                castShadow
                receiveShadow
                geometry={nodes.Box.geometry}
                material={nodes.Box.material}
                position={[-0.252, 0.329, -0.007]}
            >
                <meshStandardMaterial
                    color="black"
                    side={THREE.DoubleSide}
                    roughness={0.35}
                />
            </mesh>
            <mesh
                name="Latch"
                castShadow
                receiveShadow
                geometry={nodes.Latch.geometry}
                material={nodes.Latch.material}
                position={[1, 0.461, -0.001]}
            >
                <meshStandardMaterial color="black" roughness={0.35} />
            </mesh>
            <mesh
                name="Screw"
                castShadow
                receiveShadow
                geometry={nodes.Screw.geometry}
                material={nodes.Screw.material}
                position={[-0.136, 0.476, 0]}
            >
                <meshStandardMaterial
                    color="white"
                    metalness={1}
                    roughness={0}
                />
            </mesh>
            <mesh
                name="Circle"
                castShadow
                receiveShadow
                geometry={nodes.Circle.geometry}
                material={nodes.Circle.material}
                position={[-0.115, 0.356, 0]}
                rotation={[0, 0, -1.082]}
            >
                <meshStandardMaterial
                    color="white"
                    metalness={1}
                    roughness={0}
                />
            </mesh>
            <mesh
                name="Switch"
                castShadow
                receiveShadow
                geometry={nodes.Switch.geometry}
                material={nodes.Switch.material}
                position={[-0.136, 0.461, 0]}
                rotation={[0, 0, 0.209]}
                onClick={turnOn}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <meshStandardMaterial
                    color="white"
                    metalness={1}
                    roughness={0}
                />
            </mesh>
        </group>
    );
};

useGLTF.preload("/box.glb");
export default Box;
