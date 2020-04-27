import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
      if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
      if (error.msg.message)
        alert.error(`Message: ${error.msg.message.join()}`);
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
      if (error.msg.username) alert.error(error.msg.username.join());
    }

    if (message !== prevProps.message) {
      if (message.deleteLead) alert.success(message.deleteLead);
      if (message.addLead) alert.success(message.addLead);
      if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
      if (message.tournamentNull) alert.error(message.tournamentNull);
      if (message.seriesNull) alert.error(message.seriesNull);
      if (message.matchNull) alert.error(message.matchNull);
      if (message.addSeries) alert.success(message.addSeries);
      if (message.deleteSeries) alert.success(message.deleteSeries);
      if (message.updateMatch) alert.success(message.updateMatch);
      if (message.updateSeriesEnd) alert.success(message.updateSeriesEnd);
      if (message.updateSceneActivate) alert.success(message.updateSceneActivate);
      if (message.updateSceneDeActivate) alert.show(message.updateSceneDeActivate);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert(Alerts));
