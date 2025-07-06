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
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

class ItemModal extends Component {
  state = {
    modal: false,
    name: "",
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const trimmed = this.state.name.trim();
    if (!trimmed) {
      toast.warning("Please enter an item name");
      return;
    }

    const newItem = { name: trimmed };
    this.props.addItem(newItem);

    this.setState({ name: "" });
    this.toggle();
    toast.success("Item added!");
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? <Button 
        color="dark" style={{marginBottom: '2rem' }} 
        onClick={this.toggle}
        >
          Add Item
        </Button> : <h4 className="mb-3 nl-4">Please login to manage items</h4>}

        <Modal isOpen={this.state.modal} toggle={this.toggle} centered>
          <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Enter item name"
                  value={this.state.name}
                  onChange={this.onChange}
                  autoFocus
                  required
                />
                <Button
                  color="dark"
                  className="mt-3 w-100"
                  type="submit"
                >
                  Add Item
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
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addItem })(ItemModal);