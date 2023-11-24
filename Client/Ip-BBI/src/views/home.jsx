import { useContext, useEffect, useState } from 'react';
import BaseUrl from '../helpers/baseurl';
import axios from 'axios';
import Card from '../components/card';
import { ToastContainer, toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import { teamsContext } from '../state/teams';

export function Home() {
  // const [teams, setTeams] = useState([]);
  // const [totalTeam, setTotalTeam] = useState(0);
  // const [activePage, setActivePage] = useState(0);
  const token = localStorage.getItem('access_token');
  const { teams, setTeams, totalTeam, setTotalTeam, activePage, setActivePage, deleteTeam, setDeleteTeam } = useContext(teamsContext);
  const [sort, setSort] = useState('ASC');

  const fetch = async () => {
    try {
      const { data } = await axios.get(BaseUrl + `teams/all?sort=${sort}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setActivePage(activePage + 1);
      console.log(deleteTeam);
      if (deleteTeam) {
        setTeams(data.rows);
      } else {
        setTeams([...teams, ...data.rows]);
      }
      setTotalTeam(data.count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDeleteTeam(false);
  }, [setDeleteTeam, teams]);

  useEffect(() => {
    fetch();
  }, [token, deleteTeam]);

  async function handleDelete(e) {
    try {
      const { data } = await axios.delete(BaseUrl + `teams/delete/${e.target.value}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setDeleteTeam(true);
    } catch ({ response }) {
      toast.error(response.data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }

  function handleSort(e) {
    // console.log(e.target.value);
    setSort(e.target.value);
    setDeleteTeam(true);
  }

  if (teams.length === 0) {
    return <div>Waiting.................</div>;
  }

  return (
    <section className="bg-dark d-flex flex-column">
      <h1 className="text-center text-light mb-3 col">TEAMS</h1>
      <div className="container-fluid ms-0">
        <div className=" d-flex mx-3 my-3">
          <label htmlFor="sortBy" className="text-light">
            Sort By
          </label>
          <select className="form-select" name="sortBy" aria-label="Default select example" onChange={handleSort}>
            <option selected>Open this select menu</option>
            <option value="ASC">Name Ascending</option>
            <option value="DESC">Name Descending</option>
          </select>
        </div>
        <InfiniteScroll
          dataLength={teams.length} //This is important field to render the next data
          next={fetch}
          hasMore={teams.length < totalTeam}
          loader={<h4>Loading...</h4>}
          endMessage={
            <h3 style={{ textAlign: 'center', color: 'red' }}>
              <b>Yay! You have seen it all</b>
            </h3>
          }
        >
          <div className="d-flex flex-wrap gap-4 justify-content-center ">
            {teams.map((team, index) => {
              return (
                <>
                  <Card team={team} key={index} handleDelete={handleDelete} />
                </>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <ToastContainer />
    </section>
  );
}
