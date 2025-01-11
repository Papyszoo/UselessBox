import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const Box = (props) => {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF("/box.glb");
    const { actions } = useAnimations(animations, group);
    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <mesh
                    name="Box"
                    castShadow
                    receiveShadow
                    geometry={nodes.Box.geometry}
                    material={nodes.Box.material}
                    position={[-0.252, 0.329, -0.007]}
                />
                <mesh
                    name="Latch"
                    castShadow
                    receiveShadow
                    geometry={nodes.Latch.geometry}
                    material={nodes.Latch.material}
                    position={[1, 0.461, -0.001]}
                />
                <mesh
                    name="Screw"
                    castShadow
                    receiveShadow
                    geometry={nodes.Screw.geometry}
                    material={nodes.Screw.material}
                    position={[-0.136, 0.476, 0]}
                />
                <mesh
                    name="Circle"
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle.geometry}
                    material={nodes.Circle.material}
                    position={[-0.115, 0.356, 0]}
                    rotation={[0, 0, -1.082]}
                />
                <mesh
                    name="Switch"
                    castShadow
                    receiveShadow
                    geometry={nodes.Switch.geometry}
                    material={nodes.Switch.material}
                    position={[-0.136, 0.461, 0]}
                    rotation={[0, 0, -0.209]}
                />
            </group>
        </group>
    );
};

useGLTF.preload("/box.glb");
export default Box;
