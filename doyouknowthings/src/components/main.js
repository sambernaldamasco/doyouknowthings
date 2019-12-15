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
    }).catch(error=>console.log(error))
  }

  handleUpdate = (updateData) => {
    fetch(`${baseURL}/scoreboard/${updateData.id}`, {
      body: JSON.stringify(updateData),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      this.getScoreboard()
    }).catch(error=>console.log(error))
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
              handleView={this.props.handleView}
              scoreboard={this.state.scoreboard}
              handleUpdate={this.handleUpdate}
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
