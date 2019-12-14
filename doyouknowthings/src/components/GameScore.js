import React from 'react'

class GameScore extends React.Component {
  render(){
    return(
      <h1>SCORE - {this.props.currentScore}</h1>
    )
  }
}


export default GameScore
