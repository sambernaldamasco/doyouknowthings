// dependencies ===============
import React from 'react'

// database connection ===============
let baseURL = '';
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:8888'
} else {
  console.log('this is for heroku');
}

class Scoreboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        this.getScoreboard()
    }

    getScoreboard = () => {
        fetch(`${baseURL}/scoreboard`)
        .then(response => response.json())
        .then(json => {
            this.setState({
                scoreboard: json
            })
        }).catch(error => console.log(error))
    }

    render(){
        return(
            <div className='scoreboard-component'>
                <table>
                <thead>
                    <tr>
                    <th colSpan="2">SCOREBOARD</th>
                    </tr>
                    <tr>
                        <th>NAME</th>
                        <th>SCORE</th>
                    </tr>
                </thead>
                <tbody>
                {
                    // eventually this if statement should be changed to if the view === 'scoreboard'
                    (this.state.scoreboard) ?
                    this.state.scoreboard.map((score) => {
                        return(
                        <tr key={score.id}>
                        <td className='scoreboard-name'>
                        {score.name}
                        </td>
                        <td className='scoreboard-score'>
                        {score.score}
                        </td>
                        </tr>
                    )
                    })
                    : null
                }
                </tbody>
                </table>



            </div>
        )
    }
}

export default Scoreboard
