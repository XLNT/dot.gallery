import { Link } from "react-router-dom";
import { first } from "lodash-es";
import { format } from "lib/exhibitionSlug";
import { useCurrentExhibitionQuery } from "graphql";
import React from "react";
import PanelAction from "context/PanelAction";
import PanelContent from "context/PanelContent";
import PanelState from "context/PanelState";
import ArtworkMetadata from "components/ArtworkMetadata"
{/*import AudioComponent from "components/AudioComponent"*/}
import ExhibitionTimes from "components/ExhibitionTimesComponent";

export default function Home() {
  const [isPanelOpen, setPanelState, hydrated] = PanelState.useContainer();
  const { loading, error, data } = useCurrentExhibitionQuery();

  const renderExhibitionInfo = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <code>{JSON.stringify(error)}</code>;
    }

    const exhibition = first(data.exhibitions);
    if (!exhibition) {
      return <div>No current exhibition found.</div>;
    }

    return (
      <>
        <h1>Exhibition {exhibition.number}</h1>
        {exhibition.shows.map(show => (
          <div key={show.number}>
            <Link to={`/${format(exhibition.number, show.number)}`}>
              {show.number}: {show.opensAt} -> {show.closesAt}
              <ExhibitionTimes opensAt={show.opensAt} closesAt={show.closesAt}></ExhibitionTimes>
            </Link>
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      This is the Home page.
      {renderExhibitionInfo()}
      <PanelAction.Source>About</PanelAction.Source>
      <PanelContent.Source>
        <h1>dot.gallery</h1>
        <ArtworkMetadata artistName="test"/>
      </PanelContent.Source>
      {/*<AudioComponent />*/}
    </div>
  );
}
