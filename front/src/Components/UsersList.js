import React, { Component } from 'react';
import swal from 'sweetalert'
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
            })
            .catch(() => swal("error", "There was an error when adding the movie to the favourites list", "error"))

    }

    getUsers() {
        fetch(apiURL + "/users")
            .then(res => res.json())
            .then(data => this.setState({ users: data }))
            .catch(() => swal("error", "There was an error when adding the movie to the favourites list", "error"))

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
        return (
            <div className="col section-container">
                <h3 className="col">Users</h3>
                <div className="col">
                    {this.state.users.map(user => <button className="btn btn-primary" key={user.id} onClick={(e) => this.selectUser(e)} user={user.id}>{user.firstname}</button>)}
                    {!this.state.showForm && <button className="btn btn-outline-primary" onClick={(e) => {this.openForm()}}>+</button>}
                </div>
                {this.state.showForm && <form className="col" onSubmit={(e) => {this.createUser(e)}}>
                    <input type="text" onChange={(e) => {this.inputsChanged(e)}} name="firstname" placeholder="Firstname" />
                    <input type="text" onChange={(e) => {this.inputsChanged(e)}} name="lastname" placeholder="Lastname" />
                    <input type="submit" className="btn btn-primary" value="Create user" />
                </form>}
            </div>
        );
    }
}
 
export default UserList;