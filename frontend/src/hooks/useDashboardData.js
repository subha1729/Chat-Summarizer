import { useEffect, useState } from "react";
import API from "../services/api";

function useDashboardData() {

  const [user, setUser] =
    useState(null);

  const [summaries, setSummaries] =
    useState([]);

  const [stats, setStats] =
    useState({
      messages: 0,
      channels: 0,
      summaries: 0,
    });

  const [accounts, setAccounts] =
    useState([]);

  const [guilds, setGuilds] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchData = async () => {

    try {

      const [
        userRes,
        summariesRes,
        statsRes,
        accountRes,
        guildRes
      ] = await Promise.all([
        // API.get("/auth/me"),
        API.get("/api/auth/check"),
        API.get("/api/summaries"),
        API.get("/api/stats"),
        API.get("/api/accounts"),
        API.get("/api/guilds")
      ]);

      if (userRes.data.authenticated) {
        setUser(userRes.data.user);
      } else {
        setUser(null);
      }

      setSummaries(
        summariesRes.data
      );

      setStats(
        statsRes.data
      );

      setAccounts(
        accountRes.data
      );

      setGuilds(
        guildRes.data
      );

    } catch (error) {

      console.log(
    "URL:",
    error.config?.url
  );

  console.log(
    "STATUS:",
    error.response?.status
  );

  console.log(
    "DATA:",
    error.response?.data
  );


    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    const load = async () => {
        await fetchData();
    };

    load();

    }, []);

  return {
    user,
    summaries,
    stats,
    accounts,
    guilds,
    loading,
    refresh: fetchData
  };

}

export default useDashboardData;