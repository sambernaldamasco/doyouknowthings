// dependencies ===============
import React from 'react'


class Scoreboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            admin:false
        }
    }

    toggleAdminMode = () => {
        this.setState({
            admin: !this.state.admin
        })
    }

// had to move the getScoreboard and db connection to main so I can pass the scoreboard also to question.js to validate if the name is there or nah

    render(){
        return(
            <div className='scoreboard-component'>
                <div className='scoreboard'>
                <div className='table-head'>
                SCOREBOARD
                </div>
                <table>
                <tbody>
                {
                    (this.props.scoreboard) ?
                    this.props.scoreboard.map((score) => {
                        return(
                        <tr key={score.id}>
                        <td className='scoreboard-name'>
                        {score.name}
                        </td>
                        <td className='scoreboard-score'>
                        {score.score} points
                        </td>
                        {
                            (this.state.admin === true) ?
                            <td>
                            <button onClick={()=>this.props.handleDelete(score.id)}>DELETE</button>
                            </td>
                            : null
                        }

                        </tr>
                    )
                    })
                    : null
                }
                </tbody>
                </table>
                {
                    (this.state.admin === false) ?
                        <button onClick={()=>this.toggleAdminMode()}>Admin Mode</button>
                    : <button onClick={()=>this.toggleAdminMode()}>Player Mode</button>
                }



                </div>
            </div>
        )
    }
}

export default Scoreboard
