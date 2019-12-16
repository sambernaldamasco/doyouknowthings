import React from 'react';
import Header from './components/header.js'
import Main from './components/main.js'

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            view: 'game'
        }
    }

    handleView = (view) => {
        this.setState({
            view: view
        })
    }

    render(){
        return(
            <div className='container'>
                <Header
                    view={this.state.view}
                    handleView={this.handleView}
                />
                <Main
                    view={this.state.view}
                    handleView={this.handleView}
                />
            </div>
        )
    }
}

export default App;
