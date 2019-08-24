import React from "react";

export default class ArtworkHeader extends React.Component<any> {
  public render() {
    return (
      <div>
        <h3>{this.props.artistName}</h3>
        <h4>
          {this.props.location}
          {this.props.year}
        </h4>
      </div>
    )
  }

}
