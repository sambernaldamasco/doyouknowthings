import React from 'react'
import Form from './form.js'
import Question from './question.js'
import Scoreboard from './scoreboard.js'

class Main extends React.Component{
    render(){
        return(
            <div className='main-component'>
                this is the main component
                <Form />
                <Question />
                <Scoreboard />
            </div>
        )
    }
}

export default Main
