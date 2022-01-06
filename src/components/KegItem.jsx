import React from 'react';
import propTypes from 'prop-types';

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
};

export function KegItem({keg, handleClickItem}) {
    return (
        <li onClick={() => handleClickItem(keg)} style={styles.li}>
            {keg.name}
            <div style={styles.infoWrapper}>
                <p>
                    <span>{keg.abv} %</span>
                </p>
                <p>
                    <span>{keg.ibu || '--'} IBU</span>
                </p>
            </div>
        </li>
    );
}

KegItem.propTypes = {
    keg: propTypes.array,
    handleClickItem: propTypes.func,
}