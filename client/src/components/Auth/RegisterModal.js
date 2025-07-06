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
import { register } from "../../actions/authActions"; // Assuming you have an action creator for registration
import { clearErrors } from "../../actions/errorActions"; // Assuming you have an action creator to clear errors

class RegisterModal extends Component {
    state = {
        modal: false,
        name: "",
        email: "",
        password: "",
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    
    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error && this.state.modal) {
            // Check for registration error
            if (error.id === "REGISTER_FAIL") {
                toast.error(error.msg.msg || "Register failed. Please check your credentials.");
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

        const { name, email, password } = this.state;

        // Create user object
        const newUser = {
            name,
            email,
            password
        };

        // Attempt to register
        this.props.register(newUser);

    };

    render() {
        return (
        <div>
            <NavLink onClick={this.toggle} href="#">
                <Button color="dark" className="mb-3">
                    Register
                </Button>
            </NavLink>

            <Modal isOpen={this.state.modal} toggle={this.toggle} centered>
            <ModalHeader toggle={this.toggle}>Register</ModalHeader>
            <ModalBody>
                { this.state.msg ? (
                    <Alert color="danger">{ this.state.msg}</Alert>
                ) : null }
                <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                    type="text"
                    name="name"
                    id="item"
                    placeholder="Enter Name"
                    className="mb-3"
                    onChange={this.onChange}
                    autoFocus
                    
                    />

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
                    REGISTER
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

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);