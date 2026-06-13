import { useEffect, useState } from "react";
import API from "../services/api";

function Servers() {

  const [guilds, setGuilds] =
    useState([]);

  useEffect(() => {

    const loadGuilds =
      async () => {

        try {

          const res =
            await API.get(
              "/guilds/details"
            );

          setGuilds(
            res.data
          );

        } catch (error) {

          console.error(
            error
          );

        }

      };

    loadGuilds();

  }, []);

  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <h1>
        Connected Servers
      </h1>

      <div
        style={{
          display: "grid",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {guilds.map(
          (guild) => (
            <div
              key={
                guild.guildId
              }
              style={{
                background:
                  "#16233f",
                padding:
                  "20px",
                borderRadius:
                  "12px",
              }}
            >
              <h2>
                {
                  guild.guildName
                }
              </h2>

              <p>
                Messages:
                {" "}
                {
                  guild.messageCount
                }
              </p>

              <p>
                Channels:
                {" "}
                {
                  guild.channelCount
                }
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Servers;