import { useState } from 'react';

export default function fetchTeam(url) {
  const [teams, setTeams] = useState([]);

  const fetch = async () => {
    try {
      const { data } = await axios.get();
      setTeams(data);
    } catch (error) {
      console.log(error);
    }
  };
}
