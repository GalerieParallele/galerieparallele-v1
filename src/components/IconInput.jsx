import React from 'react';

import PropTypes from 'prop-types';

import '../app/globals.css'
import styles from '@/styles/components/IconInput.module.css';

function IconInput({IconComponent, label, type, ...inputProps}) {
    return (
        <div>
            <div className={styles.top}>
                <div>{IconComponent && <IconComponent/>}</div>
                <p>{label}</p>
            </div>
            <input
                type={type} {...inputProps}
                className={styles.input}
            />
        </div>
    );
}

IconInput.propTypes = {
    IconComponent: PropTypes.elementType,
    label: PropTypes.string.isRequired,
    type: PropTypes.string
};

IconInput.defaultProps = {
    type: 'text'
};

export default IconInput;
