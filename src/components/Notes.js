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

  handleSaveNotes = () => {
    const { cardId } = this.props;
    const { notes } = this.state;
    console.log('saving notes: ', cardId, notes);

  }

  render () {
    return (
      <div className='notes' onClick={this.toggleEditNotes}>
        {this.state.isEditing
          ? <form>
            <textarea
                type='text'
                value={this.state.notes}
                onChange={this.handleChange}
                onClick={this.handleSaveNotes}
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