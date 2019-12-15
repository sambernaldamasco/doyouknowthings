import React from 'react'

class Header extends React.Component{
    render(){
        return(
            <div className='header-component'>
                <h1>Do you Know Things</h1>
                <nav>
                {/* these divs will change the view on click */}
                    <div>GAME</div>
                    <div>SCOREBOARD</div>
                </nav>
            </div>
        )
    }
}

export default Header
