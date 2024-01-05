import React, {useState} from 'react';
import PropTypes from 'prop-types';
import '../../../app/globals.css'
import styles from './IconInput.module.css';
import Swal from "sweetalert2";
import {FaEye, FaEyeSlash} from "react-icons/fa";

function IconInput({IconComponent, label, type, required, ...inputProps}) {
    const [showPassword, setShowPassword] = useState(false);

    const handleOpenModalInformationRequired = async () => {
        await Swal.fire(
            'Champ requis',
            'Ce champ est requis pour continuer',
            'info'
        )
    }

    // Fonction pour gérer le rendu en fonction du type
    const renderInput = () => {
        switch(type) {
            case 'textarea':
                return (
                    <textarea
                        {...inputProps}
                        className={styles.input}
                        required={required}
                    />
                );
            case 'password':
                return (
                    <div className={styles.passwordInput}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...inputProps}
                            className={styles.input}
                            required={required}
                        />
                        <div className={styles.passwordVisibility}>
                            <button
                                type={'button'}
                                onClick={() => setShowPassword(!showPassword)}
                                className={styles.showPassword}>
                                {showPassword ? <FaEyeSlash/> : <FaEye/>}
                            </button>
                        </div>
                    </div>
                );
            default:
                return (
                    <input
                        type={type}
                        {...inputProps}
                        className={styles.input}
                        required={required}
                    />
                );
        }
    }

    return (
        <div>
            <div className={styles.top}>
                <div>{IconComponent && <IconComponent/>}</div>
                <p>
                    {label}
                    <span
                        onClick={handleOpenModalInformationRequired}
                        className={styles.required}
                        title={"Champ requis"}>
                    {required && ' *'}
                    </span>
                </p>
            </div>
            {renderInput()}
        </div>
    );
}

IconInput.propTypes = {
    IconComponent: PropTypes.elementType,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    required: PropTypes.bool
};

IconInput.defaultProps = {
    type: 'text',
    required: false
};

export default IconInput;
