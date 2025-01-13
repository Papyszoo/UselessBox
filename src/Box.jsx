import React, { useEffect, useRef, useState } from "react";
import {
    useGLTF,
    useAnimations,
    useCursor,
    PositionalAudio,
} from "@react-three/drei";
import * as THREE from "three";
import useAudioStore from "./useAudioStore";

const Box = (props) => {
    const group = useRef();
    const audioEnabled = useAudioStore((state) => state.audioEnabled);
    const { nodes, animations } = useGLTF("/box.glb");
    const { actions, mixer } = useAnimations(animations, group);
    const [hovered, setHovered] = useState();
    const switchOnSoundRef = useRef();
    const switchOffSoundRef = useRef();
    const rotationSoundRef = useRef();
    useCursor(hovered);

    useEffect(() => {
        mixer.addEventListener("finished", onFinishedAnimation);
        if (!audioEnabled) {
            switchOnSoundRef.current.stop();
            switchOffSoundRef.current.stop();
            rotationSoundRef.current.stop();
        }
        return () => mixer.removeEventListener("finished", onFinishedAnimation);
    }, [audioEnabled]);

    const onClickHandler = (event) => {
        event.stopPropagation();
        turnOn();
    };

    const playSound = (ref) => {
        if (audioEnabled) {
            ref.current.play();
        }
    };

    const playTimedSound = (ref, startTime, endTime) => {
        if (audioEnabled) {
            setTimeout(() => ref.current.play(), startTime);
            setTimeout(() => ref.current.stop(), endTime);
        }
    };

    const turnOn = () => {
        if (
            actions.TurnOn.isRunning() ||
            (actions.TurnOff.isRunning() && actions.TurnOff.time < 2)
        ) {
            return;
        }
        actions.TurnOn.setLoop(THREE.LoopOnce);
        actions.TurnOn.clampWhenFinished = true;
        actions.TurnOn.fadeOut();
        actions.TurnOn.reset().play();
        playSound(switchOnSoundRef);
    };

    const turnOff = () => {
        if (actions.TurnOff.isRunning() && actions.TurnOff.time > 2) {
            const oldTime = actions.TurnOff.time;
            const newTime = actions.TurnOff.getClip().duration - oldTime;
            playTimedSound(
                switchOffSoundRef,
                1200 - newTime * 1000,
                1400 - newTime * 1000
            );
            actions.TurnOff.time = newTime;
            return;
        }
        actions.TurnOff.setLoop(THREE.LoopOnce);
        actions.TurnOff.clampWhenFinished = true;
        actions.TurnOff.reset().play();
        playSound(rotationSoundRef);
        playTimedSound(switchOffSoundRef, 1200, 1400);
    };

    const onFinishedAnimation = (event) => {
        switch (event.action.getClip().name) {
            case "TurnOn":
                actions.TurnOn.fadeOut();
                setTimeout(() => switchOnSoundRef.current.stop(), 500);
                turnOff();
                break;
            case "TurnOff":
                actions.TurnOff.fadeOut();
                rotationSoundRef.current.stop();
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
                onClick={onClickHandler}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
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
                onClick={onClickHandler}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
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
                onClick={onClickHandler}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
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
                <PositionalAudio
                    url="/rotation.wav"
                    distance={2}
                    ref={rotationSoundRef}
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
                onPointerOver={turnOn}
            >
                <meshStandardMaterial
                    color="white"
                    metalness={1}
                    roughness={0}
                />
                <PositionalAudio
                    url="/switchOn.wav"
                    distance={2}
                    ref={switchOnSoundRef}
                />
                <PositionalAudio
                    url="/switchOff.wav"
                    distance={2}
                    ref={switchOffSoundRef}
                />
            </mesh>
        </group>
    );
};

useGLTF.preload("/box.glb");
export default Box;
