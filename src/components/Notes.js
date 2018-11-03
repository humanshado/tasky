import React, { Component } from 'react';

class Notes extends Component {

  state = {
      notes: '',
      isEditing: false
  }

  handleChange = (e) => {
    this.setState({ notes: e.target.value });
  }

  toggleEditNotes = () => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  render () {
    return (
      <div className='notes' onClick={this.toggleEditNotes}>
        {this.state.isEditing
          ? <form>
            <textarea
                type='text'
                value={this.state.notes}
                row='10'
                onChange={this.handleChange}
                placeholder='edit notes'
                autoFocus={true}
                />
            <input type="submit" hidden />
          </form>
          : <p>{this.state.notes}</p>
        }
      </div>
    )
  }
}

export default Notes;