import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';

function homeLink() {
    window.location.href = "/";;
}

class SideBar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        // console.log(this.props.notes)
        return (
            <div className="sidebar"> 
                <h1>Lamda<br/>Notes</h1>
                <button 
                    className="button" 
                    onClick={homeLink}
                    style={{cursor: "pointer"}}
                    >View Your Notes
                </button>
                <Link to={"/addNote"}className="button">+ Create New Note</Link>
                <CSVLink className="button" data={this.props.notes}>  
                    Export Notes
                </CSVLink>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        notes: store[0].notes
    };
};

export default connect(mapStateToProps, {})(SideBar);