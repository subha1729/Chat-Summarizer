import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/dashboard.css";


import ConnectedApps from "../components/ConnectedApps";
import SummaryCard from "../components/SummaryCard";

import GuildSelector from "../components/GuildSelector";
import SummaryButtons from "../components/SummaryButtons";

import useDashboardData from "../hooks/useDashboardData";

function Dashboard() {

  const [topicSummary, setTopicSummary] =
    useState("");
  const [userSummary, setUserSummary] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [channels, setChannels] =
    useState([]);

  const [selectedChannel,
    setSelectedChannel] =
    useState("");


  const [selectedGuild,
    setSelectedGuild] =
    useState("");
  
  

  const {
    summaries,
    accounts,
    guilds,
    refresh,
  } = useDashboardData();
  

  useEffect(() => {

      if (
        guilds.length > 0 &&
        selectedGuild === ""
      ) {

        queueMicrotask(() => {

          setSelectedGuild(
            guilds[0]._id
          );

        });

      }

  }, [guilds, selectedGuild]);


  useEffect(() => {

    const fetchChannels =
      async () => {

        if (!selectedGuild)
          return;

        try {

          const res = await API.get("/api/messages/channels", {
  params: {
    guildId: selectedGuild,
  },
});

          setChannels(
            res.data
          );

          if (
            res.data.length > 0
          ) {
            setSelectedChannel(
              res.data[0]
            );
          }

        } catch (error) {

          console.error(error);

        }

      };

    fetchChannels();

  }, [selectedGuild]);

  console.log("selectedGuild", selectedGuild);
  console.log(guilds[0]);
  const generateSummary =
    async () => {

      try {

        setLoading(true);

        await API.post(
          "/api/summaries/generate",
          {
            guildId:
              selectedGuild,
            channelName:
              selectedChannel,
          }
        );

        await refresh();

      } catch (error) {

        console.error(error);

        console.log("FULL ERROR:", error.response?.data);

alert(
  JSON.stringify(error.response?.data) ||
  "Failed to generate summary"
);

      } finally {

        setLoading(false);

      }
    };

  const generateTopicSummary =
    async () => {

      try {

        setLoading(true);

        const res =
          await API.post(
            "/api/summaries/topic-summary",
            {
              guildId:
                selectedGuild,
              channelName:
                selectedChannel,
            }
          );

        setTopicSummary(
          res.data.content
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

  const generateUserSummary =
    async () => {

      try {

        setLoading(true);

        const res =
          await API.post(
            "/api/summaries/user-summary",
            {
              guildId:
                selectedGuild,
              channelName:
                selectedChannel,
            }
          );

        setUserSummary(
          res.data.content
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

  return (
    <div className="dashboard">


      <ConnectedApps
        accounts={accounts}
      />

      <GuildSelector
        guilds={guilds}
        channels={channels}
        selectedGuild={selectedGuild}
        selectedChannel={selectedChannel}
        setSelectedGuild={setSelectedGuild}
        setSelectedChannel={setSelectedChannel}
      />

      <SummaryButtons
        loading={loading}
        generateSummary={generateSummary}
        generateTopicSummary={
          generateTopicSummary
        }
        generateUserSummary={
          generateUserSummary
        }
      />

      <SummaryCard
        summaries={summaries}
        topicSummary={
          topicSummary
        }
        userSummary={
          userSummary
        }
      />

    </div>
  );
}

export default Dashboard; 