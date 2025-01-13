import { create } from "zustand";

const useAudioStore = create((set) => ({
    audioEnabled: false,
    toggleAudioEnabled: () =>
        set((state) => ({ audioEnabled: !state.audioEnabled })),
}));

export default useAudioStore;
