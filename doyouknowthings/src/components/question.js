import React from 'react'

class Question extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      answerValue: 0,
      currentScore: 0
    }
  }

  answerPoints = () => {
    let value = 0
    switch (this.props.questionInfo.difficulty) {
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
    if(answer === this.props.correctAnswer){
      this.setState({
        currentScore: this.state.currentScore + this.answerPoints()
      })
    } else {
      console.log('whomp whomp');
    }
  }


    render(){
        return(
            <div className='question-component'>
            {console.log(this.state.currentScore)}
                 <div>
                 {console.log(this.props.questionInfo)}
                 Question: {this.props.questionInfo.question}<br/>
                 Category: {this.props.questionInfo.category}<br/>
                 Difficulty:
                 {this.props.questionInfo.difficulty}<br/>
                 </div>

                 <div>
                  {console.log(this.props.correctAnswer)}
                  {this.props.answersArray.map((option, index) => {
                    return (
                      <button onClick={()=>this.checkAnswer(option)} key={index}
                      >
                        {option}
                      </button>
                    )}
                  )}

                 </div>
            </div>
        )
    }
}

export default Question
