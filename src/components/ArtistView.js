import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

function ArtistView() {
    const { id } = useParams()
    const [ artistData, setArtistData ] = useState([])
    const navigate = useNavigate

    useEffect(() =>{
        const API_URL = `http://localhost :4000/album${id}`
        const fetchData = async ()=> {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setArtistData(resData.results)
        }
        fetchData()
    })
    const justAlbums = artistData.filter(entry => entry.collectionType === 'Album')
    
    const renderAlbums = justAlbums.map((album, i) => {
    return (
        <div key={i}>
            <p>{album.collectionName}</p>
        </div>
    )
    })
const navButtons =() => {
    return(
        <div>
            <button onClick={() => navigate(-1) }>Back</button>
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    )
}
    return (
        <div>
            {artistData.length > 0 ? <h2>{artistData[0].artistname}</h2> : <h2>Loading...</h2>}
            {navButtons()}
            {allData}
            <h2>The id passed was: {id}</h2>
            <p>Artist Data Goes Here!</p>
            {renderAlbums}
        </div>
    )
}
export default ArtistView