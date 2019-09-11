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
import {
  Room,
  useCurrentEntityQuery,
  useUserDataTokenQuery,
} from "../../operations";
import { get } from "lodash";
import PresentEntity from "./PresentEntity";
import React, { useEffect } from "react";
import config from "config";
import styled from "styled-components";

const PresenceList = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  width: calc(100% - 7rem);
`;

export default function SocialLayer({ room }: { room: Pick<Room, "id"> }) {
  const { data: tokenData } = useUserDataTokenQuery({ pollInterval: 5000 });
  const token = get(tokenData, "userDataToken");
  // const { data, loading, error } = useCurrentEntityQuery({
  //   pollInterval: 5000,
  // });

  return (
    <>
      {token && room && (
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
                if (!room.joined) {
                  console.log(room.roomState, rest);
                  return "Joining room...";
                }

                return (
                  <>
                    <PeerList
                      room={room.address}
                      render={({ peers }) =>
                        peers.map(peer => {
                          return (
                            <PresenceList key={peer.address}>
                              <PresentEntity
                                peer={peer}
                                draggable={false}
                                wrappable={false}
                              />
                            </PresenceList>
                          );
                        })
                      }
                    />
                  </>
                );
              }}
            </SWRTCRoom>
          </Connected>
        </SWRTCProvider>
      )}
    </>
  );
}
