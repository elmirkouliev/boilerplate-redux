import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ui from '../../actions/ui';


/**
 * Test Component
 */
class Test extends React.Component {
    
    render() {
        const { outlet, scope } = this.props;

        return(
            <div className="test">
                <button>Click me!</button>
            </div>
        )
    }
}

Test.defaultProps = {}

const mapStateToProps = (state) => {
    return {
        ui: state.ui
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        { ...ui },
        dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);