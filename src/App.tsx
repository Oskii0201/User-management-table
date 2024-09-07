import React from 'react';
import { Provider } from 'react-redux';
import {UserTable} from "./components/UserTable";
import {store} from "./store/store";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <UserTable />
            </div>
        </Provider>
    );
}

export default App;
