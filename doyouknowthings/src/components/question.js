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

  addToScoreboard = () => {
    let gameData = {
      name: this.props.playerName,
      score: this.state.currentScore
    }

    let scoreCheck = this.props.scoreboard.filter(player => player.name === gameData.name)
    console.log(scoreCheck[0]);
    console.log(gameData);

    if (scoreCheck[0]) {
      console.log('player exists in db');
      
      gameData.id = scoreCheck[0].id
      this.props.handleUpdate(gameData)
      this.props.handleView('scoreboard')

    } else {
      console.log('new player');
      this.props.handleCreate(gameData)
      this.props.handleView('scoreboard')
      this.props.startNewGame(null)
    }

  }

  render(){
    return(
      <div className='question-component'>
        {
          this.state.gameOver
          ? <>
          <h1>You've answered {this.state.correctAnswerCount} questions correctly and got {this.state.currentScore} points!</h1>
          <button onClick={()=>this.props.startNewGame(null)}>start new game</button>
          <button onClick={this.addToScoreboard}>add to the scoreboard</button>
          </>

          :<>
          <h1 className='score'>Score:  {this.state.currentScore}</h1>
          <div className='get-question'>
          <button onClick={()=>{this.getQuestion()}}>Get Random Question</button>
          </div>
          </>
        }

        {
          this.state.questionInfo ?
          <div className='data'>
            <div className='question-div'>
            <span className='key'>Question:</span> {this.state.questionInfo.question}
            </div>
            <div className='category-div'>
            <span className='key'>Category:</span> {this.state.questionInfo.category}
            </div>
            <div className='difficulty-div'>
            <span className='key'>Difficulty: </span>
            {this.state.questionInfo.difficulty}
            </div>

            {console.log(this.state.correctAnswer)}

            <div className='answers'>
            <span className='key'>Answers</span>
            <br/>
            {this.state.answersArray.map((option, index) => {
              return (

                    <button onClick={()=>this.checkAnswer(option)} key={index}
                    >
                    {option}
                    </button>

              )}
            )}
            </div>

            {
              this.state.answerMsg
              ? <h1>{this.state.answerMsg}</h1>
              : null
            }
            <div className='end-game'>
                <button onClick={this.endGame}>end game</button>
            </div>
          </div>
          : null
        }



      </div>
    )
  }
}

export default Question
