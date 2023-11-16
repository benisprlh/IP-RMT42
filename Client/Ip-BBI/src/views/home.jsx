import { useEffect, useState } from 'react';
import BaseUrl from '../helpers/baseurl';
import axios from 'axios';
import Card from '../components/card';

export function Home() {
  const [teams, setTeams] = useState([]);
  const token = localStorage.getItem('access_token');
  const [refresh, setRefresh] = useState(false);

  const fetch = async () => {
    try {
      const { data } = await axios.get(BaseUrl + 'teams/all', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setTeams(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, [token]);

  async function handleDelete(e) {
    try {
      const { data } = await axios.delete(BaseUrl + `teams/delete/${e.target.value}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      fetch();
    } catch (error) {
      console.log(error);
    }
  }

  if (teams.length === 0) {
    return <div>Waiting.................</div>;
  }

  return (
    <section className="bg-dark d-flex flex-column">
      <h1 className="text-center text-light mb-3 col">TEAMS</h1>
      <div className="container-fluid ms-0">
        <div className="d-flex flex-wrap gap-4 justify-content-center ">
          {teams.map((team, index) => {
            return (
              <>
                <Card team={team} key={index} handleDelete={handleDelete} />
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
}
