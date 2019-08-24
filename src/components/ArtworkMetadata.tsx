import React from "react";
import ArtworkHeader from "components/ArtworkHeader"

export default class ArtworkMetadata extends React.Component<any> {
  render() {
    return (
      <div>
        <ArtworkHeader artistName={this.props.artistName} location={this.props.location} year={this.props.year}/>
        <h5>{this.props.workName}</h5>
        <p>{this.props.year}</p>
        <p>{this.props.galleryName}</p>
        <p>{this.props.workDescription}</p>
      </div>
    )
  }
}
