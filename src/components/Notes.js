import React, { Component } from 'react';

class Notes extends Component {

  state = {
      notes: '',
      isEditing: false
  }

  componentDidMount() {
      this.props.notes && this.setState({ notes: this.props.notes });
  }

  componentDidUpdate(prevProps){
    if(this.props.notes !== prevProps.notes){
      this.setState({ notes: this.props.notes });
    }
  }

  handleChange = (e) => {
    this.setState({ notes: e.target.value });
  }

  toggleEditNotes = () => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  handleSaveNotes = () => {
    const { notes } = this.state;
    console.log('saving notes: ', notes);
    this.props.handleSubmitNotes(notes);

  }

  //set cursor at end of text on focus
  setCursor = (e) => {
    e.target.setSelectionRange(this.state.notes.length, this.state.notes.length)
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
                onFocus={(e) => this.setCursor(e)}
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