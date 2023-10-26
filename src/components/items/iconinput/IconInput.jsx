import React from 'react';

import PropTypes from 'prop-types';

import '../../../app/globals.css'
import styles from './IconInput.module.css';
import Swal from "sweetalert2";

function IconInput({IconComponent, label, type, required, ...inputProps}) {

    const handleOpenModalInformationRequired = async () => {
        await Swal.fire(
            'Champ requis',
            'Ce champ est requis pour continuer',
            'info'
        )
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
                    {required && '*'}
                    </span>
                </p>
            </div>
            {
                type === 'textarea' ? (
                    <textarea
                        {...inputProps}
                        className={styles.input}
                        required={required}
                    />
                ) : (
                    <input
                        type={type}
                        {...inputProps}
                        className={styles.input}
                        required={required}
                    />
                )
            }
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
