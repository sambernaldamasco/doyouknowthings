import React from 'react'

class Question extends React.Component{
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
                answersArray: [json.results[0].correct_answer, ...json.results[0].incorrect_answers]
            })
        }).catch(error => console.log(error))
    }

    shuffleAnswers = (arr) => {
      const modifiedArray = arr.sort(()=> Math.random() -0.5)
      this.setState({
        answersArray: modifiedArray
      })
    }

    render(){
        return(
            <div className='question-component'>
                this is the question component <br />
                <button onClick={()=>{this.getQuestion()}}>Get Random Question</button>
                {
                 (this.state.questionInfo) ?
                 <div>
                 Question: {this.state.questionInfo.question}<br/>
                 Category: {this.state.questionInfo.category}<br/>
                 Difficulty:
                 {this.state.questionInfo.difficulty}<br/>
                 {console.log(this.state.questionInfo)}
                 </div>
                 : null
                }
            </div>
        )
    }
}

export default Question
