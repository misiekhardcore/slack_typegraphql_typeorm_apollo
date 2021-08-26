import React from "react";
import { AppLayout } from "../components/AppLayout";
import { Header } from "../components/Header";
import { Messages } from "../components/Messages";
import { SendMessage } from "../components/SendMessage";
import { Sidebar } from "../containers/Sidebar";

export const ViewTeam: React.FC = () => {
  return (
    <AppLayout>
      <Sidebar currentTeamId={9} />
      <Header channelName="channel1" />
      <Messages>
        <ul className="message-list">
          <li></li>
          <li></li>
        </ul>
      </Messages>
      <SendMessage channelName="channel1">
        <input type="text" placeholder="CSS Grid Layout Module" />
      </SendMessage>
    </AppLayout>
  );
};
