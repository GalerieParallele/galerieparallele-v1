import create from 'zustand';

export const useFormStore = create(set => ({
    formData: {},
    currentStep: 1,
    setFormData: (key, value) => set(state => ({
        formData: {...state.formData, [key]: value}
    })),
    nextStep: () => set(state => ({currentStep: state.currentStep + 1})),
    prevStep: () => set(state => ({currentStep: state.currentStep - 1})),
    goToStep: (totalSteps, step) => set(state => {
        if (step >= 1 && step <= totalSteps) {
            return {currentStep: step}
        } else {
            return {currentStep: state.currentStep}
        }
    }),
    reset: () => set({formData: {}, currentStep: 1})
}));
