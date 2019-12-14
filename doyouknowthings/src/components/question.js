import React from 'react'

class Question extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      answerValue: 0,
      currentScore: 0
    }
  }


  getQuestion = () => {
      fetch('https://opentdb.com/api.php?amount=1')
      .then(response => response.json())
      .then(json => {
          this.setState({
              questionInfo:json.results[0],
              answersArray: [json.results[0].correct_answer, ...json.results[0].incorrect_answers].sort(() => Math.random() - 0.5),
              correctAnswer: json.results[0].correct_answer,
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
        currentScore: this.state.currentScore + this.answerPoints()
      })
    } else {
      console.log('whomp whomp');
    }

    this.getQuestion()
  }


    render(){
        return(
            <div className='question-component'>
            {console.log(this.state.currentScore)}

              <button onClick={()=>{this.getQuestion()}}>Get Random Question</button>
              {
                this.state.questionInfo ?
                <div>
                {console.log(this.state.questionInfo)}
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

                </div>
                : null
              }

            </div>
        )
    }
}

export default Question
