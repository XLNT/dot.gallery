import { Link } from "react-router-dom";
import { format } from "lib/exhibitionSlug";
import PanelAction from "context/PanelAction";
import PanelContent from "context/PanelContent";
import React from "react";
{
  /*import AudioComponent from "components/AudioComponent"*/
}
import ExhibitionTimes from "components/ExhibitionTimesComponent";
import LoginComponent from "../components/LoginComponent";
import RichText from "@madebyconnor/rich-text-to-jsx";
import WithContentTransition from "components/WithContentTransition";
import contentful from "client/contentful";
import useCurrentExhibition from "hook/useCurrentExhibition";
import usePromise from "react-use-promise";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const ABOUT_ID = "3myaHf3JO0keiFVJvbvgL4";

export default function Home() {
  useSuggestedPanelState(true);
  const { exhibition, loading, error } = useCurrentExhibition();
  const [result, , state] = usePromise(() => contentful.getEntry<any>(ABOUT_ID), [contentful]);

  const renderExhibitionInfo = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <code>{JSON.stringify(error)}</code>;
    }

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
      <PanelAction.Source>About&nbsp;&nbsp;</PanelAction.Source>
      <PanelContent.Source>
        <WithContentTransition>
          {state === "resolved" && <RichText richText={result.fields.body} />}
          {state === "rejected" && (
            <>
              <h1>dot.gallery</h1>
            </>
          )}
        </WithContentTransition>
      </PanelContent.Source>
      <LoginComponent ticketPrice="200" remainingTicketCount="45" />
      {/*<AudioComponent />*/}
    </div>
  );
}
