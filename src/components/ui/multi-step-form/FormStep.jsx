import React from 'react';

import IconInput from "@/components/ui/iconinput/IconInput";
import {useFormStore} from "@/stores/useFormStore";

const FormStep = ({ stepConfig, loading = false }) => {

    const { formData, setFormData } = useFormStore();

    return (
        <>
            {stepConfig.fields.map(field => (
                <IconInput
                    key={field.key}
                    label={field.label}
                    type={field.type}
                    IconComponent={field.icon}
                    value={formData[field.key] || ""}
                    onChange={e => setFormData(field.key, e.target.value)}
                    required={field.required}
                    style={{ width: "100%"}}
                    disabled={loading}
                />
            ))}
        </>
    );
};

export default FormStep;
