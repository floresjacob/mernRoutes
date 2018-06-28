import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';
var querystring = require('querystring');

class TeamAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      teamName: '',
      numPlayers: '',
      messageFromServer: '',
      modalIsOpen: false
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.insertNewTeam = this.insertNewTeam.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal() {
    this.setState({
      teamName: '',
      numPlayers: '',
      modalIsOpen: false,
      messageFromServer: ''
    });
  }


  onClick(e) {
    this.insertNewTeam(this);
  }

  insertNewTeam(e) {
    axios.post('/insertTeam',
      querystring.stringify({
        teamName: e.state.teamName,
        numPlayers: e.state.numPlayers
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function (response) {
        e.setState({
          messageFromServer: response.data
        });
      });
  }

  handleTextChange(e) {
    if (e.target.name == "teamName") {
      this.setState({
        teamName: e.target.value
      });
    }
    if (e.target.name == "numPlayers") {
      this.setState({
        numPlayers: e.target.value
      });
    }
  }

  render() {
    if (this.state.messageFromServer == '') {
      return (
        <div>
          <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Add Team"
            className="Modal">
            <Link to={{ pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
              <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
            </Link><br />
            <fieldset>
              <label for="teamName">Team:</label><input type="text" id="teamName" name="teamName" value={this.state.teamName} onChange={this.handleTextChange}></input>
              <label for="numPlayers">Number of Players:</label><input type="number" id="numPlayers" name="numPlayers" value={this.state.numPlayers} onChange={this.handleTextChange}></input>
            </fieldset>
            <div className='button-center'>
              <br />
              <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Submit</Button>
            </div>
          </Modal>
        </div>
      )
    }
    else {
      return (
        <div>
          <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Add Team"
            className="Modal">
            <div className='button-center'>
              <h3>{this.state.messageFromServer}</h3>
              <Link to={{ pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
                <Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close the Dialog</Button>
              </Link>
            </div>
          </Modal>
        </div>
      )
    }
  }
}

export default TeamAdd;