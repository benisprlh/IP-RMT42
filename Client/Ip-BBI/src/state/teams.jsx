import { createContext, useState } from 'react';

export const teamsContext = createContext({
  teams: [],
  setTeams: () => {},
  totalTeam: 0,
  setTotalTeam: () => {},
  activePage: 0,
  setActivePage: () => {},
  deleteTeam: false,
  setDeleteTeam: () => {},
});

export default function TeamProvider(props) {
  const [teams, setTeams] = useState([]);
  const [totalTeam, setTotalTeam] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [deleteTeam, setDelete] = useState(false);
  return (
    <teamsContext.Provider
      value={{
        teams: teams,
        setTeams: setTeams,
        totalTeam: totalTeam,
        setTotalTeam: setTotalTeam,
        activePage: activePage,
        setActivePage: setActivePage,
        deleteTeam: deleteTeam,
        setDeleteTeam: setDelete,
      }}
    >
      {props.children}
    </teamsContext.Provider>
  );
}
