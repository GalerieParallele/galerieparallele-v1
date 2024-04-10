import create from 'zustand'

const initialState = {
    user: {
        email: undefined,
        password: undefined,
        lastname: undefined,
        firstname: undefined,
        street: undefined,
        city: undefined,
        postalCode: undefined,
        phone: undefined,
        avatarURL: undefined,
    },
    artist: {
        pseudo: undefined,
        nationality: undefined,
        bio: undefined,
        instagram: undefined,
        facebook: undefined,
        linkedin: undefined,
        website: undefined,
        atTheTop: undefined,
        private: undefined,
        userid: undefined,
        tags: undefined,
        saveTheDate: undefined,
        exposition: undefined,
        oeuvre: undefined,
        portrait: undefined,
        recompense: undefined,
        legalInformation: {
            numMaisonsDesArtistes: undefined,
            numSecuriteSociale: undefined,
            tauxTva: undefined,
            legalInformation: {
                societe: undefined,
                adrNumVoie: undefined,
                adrRue: undefined,
                adrVille: undefined,
                adrCodePostal: undefined,
                siret: undefined,
                tva: undefined,
            }
        }
    },
}

const useUpdateArtistInformations = create((set, get) => ({
    formData: {...initialState},
    updateFormData: (fieldPath, value) => set((state) => {
        const fields = fieldPath.split('.');
        const formData = {...state.formData};
        let current = formData;

        for (let i = 0; i < fields.length - 1; i++) {
            current[fields[i]] = {...current[fields[i]]};
            current = current[fields[i]];
        }

        current[fields[fields.length - 1]] = value;
        return { formData };
    }),
    resetFormData: () => {
        set({formData: {...initialState}});
    }
}));

export default useUpdateArtistInformations;