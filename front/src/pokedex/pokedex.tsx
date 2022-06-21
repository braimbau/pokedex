import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import '../styles/pokedex.css'
import Grid from './grid';

function Pokedex() {

    const [page, setPage] = useState(0);

    const { loading, error, data } = useQuery(gql`query getMaxPages {
        maxPages
    }`);

    const onPrev = () => {
        if (page > 0)
            setPage(prevPage => prevPage - 1)
    }

    const onNext = () => {
        if (page + 1< data.maxPages)
        setPage(prevPage => prevPage + 1)
    }

    if (loading) return <div className='Info'>Loading...</div>;
    if (error) return <div className='Info'>Error</div>;

    return (
        <div className='Frame'>
            <div className='Pokedex'>
                <div className='Title'>Pokedex</div>
                <Grid page={page}/>
                <div className='Controls'>
                    <div className='Display'>
                        <div className='DisplayText'>{`${page +1}/${data.maxPages}`}</div>
                    </div>
                    <div className='Arrows'>
                        <div className='Prev' onClick={onPrev}></div>
                        <div className='Next' onClick={onNext}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pokedex