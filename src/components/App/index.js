import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../HomePage';
import DetailCharacterPage from '../DetailCharacterPage';
import fetchHarryPotter from '../../services/fetchHarryPotter';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            filter: '',
            isLoading: true
        };
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetchHarryPotter()
            .then(data => {
                const newDada = data.map((item, index) => {
                    return {
                        ...item,
                        id: index + 1
                    };
                });

                this.setState({
                    characters: newDada,
                    isLoading: false
                });
            });
    }

    handleChangeInput(e) {
        const { value } = e.currentTarget;
        this.setState({
            filter: value.toLowerCase()
        });
    }

    getCharacter(id) {
        const { characters } = this.state;
        return characters.find(character => character.id === parseInt(id));
    }

    render() {
        const { characters, filter, isLoading } = this.state;
        return (
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => (
                        <HomePage
                            charactersList={characters
                                .filter(character => character.name.toLowerCase().includes(filter))
                            }
                            onChangeInput={this.handleChangeInput}
                            valueInput={filter}
                            loading={isLoading}
                        />
                    )}
                />
                <Route
                    path="/detail-character/:id"
                    render={routerProps => (
                        <DetailCharacterPage
                            match={routerProps.match}
                            character={this.getCharacter(routerProps.match.params.id)}
                            loading={isLoading}
                        />
                    )}
                />
            </Switch>
        );
    }
}

export default App;
