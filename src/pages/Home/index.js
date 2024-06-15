import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css'

function Home() {

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadingFilmes() {
            const response = await api.get('/movie/now_playing', {
                params: {
                    api_key: '1833fa2cf920f4f2c968289ec056514b',
                    language: 'pt-BR',
                    page: 1,
                }
            })
            setFilmes(response.data.results.slice(0, 10));
            setLoading(false);
        }

        loadingFilmes();

    }, [])
    if (loading) {
        return (
            <div className='loading'>
                <h2>Carregnado filmes ...</h2>
            </div>
        )
    } else {
        return (
            <div className='coniainer'>
                <div className='lista-filmes'>
                    {filmes.map((filme) => {
                        return (
                            <article key={filme.id}>
                                <strong>{filme.title}</strong>
                                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                                <Link to={`/filme/${filme.id}`}>Acessar</Link>
                            </article>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Home;