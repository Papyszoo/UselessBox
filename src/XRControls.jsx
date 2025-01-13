import { useXRControllerLocomotion, XROrigin } from "@react-three/xr";
import React, { useRef } from "react";

const XRControls = () => {
    const originRef = useRef();
    useXRControllerLocomotion(originRef);
    return <XROrigin ref={originRef} scale={0.75} position={[0.35, 0, 1]} />;
};

export default XRControls;
