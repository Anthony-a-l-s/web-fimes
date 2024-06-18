import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from "../../services/api";
import './filme-info.css'


function Filme() {

    const { id } = useParams();
    const navigate = useNavigate();

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
                    navigate('/',{ replace: true });
                    return;
                })
        }

        loadFilme();

        return () => {
            console.log('componente desmontado')
        }
    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem('@primeflix');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const resFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if(resFilme){
            toast.warn('Esse filme já está na sua lista!')
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos))
        toast.success('Fime salvo com sucesso!')
    }

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
                    <button onClick={salvarFilme}>Salvar</button>
                    <button>
                        <a 
                        target='blank'
                        rel='external'
                        href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer
                        </a>
                    </button>
                </div>
            </div>
        )
    }
}

export default Filme;