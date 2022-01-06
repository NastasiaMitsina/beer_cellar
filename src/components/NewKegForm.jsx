import React, {useContext, useState} from 'react';
import {Context} from '../context';

const styles = {
    wrapper: {
        margin: '2rem auto',
        width: '400px',
        alignItems: 'center',
    },
    button: {
        height: '4rem',
    },
};

export function NewKegForm() {
    const {onCreate} = useContext(Context);
    const [beerName, setBeerName] = useState('');
    const [beerAbv, setBeerAbv] = useState('');
    const [beerIbu, setBeerIbu] = useState('');
    const [beerDescription, setBeerDescription] = useState('');

    function submitHandler(event) {
        event.preventDefault();

        if (beerName.trim() && beerAbv.trim() && beerIbu.trim() && beerDescription.trim()) {
            onCreate(beerName, beerAbv, beerIbu, beerDescription);
            setBeerName('');
            setBeerAbv('');
            setBeerIbu('');
            setBeerDescription('');
        }
    }

    return (
        <form style={styles.wrapper} onSubmit={submitHandler}>
            <h2 className="subtitle">Add a new keg to your cellar!</h2>
            <input
                type="text"
                value={beerName}
                onChange={(event) => setBeerName(event.target.value)}
                className="keg-form"
                placeholder="Name"
                required
            />
            <input
                type="text"
                value={beerAbv}
                onChange={(event) => setBeerAbv(event.target.value)}
                className="keg-form"
                placeholder="Abv"
                required
            />
            <input
                type="text"
                value={beerIbu}
                onChange={(event) => setBeerIbu(event.target.value)}
                className="keg-form"
                placeholder="Ibu"
                required
            />
            <textarea
                className="keg-form"
                value={beerDescription}
                onChange={(event) => setBeerDescription(event.target.value)}
                placeholder="Description"
                required
            ></textarea>
            <button className="main-button" type="submit" style={styles.button}>
                Add
            </button>
        </form>
    );
}
