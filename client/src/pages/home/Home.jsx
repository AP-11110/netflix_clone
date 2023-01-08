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
        const res = await axios.get(`/movies/random/list${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`);
        setLists(res.data);
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