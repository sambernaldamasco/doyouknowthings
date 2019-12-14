import React from 'react'

class Question extends React.Component{

  checkAnswer = (answer) => {
    answer === this.props.correctAnswer
    ? console.log('thats right')
    : console.log('whomp whomp')
  }
    render(){
        return(
            <div className='question-component'>
                this is the question component <br />

                 <div>
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
