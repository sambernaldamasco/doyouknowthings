import React from 'react'
import Form from './form.js'
import Question from './question.js'
import Scoreboard from './scoreboard.js'

class Main extends React.Component{
  constructor(props){
      super(props)
      this.state = {

      }
  }

  getQuestion = () => {
      fetch('https://opentdb.com/api.php?amount=1')
      .then(response => response.json())
      .then(json => {
          this.setState({
              questionInfo:json.results[0],
              answersArray: [json.results[0].correct_answer, ...json.results[0].incorrect_answers].sort(() => Math.random() - 0.5),
              correctAnswer: json.results[0].correct_answer
          })
      }).catch(error => console.log(error))
  }

    render(){
        return(
            <div className='main-component'>
                this is the main component
                <Form />

                <button onClick={()=>{this.getQuestion()}}>Get Random Question</button>
                {
                  this.state.questionInfo ?
                  <Question
                    questionInfo={this.state.questionInfo}
                    answersArray={this.state.answersArray}
                    correctAnswer={this.state.correctAnswer}
                  />
                  : null
                }
                <Scoreboard />
            </div>
        )
    }
}

export default Main
