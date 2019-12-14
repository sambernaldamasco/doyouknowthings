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
                questionInfo:json
            })
        }).catch(error => console.log(error))
    }

    render(){
        return(
            <div className='question-component'>
                this is the question component <br />
                <button onClick={()=>{this.getQuestion()}}>Get Random Question</button>
                {
                 (this.state.questionInfo) ?
                 <div>
                 Question: {this.state.questionInfo.results[0].question}<br/>
                 Category: {this.state.questionInfo.results[0].category}<br/>
                 Difficulty:
                 {this.state.questionInfo.results[0].difficulty}<br/>


                 </div>
                 : null
                }
            </div>
        )
    }
}

export default Question
