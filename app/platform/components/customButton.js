import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

class Button extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button>{this.props.text}</button>
        )
    }

}

Button.defaaultProps = {
    'text' : 'Hello'
}

export default Button;
