import {useState, useEffect, Fragment} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';
import ArtistView from './components/ArtistView';
import AlbumView from './components/AlbumView';
import './App.css';

function App() {
  let [message, setMessage] = useState('Seach for music')
  let [search, setSearch] = useState('')
  let [data, setData] = useState([])

  const API_URL = 'https://itunes.apple.com/search?term='

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  useEffect(()=>{
    if(search){
    const fetchData = async () => {
      document.title = `${search} music`
      const response = await fetch(API_URL + search)
      const resData = await response.json()
      if(resData.results.length > 0){
        setData(resData.results)
      }else{
        setMessage('Not Found')
      }
    }
    fetchData()
    }
  }, [search])const handleSearch = (e, term) => {
    e.preventDefault();
    setSearch(term)
  }
  return (
    <div>
    {message}
        <Router>
            <Routes>
                <Route path="/" element={
                    <Fragment>
                        <SearchBar handleSearch = {handleSearch}/>
                        <Gallery data={data} />
                    </Fragment>
                } />
                <Route path="/album/:id" element={<AlbumView />} />
                <Route path="/artist/:id" element={<ArtistView />} />
            </Routes>
        </Router>
    </div>
)

}
export default App;