import { useEffect, useState } from 'react';
import BaseUrl from '../helpers/baseurl';
import token from '../helpers/token';
import axios from 'axios';

export function Home() {
  const [teams, setTeams] = useState([]);

  const fetch = async () => {
    try {
      const { data } = await axios.get(BaseUrl + 'teams/all', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setTeams(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  if (teams.length === 0) {
    return <div>Waiting.................</div>;
  }

  return (
    <section className="bg-dark d-flex flex-column">
      <h1 className="text-center text-light mb-3 col">TEAMS</h1>
      <div className="container-fluid ms-5">
        <div className="d-flex flex-wrap gap-2 justify-content-between ">
          {teams.map((team) => {
            return (
              <>
                <div className="card  h-100 text-center mb-3 shadow-lg" style={{ width: '18rem' }}>
                  <img src={team.logo} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{team.name}</h5>
                    <a className="btn btn-warning ">Show Statistic</a>
                  </div>
                </div>
                ;
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
}
