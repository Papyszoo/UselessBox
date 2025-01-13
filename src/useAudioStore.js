import { create } from "zustand";

const useAudioStore = create((set) => ({
    audioEnabled: false,
    toggleAudioEnabled: () =>
        set((state) => ({ audioEnabled: !state.audioEnabled })),
    setSoundEnabled: (audioEnabled) => set({ audioEnabled }),
}));

export default useAudioStore;
