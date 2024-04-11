import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import '../../../app/globals.css'
import styles from './IconInput.module.scss';
import Swal from "sweetalert2";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import Image from "next/image";

export const handleOpenModalInformationRequired = async () => {
    await Swal.fire(
        'Champ requis',
        'Ce champ est requis pour continuer',
        'info'
    )
}

function IconInput({
                       IconComponent,
                       label,
                       type,
                       required,
                       file = null,
                       fileText = "Cliquez pour ajouter un fichier",
                       ...inputProps
                   }) {

    const [showPassword, setShowPassword] = useState(false);

    const fileRef = useRef(null);

    const handleOpenFileModal = () => {
        fileRef.current.click();
    }

    const renderInput = () => {
        switch (type) {
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
                            >
                                {showPassword ? <FaEyeSlash/> : <FaEye/>}
                            </button>
                        </div>
                    </div>
                );
            case 'avatar':
                return (
                    <div
                        className={styles.mainFileContainer}>
                        <div
                            className={styles.fileInput}
                            onClick={handleOpenFileModal}
                        >
                            <input
                                type={"file"}
                                {...inputProps}
                                className={styles.input}
                                required={required}
                                style={{display: 'none'}}
                                ref={fileRef}
                            />
                            <p>{fileText}</p>
                        </div>
                        <div>
                            <div
                                className={styles.imgContainer}
                            >
                                <Image
                                    src={file || '/assets/img/no-img.jpg'}
                                    alt={'file'}
                                    className={styles.fileImage}
                                    width={150}
                                    height={150}
                                />
                            </div>
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
