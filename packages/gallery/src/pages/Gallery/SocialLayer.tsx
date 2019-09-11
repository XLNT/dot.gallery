import {
  Connected,
  Connecting,
  Disconnected,
  Failed,
  NotSupported,
  PeerList,
  RemoteAudioPlayer,
  Provider as SWRTCProvider,
  Room as SWRTCRoom,
} from "@andyet/simplewebrtc";
import { get } from "lodash-es";
import React from "react";
import styled from "styled-components";

import {
  Room,
  useCurrentEntityQuery,
  useUserDataTokenQuery,
} from "../../operations";
import { ZIndex } from "lib/zIndex";
import PresentEntity from "./PresentEntity";
import config from "config";

const PresenceList = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  width: calc(100% - 7rem);

  z-index: ${ZIndex.Social};
`;

export default function SocialLayer({ room }: { room: Pick<Room, "id"> }) {
  const { data: tokenData } = useUserDataTokenQuery({ pollInterval: 5000 });
  const token = get(tokenData, "userDataToken");
  const { data, loading, error } = useCurrentEntityQuery({
    pollInterval: 5000,
  });

  const ownId = get(data, ["currentEntity", "id"]);
  const ownHandle = get(data, ["currentEntity", "handle"]);

  return (
    <>
      <PresenceList>
        {false && token && room && (
          <SWRTCProvider
            configUrl={`https://api.simplewebrtc.com/config/user/${config.SIMPLEWEBRTC_API_KEY}`}
            userData={token}
          >
            <RemoteAudioPlayer />
            <Connecting>Connecting...</Connecting>
            <Connected>Connected</Connected>
            <Disconnected>Disconnected</Disconnected>
            <NotSupported configUrl="">NotSupported!</NotSupported>
            <Failed>Failed!</Failed>
            <Connected>
              <SWRTCRoom
                key={room.id}
                name={room.id}
                password="password"
                leave={address => console.log(`Left room ${address}`)}
                destroy={address => console.log(`Destroy room ${address}`)}
                lock={address => console.log(`Lock room ${address}`)}
                unlock={address => console.log(`Unlock room ${address}`)}
              >
                {({ room, ...rest }) => {
                  return (
                    <>
                      {room.joined && (
                        <PeerList
                          room={room.address}
                          render={({ peers }) =>
                            peers.map(peer => {
                              return (
                                <PresentEntity
                                  key={peer.address}
                                  id={peer.customerData["id"]}
                                  handle={peer.customerData["handle"]}
                                  peer={peer}
                                />
                              );
                            })
                          }
                        />
                      )}
                    </>
                  );
                }}
              </SWRTCRoom>
            </Connected>
          </SWRTCProvider>
        )}

        {!loading && !error && (
          <PresentEntity id={ownId} handle={`${ownHandle} (you)`} draggable />
        )}
      </PresenceList>
    </>
  );
}
