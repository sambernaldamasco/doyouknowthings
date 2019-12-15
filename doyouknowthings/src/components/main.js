import React from 'react'
import Form from './form.js'
import Question from './question.js'
import Scoreboard from './scoreboard.js'

class Main extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      playerName: null,
    }
  }

  startNewGame = (formData) => {
    this.setState({
      playerName: formData
    })
  }

  render(){
      // console.log(this.state);
    return(
      <div className='main-component'>
          {
            this.state.playerName
            ? <> <h1>Player - {this.state.playerName}</h1>
            <Question playerName={this.state.playerName}startNewGame={this.startNewGame}
            />
            </>
            :
            <Form startNewGame={this.startNewGame}/>
          }
          {
              (this.props.view === 'scoreboard') ?
              <Scoreboard />
              :
              <div className='display-none'>
              <Scoreboard />
              </div>
          }

      </div>
    )
  }
}

export default Main
