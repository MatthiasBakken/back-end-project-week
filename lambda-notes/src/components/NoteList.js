import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { fetchNotes } from '../actions';

class NoteList extends Component {
    state = {
        search: '',
        titleCheck: true,
        bodyCheck: false,
        order: {}
    }

    componentDidMount() {
        if (this.props.notes.length < 1) {
            this.props.fetchNotes();
        }
    }

    updateSearch = (event) => {
        this.setState({ search: event.target.value.toLowerCase().substr(0,
            20)});
        event.preventDefault();
    }

    updateBody = (event) => {
        this.setState({ bodyCheck: !this.state.bodyCheck, titleCheck: this.state.bodyCheck});
    }

    updateTitle = (event) => {
        this.setState({ titleCheck: !this.state.titleCheck, bodyCheck: this.state.titleCheck});
    }

    handleAlphaSort = (event) => {
        event.preventDefault();
        let noteOrder = {}
        let noteTitles = this.props.notes.map(note => {
            return note.title;
        })
        noteTitles = noteTitles.sort();
        for (let i = 0; i < noteTitles.length; i++) {
            noteOrder[this.props.notes[i].title] = this.props.notes[i];
        }
        for (let i = 0; i < noteTitles.length; i++) {
            this.props.notes[i] = noteOrder[noteTitles[i]];
        }
    }

    // handleDateSort = (event) => {
    //     event.preventDefault();
    //     let dateOrder = {}
    //     let noteDates = this.props.notes.map(note => {
    //         return note.createdAt;
    //     })
    //     noteDates = noteDates.sort();
    //     // console.log(noteTitles);
    //     for (let i = 0; i < noteDates.length; i++) {
    //         dateOrder[this.props.notes[i].createdAt] = this.props.notes[i];
    //         // console.log(this.state.order)
    //     }
    //     for (let i = 0; i < noteDates.length; i++) {
    //         this.props.notes[i] = dateOrder[noteDates[i]];
    //         // console.log(this.props.notes)
    //     }
    //     localStorage.setItem('array', JSON.stringify(this.props.notes));
    // }

    render() {
        // console.log(Date.now())
        // console.log(document.getElementsByClassName("note"))
        // console.log('body',this.state.bodyCheck)
        // console.log('title',this.state.titleCheck)
        let filteredNotes = this.props.notes.filter((note) => {
            if (this.state.search === '') {
                return this.props.notes;
            }
            if (this.state.titleCheck) {
                return note.title.toLowerCase().indexOf(this.state.search) !== -1;
            } else if (this.state.bodyCheck) {
                return note.content.toLowerCase().indexOf(this.state.search) !== -1;
            }
        });
        return (
            <div className="notelist-container">
                <h1>Your Notes:</h1>
                <form>
                    <input 
                        className="search-input"
                        placeholder="Select Search Type..."
                        type="text"
                        value={this.state.search}
                        onChange={this.updateSearch}
                    />
                    <div className="radio-container">
                        <input 
                            className="radio-button title-button"
                            type="radio"
                            value={this.state.titleCheck}
                            name="search"
                            onChange={this.updateTitle}
                            defaultChecked
                            /><label>Search Title</label>
                        <input 
                            className="radio-button body-button"
                            type="radio"
                            value={this.state.bodyCheck}
                            name="search"
                            onChange={this.updateBody}
                            /><label>Search Body</label>
                        <Dropdown
                            className="drop-down"
                            direction="right"
                            isOpen={this.state.btnDropright}
                            toggle={() => { this.setState({ btnDropright: !this.state.btnDropright }); }}
                            style={{ 
                                backgroundColor: "#00BABD", 
                                border: "none", 
                                borderRadius: "5px",
                                boxShadow: "1px 1px 2px black" }} >
                            <DropdownToggle 
                                className="drop-down"
                                style={{ 
                                    backgroundColor: "#00BABD", 
                                    fontSize: "2rem", 
                                    height: "40px",
                                    border: "none",
                                    borderRadius: "5px"
                                    }}
                                caret>
                                Sort Notes
                            </DropdownToggle>
                            <DropdownMenu style={{ 
                                width: "150px", 
                                backgroundColor: "#00BABD", 
                                borderRadius: "5px",
                                boxShadow: "1px 1px 2px black" }}>
                                <DropdownItem 
                                    className="dropdown-item"
                                    style={{ fontSize: "1.8rem", color: "white" }}
                                    onClick={this.handleAlphaSort}>
                                    Sort - A to Z
                                </DropdownItem>
                                <DropdownItem 
                                    className="dropdown-item"
                                    style={{ fontSize: "1.8rem", color: "white" }}
                                    //onClick={this.handleDateSort}
                                    >
                                    Sort by Date
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </form>
                <div className="notelist" id="sortable">
                    {filteredNotes.map((note) => {
                        return (
                        <Link 
                            style={{textDecoration: "none", color: "black"}} 
                            key={note._id} 
                            to={`/note/${note._id}`} 
                            id = {note._id}
                            className="note-link note ui-state-default"
                            >
                            <div>
                                <h4>{note.title}</h4>
                                <p>{note.content}</p>
                            </div>
                        </Link>
                        )
                    })}
                </div>
                {/* <button onClick={this.savedPosition}>test</button> */}
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        notes: store[0].notes
    };
};

export default connect(mapStateToProps, { fetchNotes })(NoteList);