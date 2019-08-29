import React from "react";

export default class TicketButton extends React.Component<any> {
  render() {
    return (
      <div>
        <button onClick={this.props.onClick}>{this.props.label}</button>
      </div>
    )
  }
}
