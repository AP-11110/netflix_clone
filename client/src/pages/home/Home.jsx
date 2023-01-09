import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import './home.scss';
import List from '../../components/list/List';
import axios from 'axios';
import { useState, useEffect } from 'react';
const Home = ({type}) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(`/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjczMTk2MTYwLCJleHAiOjE2NzM2MjgxNjB9.M4E1pyFGHgSOPCTNSWTicaZPaqcMfq_LmCehsrSu3us",
          }
        });
        // grouping rows into categories
        const lists = res.data.reduce((prev, curr) => {
          if(prev[curr.name]) {
            prev[curr.name].push(curr);
          } else {
            prev[curr.name] = [curr];
          }
          return prev;
        }, {})

        setLists(Object.values(lists));
      } catch (err) {
        console.log(err);
      }
    }
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map(list => (
        <List list={list}></List>
      ))}
    </div>
  )
}

export default Home