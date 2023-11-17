import axios from 'axios';
import { useParams } from 'react-router-dom';
import BaseUrl from '../helpers/baseurl';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export function TeamDetail() {
  const { teamId } = useParams();
  const [team, setTeam] = useState({
    name: '',
    nickname: '',
    city: '',
  });
  const [statistic, setStatistic] = useState({
    games: 0,
    points: 0,
    offReb: 0,
    defReb: 0,
    fastBreakPoints: 0,
    pointsInPaint: 0,
    pointsOffTurnovers: 0,
    steals: 0,
  });
  const [loader, setLoader] = useState(true);
  const token = localStorage.getItem('access_token');

  const fetchDetail = async () => {
    setLoader(true);
    try {
      const { data } = await axios.get(BaseUrl + `teams/${teamId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setTeam(data);
      setStatistic(data.Statistic);
      console.log(data.Statistic);
      setLoader(false);
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
  };

  useEffect(() => {
    fetchDetail();
  }, [teamId]);

  if (loader) {
    return (
      <>
        <div>Waiting...............</div>
      </>
    );
  }

  return (
    <>
      <section className="bg-dark  h-100">
        <div className="container py-3">
          <div className="row g-0">
            <div className="col-md-3 bg-dark">
              <img src={team.logo} className="img-fluid rounded-circle shadow-lg" style={{ width: '12rem' }} alt="..." />
            </div>
            <div className="col-md-6 text-light d-flex align-items-center">
              <div>
                <h3 className="card-title fw-bold text-warning py-2">{team.name}</h3>
                <div>
                  <h6 className="my-0">Nickname: {team.nickname}</h6>
                  <h6 className="my-0">City: {team.city}</h6>
                </div>
              </div>
            </div>

            <div className="card my-5">
              <div className="card-body">
                <h4 className="text-center mb-2">Statistic Team</h4>
                <div className="row g-0 ">
                  <div className="col-md-3 py-3 flex flex-column text-center">
                    <h6>Games</h6>
                    <p>{statistic.games}</p>
                  </div>
                  <div className="col-md-3 py-3 flex flex-column text-center">
                    <h6>Points</h6>
                    <p>{statistic.points}</p>
                  </div>
                  <div className="col-md-3 py-3 flex flex-column text-center">
                    <h6>Points In Paint</h6>
                    <p>{statistic.pointsInPaint}</p>
                  </div>
                  <div className="col-md-3 py-3 flex flex-column text-center">
                    <h6>Points of Turn Overs</h6>
                    <p>{statistic.pointsOffTurnovers}</p>
                  </div>
                  <div className="col-md-3 py-3 flex flex-column text-center">
                    <h6>Fast Break Points</h6>
                    <p>{statistic.fastBreakPoints}</p>
                  </div>
                  <div className="col-md-3 py-3 flex flex-column text-center">
                    <h6>Offense Rebound</h6>
                    <p>{statistic.offReb}</p>
                  </div>
                  <div className="col-md-3 py-3 flex flex-column text-center">
                    <h6>Deffense Rebound</h6>
                    <p>{statistic.defReb}</p>
                  </div>
                  <div className="col-md-3 py-3 flex flex-column text-center">
                    <h6>Steals</h6>
                    <p>{statistic.steals}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}
