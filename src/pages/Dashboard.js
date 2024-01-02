import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
const Dashboard = () => {

const {loading}= React.useContext(GithubContext)
  if (loading) {
    return <main>
      <Navbar />
      <Search />
      <div className="loading-img">
        <img src={loadingImage} alt="loading" className='' />
      </div>
  </main>
}
  return (
    <main>
      <Navbar />
      <Search></Search>
      <Info />
      <User />
      <Repos/>
    </main>
  );
};

export default Dashboard;
