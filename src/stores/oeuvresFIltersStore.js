import create from 'zustand';

const useFiltersStore = create((set, get) => ({
    filters: {
        orientation: [],
        priceRange: [0, 100000],
        heightRange: [0, 100000],
        widthRange: [0, 100000],
        depthRange: [0, 100000],
        uniquePiece: false,
        support: [],
        technique: [],
        encadrement: [],
        signature: [],
        colors: [],
        artists: [],
        types: [],
        tags: [],
    },
    setFilter: (filterName, value) =>
        set((state) => ({
            filters: {...state.filters, [filterName]: value},
        })),
    oeuvres: [],
    setOeuvres: (oeuvres) => set(() => ({oeuvres})),
    getFilteredOeuvres: () => {

        const {oeuvres, filters} = get();

        return oeuvres.filter((oeuvre) => {

            if (filters.orientation.length > 0 && !filters.orientation.includes(oeuvre.orientation)) return false;
            if (oeuvre.prix < filters.priceRange[0] || oeuvre.prix > filters.priceRange[1]) return false;
            if (oeuvre.hauteur < filters.heightRange[0] || oeuvre.hauteur > filters.heightRange[1]) return false;
            if (oeuvre.longueur < filters.widthRange[0] || oeuvre.longueur > filters.widthRange[1]) return false;
            if ((oeuvre.profondeur ?? 0) < filters.depthRange[0] || (oeuvre.profondeur ?? 0) > filters.depthRange[1]) return false;
            if (filters.uniquePiece && oeuvre.limitation !== 1) return false;
            if (filters.support.length > 0 && !filters.support.includes(oeuvre.support)) return false;
            if (filters.technique.length > 0 && !filters.technique.includes(oeuvre.technique)) return false;
            if (filters.encadrement.length > 0 && !filters.encadrement.includes(oeuvre.encadrement)) return false;
            if (filters.signature.length > 0 && !filters.signature.includes(oeuvre.signature)) return false;

            if (filters.colors.length > 0 && !filters.colors.some(colorHexa => oeuvre.couleurs.map(c => c.hexa).includes(colorHexa))) return false;
            if (filters.artists.length > 0 && !filters.artists.some(artistId => oeuvre.artists.map(a => a.id).includes(artistId))) return false;
            if (filters.types.length > 0 && !filters.types.some(type => oeuvre.types.map(t => t).includes(type))) return false;
            if (filters.tags.length > 0 && !filters.tags.some(tag => oeuvre.tags.map(t => t).includes(tag))) return false;

            return true;

        });
    },
}));

export default useFiltersStore;