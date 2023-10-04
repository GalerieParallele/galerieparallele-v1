import React from 'react';

import PropTypes from 'prop-types';

import '../../../app/globals.css'
import styles from './IconInput.module.css';

function IconInput({IconComponent, label, type, required, ...inputProps}) {
    return (
        <div>
            <div className={styles.top}>
                <div>{IconComponent && <IconComponent/>}</div>
                <p>{label}</p>
            </div>
            <input
                type={type}
                {...inputProps}
                className={styles.input}
                required={required}
            />
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
    required: true
};

export default IconInput;
