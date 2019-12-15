// dependencies ===============
import React from 'react'


class Scoreboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

//had to move the getScoreboard and db connection to main so I can pass the scoreboard also to question.js to validate if the name is there or nah

    render(){
        return(
            <div className='scoreboard-component'>
                <div className='scoreboard'>
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
                    // we don't actually need this ternary operator -- just the map. The scoreboard always exists even if empty
                    (this.props.scoreboard) ?
                    this.props.scoreboard.map((score) => {
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
            </div>
        )
    }
}

export default Scoreboard
