import React, { Component } from 'react';
import { apiURL } from '../config/config';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            firstname: "",
            lastname: "",
            showForm: false,
            selectedUser: {}
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    createUser(e) {
        e.preventDefault();

        fetch(apiURL + "/users/new", {method: "POST", body: JSON.stringify({firstname: this.state.firstname, lastname: this.state.lastname}), headers: {"Content-type": "application/json; charset=UTF-8"}})
            .then(res => res.json())
            .then(data => {
                this.getUsers()
            });
    }

    getUsers() {
        fetch(apiURL + "/users")
            .then(res => res.json())
            .then(data => this.setState({ users: data }));
    }

    inputsChanged(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    selectUser(e) {
        this.props.selectUser(e.target.getAttribute('user'), e.target.getAttribute('firstname'))
    }

    openForm() {
        this.setState({ showForm: true });
    }

    render() {
        console.log(this.state.showForm)
        return (
            <div>
                <div>
                    {this.state.users.map(user => <button key={user.id} onClick={(e) => this.selectUser(e)} user={user.id}>{user.firstname}</button>)}
                    <button onClick={(e) => {this.openForm()}}>Add user</button>
                </div>
                {this.state.showForm && <form onSubmit={(e) => {this.createUser(e)}}>
                    <input type="text" onChange={(e) => {this.inputsChanged(e)}} name="firstname" placeholder="Firstname" />
                    <input type="text" onChange={(e) => {this.inputsChanged(e)}} name="lastname" placeholder="Lastname" />
                    <input type="submit" value="Create user" />
                </form>}
            </div>
        );
    }
}
 
export default UserList;