import React from 'react';
import propTypes from 'prop-types';
import kegDefault from '../assets/kegDefault.png';

const styles = {
    container: {
        display: 'flex',
        height: '400px',
        margin: '2rem',
    },
    img: {
        width: 'auto',
        height: '100%',
    },
    info: {
        paddingLeft: '3rem',
        height: '100%',
    },
    span: {
        marginLeft: '1.5rem',
    },
    description: {
        height: '200px',
        width: '100%',
        overflow: 'auto',
    },
};

export function KegCard({keg, closeModal}) {
    return (
        <div onClick={(event) => closeModal(true, event)} className="modal">
            <div className="modal-container">
                <div style={styles.container}>
                    <img src={keg['image_url'] || kegDefault} alt="beer" style={styles.img} />
                    <div style={styles.info}>
                        <h2>{keg.name}</h2>
                        <span>{keg.abv} %</span>
                        <span style={styles.span}>{keg.ibu} IBU</span>
                        <p style={styles.description}>{keg.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

KegCard.propTypes = {
    keg: propTypes.array,
    closeModal: propTypes.func
};
