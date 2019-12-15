import React from 'react'

class Header extends React.Component{

    render(){
        console.log(this.props);
        return(
            <div className='header-component'>
                <h1>Do you Know Things</h1>
                <nav>
                    <div onClick={()=> this.props.handleView('game')}>GAME</div>
                    <div onClick={()=> this.props.handleView('scoreboard')}>SCOREBOARD</div>
                </nav>
            </div>
        )
    }
}

export default Header
