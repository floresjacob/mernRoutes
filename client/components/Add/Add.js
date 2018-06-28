import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';
var querystring = require('querystring');

class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      passWord: '',
      ign: '',
      rank: '',
      role: '',
      teamName: '',
      server: '',
      messageFromServer: '',
      modalIsOpen: false
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.insertNewUser = this.insertNewUser.bind(this);
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
      modalIsOpen: false,
      userName: '',
      passWord: '',
      ign: '',
      rank: '',
      role: '',
      teamName: '',
      server: '',
      messageFromServer: ''
    });
  }

  componentDidMount() {
    this.setState({
      rank: this.props.selectedRank
    });
    this.setState({
      role: this.props.selectedRole
    });
    this.setState({
      server: this.props.selectedServer
    });
  }

  handleSelectChange(e) {
    if (e.target.name == 'rank') {
      this.setState({
        rank: e.target.value
      });
    }
    if (e.target.name == 'role') {
      this.setState({
        role: e.target.value
      });
    }
    if (e.target.name == 'server') {
      this.setState({
        server: e.target.value
      });
    }
  }

  onClick(e) {
    this.insertNewUser(this);
  }

  insertNewUser(e) {
    axios.post('/insertUser',
      querystring.stringify({
        userName: e.state.userName,
        passWord: e.state.passWord, 
        ign: e.state.ign,
        rank: e.state.rank,
        role: e.state.role,
        teamName: e.state.teamName,
        server: e.state.server
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
    if (e.target.name == "userName") {
      this.setState({
        userName: e.target.value
      });
    }
    if (e.target.name == "passWord") {
      this.setState({
        passWord: e.target.value
      });
    }
    if (e.target.name == "ign") {
      this.setState({
        ign: e.target.value
      });
    }
    if (e.target.name == "teamName") {
      this.setState({
        teamName: e.target.value
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
            contentLabel="Add User"
            className="Modal">
            <Link to={{ pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
              <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
            </Link><br />
            <fieldset>
              <label for="userName">User:</label><input type="text" id="userName" name="userName" value={this.state.userName} onChange={this.handleTextChange}></input>
              <label for="passWord">Password:</label><input type="text" id="passWord" name="passWord" value={this.state.description} onChange={this.handleTextChange}></input>
              <label for="ign">IGN:</label><input type="text" id="ign" name="ign" value={this.state.description} onChange={this.handleTextChange}></input>
              <label for="rank">Your Rank:</label><select id="rank" name="rank" value={this.state.server} onChange={this.handleSelectChange}>
                <option value="Master" id="Master">Master/Challenger</option>
                <option value="Diamond" id="Diamond">Diamond</option>
                <option value="Platinum" id="Platinum">Platinum</option>
                <option value="Gold" id="Gold">Gold</option>
                <option value="Silver" id="Silver">Silver</option>
                <option value="Bronze" id="Bronze">Bronze</option>
              </select>
              <label for="role">Role:</label><select id="role" name="role" value={this.state.server} onChange={this.handleSelectChange}>
                <option value="Top" id="Top">Top</option>
                <option value="Jungle" id="Jungle">Jungle</option>
                <option value="Mid" id="Mid">Mid</option>
                <option value="ADC" id="ADC">ADC</option>
                <option value="Support" id="Support">Support</option>
              </select>
              <label for="teamName">Team Name:</label><input type="text" id="teamName" name="teamName" value={this.state.description} onChange={this.handleTextChange}></input>
              <label for="server">Server:</label><select id="server" name="server" value={this.state.server} onChange={this.handleSelectChange}>
                <option value="NA" id="NA">NA</option>
                <option value="EUW" id="EUW">EUW</option>
                <option value="EUNE" id="EUNE">EUNE</option>
                <option value="KR" id="KR">KR</option>
                <option value="CN" id="CN">CN</option>
                <option value="LAN" id="LAN">LAN</option>
                <option value="LAS" id="LAS">LAS</option>
                <option value="BR" id="BR">BR</option>
                <option value="OCE" id="OCE">OCE</option>
                <option value="RU" id="RU">RU</option>
                <option value="TR" id="TR">TR</option>
                <option value="JP" id="JP">JP</option>
                <option value="SEA" id="SEA">SEA</option>
              </select>

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
            contentLabel="Add User"
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

export default Add;