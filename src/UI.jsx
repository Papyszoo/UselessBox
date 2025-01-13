import React, { useEffect, useMemo } from "react";
import "./UI.css";
import useAudioStore from "./useAudioStore";

const UI = ({ XRstore }) => {
    const audioEnabled = useAudioStore((state) => state.audioEnabled);
    const toggleAudioEnabled = useAudioStore(
        (state) => state.toggleAudioEnabled
    );
    const setSoundEnabled = useAudioStore((state) => state.setSoundEnabled);
    const audio = useMemo(() => {
        const audio = new Audio("/ambience.wav");
        audio.volume = 0.15;
        return audio;
    }, []);

    useEffect(() => {
        if (audioEnabled) {
            audio.loop = true;
            audio.play();
        } else {
            audio.pause();
        }
    }, [audioEnabled]);

    const handleEnterVR = () => {
        setSoundEnabled(true);
        XRstore.enterVR();
    };

    return (
        <>
            <div className="ui-container">
                <div className="buttons-container">
                    <button className="ui-button" onClick={toggleAudioEnabled}>
                        Sound
                    </button>
                    <button className="ui-button" onClick={handleEnterVR}>
                        Enter VR
                    </button>
                </div>
            </div>
        </>
    );
};

export default UI;
