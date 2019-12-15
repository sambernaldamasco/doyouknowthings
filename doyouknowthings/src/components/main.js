//===========================================
// DEPENDENCIES
//===========================================

// packages ======================
import React from 'react'

// components =====================
import Form from './form.js'
import Question from './question.js'
import Scoreboard from './scoreboard.js'


// database connection =============
let baseURL = '';
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:8888'
} else {
  console.log('this is for heroku');
}


//===========================================
// COMPONENT CLASS
//===========================================
class Main extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      playerInfo: {
        name: null,
        score: 0
      }
    }
  }

//===========================================
// METHODS
//===========================================
// getScoreboard ==============
// summary: GET call to the server to retrieve the scoreboard stored in the database
// it changes the state of this component by adding the object scoreboard
  getScoreboard = () => {
      fetch(`${baseURL}/scoreboard`)
      .then(response => response.json())
      .then(json => {
          this.setState({
              scoreboard: json
          })
      }).catch(error => console.log(error))
  }

// handleCreate ==============
// summary: POST call to the server to add new player and score to the scoreboard stored in the database
// it changes the state of this component by adding the object scoreboard with the new player
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

// handleUpdate ==============
// summary: POST call to the server to update the score of a player if it already exists in the database(startNewGame validates it)
// it changes the state of this component by adding the object scoreboard with the updated data by calling the API again
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

  handleDelete = (id) => {
      fetch(`${baseURL}/scoreboard/${id}`, {
          method: 'DELETE',
          headers: {
              'Accept' : 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log('deleted!');
      }).catch(error => console.log(error))
  }

// startNewGame ==============
// summary: validates if the name inserted in the form already exisits in the scoreboard.
// If it does, it changes the state of the object playerInfo to have the score and id from the player instance inside the database.
// if it doesn't, changes the object playerInfo to contains only the name from the form input
  startNewGame = (formData) => {
    let playerCheck = this.state.scoreboard.filter(player => player.name === formData)

    if (playerCheck[0]){
      this.setState({
        playerInfo: playerCheck[0]
      })
    } else {
      this.setState({
        playerInfo: {
          name: formData
        }
      })
    }

  }

// componentDidMount ==============
// summary: self explanatory -- calls the getScoreboard function as soon as the component is mounted into the page
  componentDidMount(){
    this.getScoreboard()
  }


// render ==============
// summary: has two conditionals to display elements according to results.
// first conditional checks if there's information inside playerInfo.name -- if doesn't, displays a form to add that info
// second conditional is for displayview of the scoreboard
  render(){
    return(
      <div className='main-component'>
          {
            this.state.playerInfo.name
            ? <> <h1 className='player-name'>Player: {this.state.playerInfo.name}</h1>
            <Question
              playerInfo={this.state.playerInfo}
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
              <Scoreboard
                scoreboard={this.state.scoreboard}
                handleDelete={this.handleDelete} />
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
