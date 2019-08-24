import React from "react";
import Moment from "react-moment";

export default class ExhibitionTimes extends React.Component<any> {
  render() {
    const hoursFormat = "HH:mm"
    const dateFormat = "ddd, Do MMM YY"
    return (
      <div>
        <p>open <Moment format={dateFormat}>{this.props.opensAt}</Moment></p>
        <p><Moment format={hoursFormat}>{this.props.opensAt}</Moment>-<Moment format={hoursFormat}>{this.props.closesAt}</Moment></p>
      </div>
    )
  }
}
