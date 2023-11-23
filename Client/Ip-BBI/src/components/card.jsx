import { useNavigate } from 'react-router-dom';

export default function Card({ team, handleDelete }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  function handleStatistic(e) {
    navigate(`/teamDetail/${e.target.value}`);
  }

  return (
    <>
      <div className="card  h-100 text-center mb-3 shadow-lg" style={{ width: '18rem' }}>
        <img src={team.logo} className="card-img-top" style={{ height: '18rem' }} alt="..." />
        <div className="card-body">
          <h5 className="card-title">{team.name}</h5>
          <button className="btn btn-warning me-1" value={team.id} onClick={handleStatistic}>
            Show Statistic
          </button>
          <button className="btn btn-danger ms-1" value={team.id} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
