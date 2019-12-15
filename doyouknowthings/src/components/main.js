import React from 'react'
import Form from './form.js'
import Question from './question.js'
import Scoreboard from './scoreboard.js'


// database connection ===============
let baseURL = '';
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:8888'
} else {
  console.log('this is for heroku');
}


class Main extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      playerName: null,
    }
  }

  getScoreboard = () => {
      fetch(`${baseURL}/scoreboard`)
      .then(response => response.json())
      .then(json => {
          this.setState({
              scoreboard: json
          })
      }).catch(error => console.log(error))
  }


  handleCreate = (createData) => {
    fetch(`${baseURL}/scoreboard`, {
      body: JSON.stringify(createData),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(jsonData =>{
      this.setState({
        scoreboard: jsonData
      })
    })
  }


  startNewGame = (formData) => {
    this.setState({
      playerName: formData
    })
  }

  componentDidMount(){
    this.getScoreboard()
  }

  render(){
      // console.log(this.state);
    return(
      <div className='main-component'>
          {
            this.state.playerName
            ? <> <h1 className='player-name'>Player: {this.state.playerName}</h1>
            <Question
              playerName={this.state.playerName}
              startNewGame={this.startNewGame}
              handleCreate={this.handleCreate}
              view={this.props.view}
              handleView={this.props.handleView}
            />
            </>
            :
            <Form startNewGame={this.startNewGame}/>
          }
          {
              (this.props.view === 'scoreboard') ?
              <Scoreboard scoreboard={this.state.scoreboard} />
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
