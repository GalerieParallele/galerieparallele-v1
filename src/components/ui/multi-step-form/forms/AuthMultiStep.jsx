import {useFormStore} from "@/stores/useFormStore";

import styles from "@/components/ui/multi-step-form/forms/AuthMultiStep.module.scss";
import FormStep from "@/components/ui/multi-step-form/FormStep";
import React, {useEffect} from "react";

export default function AuthMultiStep({formConfig, onSubmit, loading = false}) {

    const {currentStep, nextStep, prevStep, goToStep, reset} = useFormStore();

    useEffect(() => {
        reset();
    }, []);

    return (
        <div className={styles.main}>
            {
                formConfig.length > 1 && (
                    <div className={styles.fastNav}>
                        {formConfig.map((step, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.preventDefault();
                                    goToStep(formConfig.length, step.step);
                                }}
                                className={currentStep >= step.step ? styles.active : styles.inactive}
                                disabled={loading}
                            >
                                {step.step}
                            </button>
                        ))}
                        <div className={styles.line} style={{
                            width: `${((currentStep - 1) * 100) / (formConfig.length - 1)}%`,
                            backgroundColor: 'var(--black)',
                            zIndex: 3
                        }}/>
                        <div className={styles.line} style={{
                            width: '100%',
                            zIndex: 2
                        }}/>
                    </div>
                )
            }
            <div className={styles.content}>
                {formConfig.filter(step => step.step === currentStep).map((step, index) => (
                    <>
                        <h3>{step.title}</h3>
                        {
                            formConfig.length > 1 && <p>Étape {currentStep} sur {formConfig.length}</p>
                        }
                        <FormStep stepConfig={step} loading={loading}/>
                    </>
                ))
                }
                <div className={styles.buttonSpace}>
                    {currentStep > 1 && <button onClick={prevStep} disabled={loading}>Précédent</button>}
                    {currentStep < formConfig.length && <button onClick={nextStep} disabled={loading}>Suivant</button>}
                    {currentStep === formConfig.length &&
                        <button onClick={onSubmit} disabled={loading}>Envoyer</button>}
                </div>
            </div>
        </div>
    );
}