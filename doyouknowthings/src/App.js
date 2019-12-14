import React from 'react';
import Header from './components/header.js'
import Main from './components/main.js'

class App extends React.Component{
    render(){
        return(
            <div className='container'>
                <Header />
                <Main />
            </div>
        )
    }
}

export default App;
