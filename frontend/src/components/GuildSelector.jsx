// import "../styles/guildSelector.css";

// function GuildSelector({
//   guilds,
//   channels,
//   selectedGuild,
//   selectedChannel,
//   setSelectedGuild,
//   setSelectedChannel
// }) {
//   return (

//   <div className="guild-card">

//     <h3>
//       Select Server
//     </h3>

//     <select
//       className="channel-select"
//       value={selectedGuild}
//       onChange={(e) =>
//         setSelectedGuild(
//           e.target.value
//         )
//       }
//     >
//       {guilds.map((guild) => (

//         <option
//           key={guild._id}
//           value={guild._id}
//         >
//           {guild.guildName}
//         </option>

//       ))}
//     </select>

//     <h3
//       style={{
//         marginTop:"20px"
//       }}
//     >
//       Select Channel
//     </h3>

//     <select
//       className="channel-select"
//       value={selectedChannel}
//       onChange={(e) =>
//         setSelectedChannel(
//           e.target.value
//         )
//       }
//     >
//       {channels.map((channel) => (

//         <option
//           key={channel}
//           value={channel}
//         >
//           {channel}
//         </option>

//       ))}
//     </select>

//   </div>

// );
// }

// export default GuildSelector;



//---------------------------------------//

// import "../styles/guildSelector.css"; function GuildSelector({ guilds, channels, selectedGuild, selectedChannel, setSelectedGuild, setSelectedChannel }) { return ( <> <label style={{ display: "block", textAlign: "center", marginBottom: "8px" }} > Server </label> <select className="channel-select" value={selectedGuild} onChange={(e) => setSelectedGuild( e.target.value ) } > {guilds.map((guild) => ( <option key={guild._id} value={guild._id} > {guild.guildName} </option> ))} </select> <label style={{ display: "block", textAlign: "center", marginBottom: "8px" }} > Channel </label> <select className="channel-select" value={selectedChannel} onChange={(e) => setSelectedChannel( e.target.value ) } > {channels.map((channel) => ( <option key={channel} value={channel} > {channel} </option> ))} </select> </> ); } export default GuildSelector;

import "../styles/guildSelector.css";

function GuildSelector({
  guilds,
  channels,
  selectedGuild,
  selectedChannel,
  setSelectedGuild,
  setSelectedChannel,
}) {
  return (
    <section className="filter-card">
      <div className="filter-card__header">
        <div>
          <p className="eyebrow">Workspace controls</p>
          <h2>Choose your server and channel</h2>
        </div>
        <span className="filter-chip">Live summary mode</span>
      </div>

      <div className="filter-grid">
        <label className="filter-field">
          <span>Server</span>
          <select
            className="channel-select"
            value={selectedGuild}
            onChange={(e) => setSelectedGuild(e.target.value)}
          >
            {guilds.map((guild) => (
              <option key={guild._id} value={guild._id}>
                {guild.guildName}
              </option>
            ))}
          </select>
        </label>

        <label className="filter-field">
          <span>Channel</span>
          <select
            className="channel-select"
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
          >
            {channels.map((channel) => (
              <option key={channel} value={channel}>
                {channel}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}

export default GuildSelector;
