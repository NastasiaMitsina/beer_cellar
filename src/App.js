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
    const [key, setKey] = useState('');
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

    const toggle = (event) => {
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
            case '':
                setKey('name');
                break;
            case 'name':
                setKey('abv');
                break;
            case 'abv':
                setKey('ibu');
                break;
            case 'ibu':
                setKey('');
                break;
            default:
                console.log(key);
            }
        }
    }

    const sortedKegs = [...kegs].sort((beerX, beerY) => {
        return beerX[key] < beerY[key] ? -1 : 1;
    });

    const filteredKegs = sortedKegs.filter((keg) => {
        const value = findKeg.toLocaleLowerCase();
        let {name, abv, ibu} = keg;
        abv = String(abv);
        ibu = String(ibu);
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
                        {key ? `Sorted by ${key}` : 'Sort'}
                    </button>
                </div>
                <KegList kegs={filteredKegs} />
                <button className="main-button" onClick={(event) => toggle(event)}>
                    Add a new keg
                </button>
                {addNewKeg && <NewKegForm />}
            </div>
        </Context.Provider>
    );
}

export default App;
