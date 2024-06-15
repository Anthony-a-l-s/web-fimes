import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";
import './filme-info.css'


function Filme() {

    const { id } = useParams();

    const [filme, setFilme] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '1833fa2cf920f4f2c968289ec056514b',
                    language: 'pt-BR',
                }
            }

            )
                .then((response) => {
                    setFilme(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    console.log('filme não encontrado')
                })
        }

        loadFilme();

        return () => {
            console.log('componente desmontado')
        }
    }, [])

    if (loading) {
        return (
            <div>
                <h1 className="flime-info ...">Carregando detalhes ...</h1>
            </div>
        )
    } else {
        return (
            <div className="flime-info">
                <h1>{filme.title}</h1>
                <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
                <h3>Sinopse</h3>
                <span>{filme.overview}</span>
                <strong>Avaliação: {filme.vote_average} /10</strong>
                <div className="area-buttons">
                    <button>Salvar</button>
                    <button>
                        <a href='#'>Trailer</a>
                    </button>
                </div>
            </div>
        )
    }
}

export default Filme;