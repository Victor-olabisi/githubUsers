import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [githubRepos, setGithubRepos] = useState(mockRepos);
  const [githubFollowers, setGithubFollowers] = useState(mockFollowers);

  // request limit and loading
  const [request, setRequest] = useState(0);
  const [loading, setLoading] = useState(false);

  // error handling

  const [error, setError] = useState({ show: false, msg: "" });

  // get github user from api function
  async function searchGithubUser(user) {
    setLoading(true);
    const { data } = await axios
      .get(`${rootUrl}/users/${user}`)
      .catch((error) => {
        return error;
      });
    if (data) {
      setGithubUser(data);
      const { login, followers_url } = data;
     
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}`),
      ]).then((results) => {
        const [repos, followers] = results;
        const status = "fulfilled";
        if (repos.status === status) {
          setGithubRepos(repos.value.data);
        }
          if (followers.status === status) {
              setGithubFollowers(followers.value.data)
          }
      });
      setLoading(false);
    } else {
      toggleError(true, "the username does not exist");
    }
    checkRequest();
  }

  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequest(remaining);
        if (remaining === 0) {
          toggleError(true, "you have exceeded your hourly rate limit");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }

  useEffect(checkRequest, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        loading,
        githubFollowers,
        searchGithubUser,
        githubRepos,
        request,
        error,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
