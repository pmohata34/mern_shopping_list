import React, { Component, Fragment} from "react";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";

export class LogOut extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired,
    };
    render() {
        const { logout } = this.props;
        return (
        <Fragment>
            <NavLink onClick={logout} href="#">
                Logout
            </NavLink>
        </Fragment>
        );
    }
}

export default connect(null, { logout })(LogOut);