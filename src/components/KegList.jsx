import React, {useState} from 'react';
import propTypes from 'prop-types';
import {KegItem} from './KegItem';
import {KegCard} from './KegCard';

const styles = {
    ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
};

export function KegList({kegs}) {
    const [kegClicked, setKegClicked] = useState(false);
    const [currenrKeg, setCurrentKeg] = useState([]);

    function handleClickItem(keg) {
        setKegClicked(true);
        setCurrentKeg(keg);
    }

    function closeModal(close, event) {
        if (event.target.classList.contains('modal')) {
            setKegClicked(!close);
        }
    }

    return (
        <>
            <ul style={styles.ul}>
                {kegs &&
                    kegs.map((keg) => {
                        return <KegItem key={keg.id} keg={keg} handleClickItem={handleClickItem} />;
                    })}
            </ul>
            {kegClicked && <KegCard keg={currenrKeg} closeModal={closeModal} />}
        </>
    );
}

KegList.propTypes = {
    kegs: propTypes.array,
}
