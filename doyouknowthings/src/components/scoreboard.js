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
        console.log(this.state);
        return(
            <div className='scoreboard-component'>
                <div className='scoreboard'>
                <div className='table-head'>
                SCOREBOARD
                </div>
                <table>
                {
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
                        {
                            (this.state.admin === true) ?
                            <td>
                            <button>DELETE</button>
                            </td>
                            : null
                        }

                        </tr>
                    )
                    })
                    : null
                }
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
