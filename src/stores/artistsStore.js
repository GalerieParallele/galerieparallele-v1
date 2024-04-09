import {create} from 'zustand';
import {fetchArtistById, fetchArtists} from "@/services/artistesServices";


const useArtistsStore = create((set, get) => ({
    artists: [],
    loading: false,
    error: null,
    artist: null,
    removeArtistById: (id) => {
        set({artists: get().artists.filter(artist => artist.id !== id)});
    },
    reloadArtists: async () => {
        set({loading: true, error: null});
        try {
            const response = await fetchArtists();
            if (!response.success) throw new Error(response.error.message);
            set({artists: response.data});
        } catch (error) {
            set({error: error.message});
        } finally {
            set({loading: false});
        }
    },
    getArtistById: async (id) => {
        set({loading: true, error: null});
        try {
            const response = await fetchArtistById(id);

            if (!response.success) {
                set({error: response.error});
            }

            set({artist: response.data});
        } catch (error) {
            set({error: error});
        } finally {
            set({loading: false});
        }
    }
}));

export default useArtistsStore;