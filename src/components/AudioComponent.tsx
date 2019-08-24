import PresentPerson from "./PresentPersonComponent";
import React from "react";

export default class AudioComponent extends React.Component<any> {
  constructor(props) {
    super(props);
    this.state = { people: this.props.people };
  }
  render() {
    return (
      <div>
        {this.props.people.map(person => (
          <PresentPerson person={person} />
        ))}
      </div>
    );
  }
}
