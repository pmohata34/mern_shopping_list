import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from "reactstrap";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions"; // Assuming you have an action creator for registration
import { clearErrors } from "../../actions/errorActions"; // Assuming you have an action creator to clear errors

class LoginModal extends Component {
    state = {
        modal: false,
        emai: "",
        password: "",
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    
    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            // Check for registration error
            if (error.id === "LOGIN_FAIL") {
                toast.error(error.msg.msg);
            }
            else {
                toast.error("An error occurred. Please try again.");
            }
        }

        // If authenticated, close modal
        if (this.state.modal) {
            if (this.props.isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        this.props.clearErrors(); // Clear previous errors when modal is toggled
        this.setState({
            modal: !this.state.modal,
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        // Create user object
        const user = {
            email,
            password
        };
        
        // Attempt to login
        this.props.login(user);
    };

    render() {
        return (
        <div>
            <NavLink onClick={this.toggle} href="#">
                <Button color="dark" className="mb-3">
                    Login
                </Button>
            </NavLink>

            <Modal isOpen={this.state.modal} toggle={this.toggle} centered>
            <ModalHeader toggle={this.toggle}>Login</ModalHeader>
            <ModalBody>
                { this.state.msg ? (
                    <Alert color="danger">{ this.state.msg}</Alert>
                ) : null }
                <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    className="mb-3"
                    onChange={this.onChange}
                    autoFocus
                    
                    />

                    <Label for="password">Password</Label>
                    <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    className="mb-3"
                    onChange={this.onChange}
                    autoFocus
                    
                    />
                    
                    <Button
                    color="dark"
                    className="mt-4 w-100"
                    type="submit"
                    >
                    LOGIN
                    </Button>
                </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter />
            </Modal>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);