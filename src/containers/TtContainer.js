import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, complexActions } from '../modules/tt-module';

class Tt extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        Tt ready
      </div>
    );
  }
}

// mapStateToProps :: {State} -> {Props}
const mapStateToProps = (state) => ({
  // myProp: state.myProp,
});

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
  actions: {
     ...bindActionCreators(
       actions,
       dispatch
      ),
      ...complexActions
  }
});

const Container = Tt;


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
