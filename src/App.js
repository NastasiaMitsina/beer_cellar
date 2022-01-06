import React, {useState, useEffect} from 'react';
import {KegList} from './components/KegList';
import {NewKegForm} from './components/NewKegForm';
import {Context} from './context';

const styles = {
    wrapper: {
        padding: '2rem',
        margin: '0 auto',
        maxWidth: '800px',
        minHeight: '600px',
        backgroundColor: 'rgba(0, 0, 0, .5)',
        borderRadius: '10px',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    wrapperH1: {
        padding: '50px 20px',
        textAlign: 'center',
    },
};

function App() {
    const [kegs, setKegs] = useState([]);
    const [key, setKey] = useState('name');
    const [addNewKeg, setAddNewKeg] = useState(false);
    const [findKeg, setFindKeg] = useState('');

    useEffect(() => {
        fetch('https://api.punkapi.com/v2/beers')
            .then((res) => res.json())
            .then(
                (result) => {
                    setKegs(result);
                },
                (error) => {
                    console.log('Error: ', error);
                },
            );
    }, []);

    const toogle = (event) => {
        setAddNewKeg(!addNewKeg);
        setTimeout(() => {
            event.target.scrollIntoView();
        }, 0);
    };

    const onCreate = (name, abv, ibu, description) => {
        setKegs(
            kegs.concat([
                {
                    id: Date.now(),
                    name,
                    abv,
                    ibu,
                    description,
                },
            ]),
        );
    };

    function sortByDifferentValues() {
        if (kegs) {
            switch (key) {
                case 'name':
                    setKey('abv');
                    sortByValue('name');
                    break;
                case 'abv':
                    setKey('ibu');
                    sortByValue('abv');
                    break;
                case 'ibu':
                    setKey('name');
                    sortByValue('ibu');
                    break;
                default:
                    console.log(key);
            }
        }
    }

    function sortByValue(value) {
        setKegs(
            [...kegs].sort((beerX, beerY) => {
                return beerX[value] < beerY[value] ? -1 : 1;
            }),
        );
    }

    const filteredKegs = kegs.filter((keg) => {
        const value = findKeg.toLocaleLowerCase();
        let {name, abv, ibu} = keg;
        abv = String(keg.abv);
        ibu = String(keg.ibu);
        return name.toLocaleLowerCase().includes(value) || abv.includes(value) || ibu.includes(value);
    });

    return (
        <Context.Provider value={{onCreate}}>
            <div style={styles.wrapper}>
                <div style={styles.wrapperH1}>
                    <h1 className="main-title">Beer Cellar</h1>
                </div>
                <div style={styles.container}>
                    <input
                        value={findKeg}
                        onChange={(event) => setFindKeg(event.target.value)}
                        className="keg-form"
                        placeholder="Tap to find a keg"
                        required
                    />
                    <button className="main-button" onClick={sortByDifferentValues}>
                        Sort
                    </button>
                </div>
                <KegList kegs={filteredKegs} />
                <button className="main-button" onClick={(event) => toogle(event)}>
                    Add a new keg
                </button>
                {addNewKeg && <NewKegForm />}
            </div>
        </Context.Provider>
    );
}

export default App;
