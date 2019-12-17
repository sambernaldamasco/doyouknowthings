//===========================================
// DEPENDENCIES
//===========================================
// packages ======================
import React from 'react'

//===========================================
// COMPONENT CLASS
//===========================================
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


//===========================================
// METHODS
//===========================================
// getQuestion ==============
// summary: GET call to the opentdb API to retrieve question information
// answerArray gets the correct answer and incorrect answers and through the sort() and Math.random() it randomizes the order is inputted inside the array
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

  replaceText = (string) => {
    const regexp1 = /&quot;/
    const regexp2= /&#039;/
    const array = string.split(' ');
    const firstArray = []
    const secondArray= []
    const thirdArray = []

    for(let i = 0; i < array.length; i++){
        if(array[i].match(regexp1)){
            firstArray.push(array[i].replace(regexp1, '"'));

        } else if (array[i].match(regexp2)) {
            firstArray.push(array[i].replace(regexp2, "'"));
        } else {
            firstArray.push(array[i]);
        }
    }

    for(let i = 0; i < firstArray.length; i++){
        if(firstArray[i].match(regexp1)){
            secondArray.push(firstArray[i].replace(regexp1, '"'));
        } else if (firstArray[i].match(regexp2)){
            secondArray.push(firstArray[i].replace(regexp2, "'"));
        } else {
            secondArray.push(firstArray[i]);
        }
    }

    for(let i = 0; i < secondArray.length; i++){
        if(secondArray[i].match(regexp1)){
            thirdArray.push(secondArray[i].replace(regexp1, '"'));
        } else if (secondArray[i].match(regexp2)){
            thirdArray.push(secondArray[i].replace(regexp2, "'"));
        } else {
            thirdArray.push(secondArray[i]);
        }
    }
    return thirdArray.join(' ')
}

// answerPoints ==============
// summary: based on the question difficulty, it determines how many points the user will get when answering correctly
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

// checkAnswer ==============
// summary: checks if the button clicked with the answer is the correct answer, if it is, changes the state of the currentScore and display a message saying if the answer was correct or not.
// at the end of the conditional, calls the function getQuestion with a timeout of one second
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

    if (!this.state.gameOver) {
      setTimeout(this.getQuestion, 1000)
    }
  }

// endGame ==============
// summary: changes the state of two propierties set on the constructor -- this is use on the render validation of some page elements
  endGame = () => {
    this.setState({
      gameOver: true,
      questionInfo: null
    })
  }

// addToScoreboard ==============
// summary: validates if the playerInfo object has an id, if it does, calls a PUT request to update the existing score, and if doesn't it calls a POST request to add a new player.
// after that, it redirects to the scoreboard view
  addToScoreboard = () => {
    let gameData = {
      id: this.props.playerInfo.id,
      name: this.props.playerInfo.name,
      score: this.state.currentScore
    }

    if (this.props.playerInfo.id) {
      console.log('player exists in db');

      this.props.handleUpdate(gameData)
      this.props.handleView('scoreboard')

    } else {
      console.log('new player');
      this.props.handleCreate(gameData)

      this.props.handleView('scoreboard')
      this.props.startNewGame(null)
    }

  }

// render ==============
// summary: display some elements depending of the result of the conditionals.
// first conditional checks if there's data inside the questionInfo object(generated by getQuestion function)
// if true, it display the question information + answer buttons.
// if false, it displays a button to get a random question + initial score, inside that it has another conditional
// it checks if the questionInfo is empty due to the game being over. if it is over, it has another conditional
// third conditional checks if there's a playerInfo.id, and if it has, checks if the current score is bigger than the score inside the scoreboard
// if the score is bigger, or this is a new player, it displays a button to add the score to the scoreboard(addToScoreboard function)
  render(){
    return(
      <div className='question-component'>
        {
          this.state.questionInfo ?
          <div className='data'>
          <h1 className='score'>Score:  {this.state.currentScore}</h1>

            <div className='question-div'>
            <div className='key'>Question: </div>
            <p>
            {this.replaceText(this.state.questionInfo.question)}

            </p>
            </div>

                <div className='category-div'>
                    <div className='key'>Category: </div>
                    <p>{this.replaceText(this.state.questionInfo.category)}</p>
                </div>
                <div className='difficulty-div'>
                    <div className='key'>Difficulty: </div>
                    <p>{this.state.questionInfo.difficulty}</p>
                </div>


            {console.log(this.state.correctAnswer)}

            {
              this.state.answerMsg
              ? <h1>{this.state.answerMsg}</h1>
              : null
            }

            <div className='answers'>
            <span className='answers-key'>Answers</span>
            <br/>
            {this.state.answersArray.map((option, index) => {
              return (

                    <button onClick={()=>this.checkAnswer(option)} key={index}
                    >
                    {this.replaceText(option)}
                    </button>
              )}
            )}
            </div>

            <div className='end-game'>
                <button onClick={this.endGame}>end game</button>
            </div>
          </div>
          : <>
          {
            this.state.gameOver
            ? <>
            {
              (!this.props.playerInfo.id) || (this.state.currentScore > this.props.playerInfo.score)

              ?<div className='end-game-message'>
              <p>You've answered {this.state.correctAnswerCount} questions correctly and got {this.state.currentScore} points!</p>
              <button onClick={this.addToScoreboard}>add to the scoreboard</button>
              </div>
              :<div className='end-game-message'>
              <p>You've answered {this.state.correctAnswerCount} questions correctly and got {this.state.currentScore} points!
              </p>
              <p>
              ... not quite better than your last time here
              </p>
              </div>
            }
            <div className='center'>
            <button onClick={()=>this.props.startNewGame(null)}>start new game</button>
            </div>
            </>

            :<>
            <div className='get-question'>
            <button onClick={()=>{this.getQuestion()}}>Get Random Question</button>
            </div>
            </>
          }
          </>

        }
      </div>
    )
  }
}

export default Question
