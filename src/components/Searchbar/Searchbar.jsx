import React, { Component } from "react"
import "./Searchbar.css"
export class Searchbar extends Component{
    state = {
        name: '',
        error: '' ,       
    }
    
handleChangeName = (event) => {
  this.setState({name: event.target.value})
}


handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleInputQuery(this.state.name);
    this.setState({ name: '' });
}



    render() {
        return(
          <header className="Searchbar">
            <form className="SearchForm" onSubmit={this.handleSubmit}>
              <button className="SearchForm-button" type="submit">
                <span className="SearchForm-button-label">Search</span>
              </button>
              <input
                className="SearchForm-input"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value= {this.state.name}
                onChange={this.handleChangeName}
              />
            </form>
                  </header>

            
            )
    } 
}