import {create} from "zustand";

const initialState = {
    informations_generales: {
        name: undefined,
        description: undefined,
        anecdote: undefined,
        prix: undefined,
    }
}

const useUpdateOeuvre = create((set, get) => ({
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
        return {formData};
    }),
    resetFormData: () => {
        set({formData: {...initialState}});
    }
}))

export default useUpdateOeuvre;