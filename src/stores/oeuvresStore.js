import {create} from "zustand";

import {fetchOeuvreById, fetchOeuvres} from "@/services/oeuvresServices";

const useOeuvresStore = create((set, get) => ({
    oeuvres: [],
    oeuvre: null,
    loading: false,
    error: null,
    removeOeuvreById: (id) => {
        set({oeuvres: get().oeuvres.filter(oeuvre => oeuvre.id !== id)});
    },
    reloadOeuvres: async () => {
        set({loading: true, error: null});
        try {
            const response = await fetchOeuvres();
            if (!response.success) throw new Error(response.error);
            set({oeuvres: response.oeuvres});
        } catch (error) {
            set({error});
        } finally {
            set({loading: false});
        }
    },
    getOeuvreById: async (id) => {
        set({loading: true, error: null});
        try {
            const response = await fetchOeuvreById(parseInt(id));

            if (!response.success) {
                throw new Error(response.error);
            }

            set({oeuvre: response.data});

        } catch (error) {
            set({error: error});
        } finally {
            set({loading: false});
        }
    }
}));

export default useOeuvresStore;