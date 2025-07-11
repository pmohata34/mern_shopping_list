import React, { Component, createRef } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };
    componentDidMount() {
        this.props.getItems();  
    }    
    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }

    render() {
        const { items } = this.props.item;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name }) => {
                            const nodeRef = createRef();
                            return (
                                <CSSTransition
                                key={_id}
                                timeout={500}
                                classNames="fade"
                                nodeRef={nodeRef}
                                >
                                    <ListGroupItem ref={nodeRef}>
                                        { this.props.isAuthenticated ? (
                                        <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={() => this.onDeleteClick(_id)}
                                        style={{ marginRight: '0.5rem' }}
                                        >
                                            &times;
                                        </Button>
                                        ) : null }
                                        {name}
                                    </ListGroupItem>
                                </CSSTransition>
                            );
                        })}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {getItems, deleteItem})(ShoppingList);
