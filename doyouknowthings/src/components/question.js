import React from 'react'

class Question extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      currentScore: 0,
      answerMsg: null,
      gameOver: false,
      correctAnswerCount: 0
    }
  }


  getQuestion = () => {
    this.setState({
      answerMsg: null
    })

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

  answerPoints = () => {
    let value = 0
    switch (this.state.questionInfo.difficulty) {
      case "easy":
      value = 1
      break;

      case "medium":
      value = 3
      break;

      case "hard":
      value = 5
      break;

      default:
      value = 0
      break;
    }

    return value

  }


  checkAnswer = (answer) => {
    if(answer === this.state.correctAnswer){
      this.setState({
        currentScore: this.state.currentScore + this.answerPoints(),
        answerMsg: 'Correct answer!',
        correctAnswerCount: this.state.correctAnswerCount + 1
      })
    } else {
      this.setState({
        answerMsg: 'Whomp, whomp. Wrong answer!'
      })
    }

    setTimeout(this.getQuestion, 2000)
  }

  endGame = () => {
    this.setState({
      gameOver: true,
      questionInfo: null
    })
  }

  render(){
    return(
      <div className='question-component'>
        {
          this.state.gameOver
          ? <>
          <h1>You've answered {this.state.correctAnswerCount} questions correctly and got {this.state.currentScore} points!</h1>
          <button onClick={()=>this.props.startNewGame(null)}>start new game</button>
          </>

          :<>
          <h1>SCORE {this.state.currentScore}</h1>

          <button onClick={()=>{this.getQuestion()}}>Get Random Question</button>
          </>
        }

        {
          this.state.questionInfo ?
          <div>
            Question: {this.state.questionInfo.question}<br/>
            Category: {this.state.questionInfo.category}<br/>
            Difficulty:
            {this.state.questionInfo.difficulty}<br/>

            {console.log(this.state.correctAnswer)}

            {this.state.answersArray.map((option, index) => {
              return (
                <button onClick={()=>this.checkAnswer(option)} key={index}
                >
                {option}
                </button>
              )}
            )}

            {
              this.state.answerMsg
              ? <h1>{this.state.answerMsg}</h1>
              : null
            }
          <button onClick={this.endGame}>end game</button>

          </div>
          : null
        }



      </div>
    )
  }
}

export default Question
