import React, { createContext, useState, useCallback, useEffect } from "react";
import { appEnvs } from "../lib/env";
import { appConfig } from "../lib/appConfig";
import Data from "../Data/index.json";

const PortfolioContext = createContext({
  portfolioData: {},
  repos: [],
  setRepos: () => {},
  repo: null,
  setRepo: () => {},
  fetchAllRepos: () => {},
  fetchSingleRepo: () => {},
  fetchRepoLogo: () => {},
});

const PortfolioProvider = ({ children }) => {
  const [portfolioData] = useState(Data);

  const [repos, setRepos] = useState([]);
  const [repo, setRepo] = useState(null);

  const fetchAllRepos = useCallback(async () => {
    const apiUrl = `https://api.github.com/users/${appEnvs.REACT_APP_GITHUB_USERNAME}/repos?per_page=${appConfig.github.perPage}&page=${appConfig.github.initialPage}`;
    fetch(apiUrl, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_API_KEY}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRepos(data);
      })
      .catch((error) => {
        console.error("Error fetching repositories:", error);
      });
  }, []);

  const fetchSingleRepo = useCallback(async (repoName) => {
    const apiUrl = `https://api.github.com/repos/${appEnvs.REACT_APP_GITHUB_USERNAME}/${repoName}`;
    fetch(apiUrl, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_API_KEY}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRepo(data);
        return Promise.resolve();
      })
      .catch((error) => {
        console.error("Error fetching repository:", error);
      });
  }, []);

  const fetchRepoLogo = useCallback(async (repoName) => {
    const apiUrl = `https://api.github.com/repos/${repoName}/contents/logo.png`;
    fetch(apiUrl, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_API_KEY}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => data)
      .catch((error) => {
        console.error("Error fetching repository logo:", error);
      });
  }, []);

  useEffect(() => {
    fetchAllRepos();
  }, [fetchAllRepos]);

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        repo,
        setRepo,
        repos,
        setRepos,
        fetchAllRepos,
        fetchSingleRepo,
        fetchRepoLogo,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

const usePortfolio = () => React.useContext(PortfolioContext);

export { PortfolioContext, PortfolioProvider, usePortfolio };
