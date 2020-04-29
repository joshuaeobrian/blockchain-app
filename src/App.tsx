import React from 'react';
import './App.scss';
import {
    BrowserRouter as Router,
    Switch, Route
} from "react-router-dom";
import BlockList from "./components/BlockList/BlockList";
import Block from "./components/BlockDetails/BlockDetails";

function App() {
    return (
        <Router>
            <div className="blockchain__app">
                <div className="header">
                    <h2 className="header__title right">Block Chain Info</h2>
                </div>
                <div className="content">
                    <div className="content__left">
                        <BlockList/>
                    </div>
                    <div className="content__right">
                        <Switch>
                            <Route path={"/block"}>
                                <Block/>
                            </Route>
                            <Route>
                                <div className="app">
                                    <h3 className="app__info">
                                        Please Select a Block
                                    </h3>
                                </div>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}
export default App;
