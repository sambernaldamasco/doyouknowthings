import React from 'react'
import Form from './form.js'
import Question from './question.js'
import Scoreboard from './scoreboard.js'

class Main extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      playerName: null
    }
  }

  getPlayerName = (formData) => {
    this.setState({
      playerName: formData
    })
  }

  render(){
    return(
      <div className='main-component'>
        {
          this.state.playerName
          ? <> <h1>Player - {this.state.playerName}</h1>
          <Question playerName={this.state.playerName}/>
          </>

          :
          <Form getPlayerName={this.getPlayerName}/>
        }

        <Scoreboard />
      </div>
    )
  }
}

export default Main
