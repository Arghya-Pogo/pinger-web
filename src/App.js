import React, {  } from 'react';
import { DataProvider } from './app/config/context';
import HomeScreen from './app/screens/HomeScreen';




const App = (props) => {


    return(
        <DataProvider>
            <HomeScreen />
        </DataProvider>
    );
}


export default App;