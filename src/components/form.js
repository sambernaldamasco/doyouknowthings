import React from 'react'

class Form extends React.Component{
  constructor() {
    super()
    this.state = {
      name: '',
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.id] : event.target.value})

  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.startNewGame(this.state.name)
  }

  render(){
    return(
      <div className='start-form-component'>
        <form onSubmit={this.handleSubmit}>
        <label htmlFor="name"> Name: </label>
        <input type="text" id="name" value={this.state.name} onChange={this.handleChange}/>
        <input type="submit" value="start game!"/>
        </form>
      </div>

    )
  }
}

export default Form
