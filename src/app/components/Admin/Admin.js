import React from "react";
import { connect } from "react-redux";
import { store } from "../../store";
import * as actions from "../../store/actions";
import "./Admin.css";
import user1 from "../../../assets/user1.png";
import user2 from "../../../assets/user2.png";
import user3 from "../../../assets/user2.png";
import pika from "../../../assets/pika.jpg";

class Admin extends React.Component {
  // Admin panel show all the users and their favorite movies;
  // TODO finish admin page
  render() {
    let { otherUsers } = this.props;
    const users = [user1, user2, user3];
    return (
      <div className="admin-panel">
        Admin panel!
        <ul>
          {otherUsers &&
            otherUsers.map((user, i) => {
              return (
                <li key={i}>
                  <img src={users[i % 3]} />
                  {user.name}
                </li>
              );
            })}
        </ul>
        <img src={pika} className="pika" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  otherUsers: state.session.otherUsers
});

export const ConnectedAdmin = connect(mapStateToProps)(Admin);
