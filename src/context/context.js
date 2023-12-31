import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';


const GithubContext = React.createContext()


const GithubProvider = ({ children }) => {
    const [githubUser, setGithubUser] = useState(mockUser)
    const [githubRepos, setGithubRepos] = useState(mockRepos)
    const [githubFollowers, setGithubFollowers] = useState(mockFollowers)


    // request limit and loading
    const [request, setRequest] = useState(0)
    const [loading, setLoading] = useState(false)

    // error handling

    const [error,setError]= useState({show:false,msg:''})
    
    const checkRequest = () => {
        axios(`${rootUrl}/rate_limit`).then(({ data }) => {
            let { rate: { remaining } } = data
            setRequest(remaining)
            if (remaining === 0) {
                toggleError(true,'you have exceeded your hourly rate limit')
            }
        }).catch((err) => { console.log(err);})
    }

    function toggleError(show, msg) {
    setError({show,msg})
}

    useEffect(checkRequest,[])

 
    return <GithubContext.Provider value={{githubUser, githubFollowers, githubRepos, request,error}}>
        {children}
    </GithubContext.Provider>
}

export {GithubProvider , GithubContext}