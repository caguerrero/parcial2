import { useEffect, useState } from "react";
import {Table} from 'react-bootstrap';

const Series = () =>{
    const [series, setSeries] = useState();
    useEffect(()=>{
        fetch("https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/a467415350e87c13faf9c8e843ea2fd20df056f3/series-es.json")
            .then(result => result.json())
            .then((result)=>{
                Object.keys(result).forEach((key)=>{
                    setSeries({...series, id:result.id, name:result.name, channel:result.channel, seasons:result.seasons, episodes:result.episodes, release:result.release})
                })
            })
    }, []);

    return(
        <>
            <h1>Hola mundo</h1>
        </>
    )

    /*
    "id": 2,
    "name": "Orange Is the New Black",
    "channel": "Netflix",
    "seasons": 6,
    "episodes": 91,
    "release": "11/07/2013",
    "description": "La serie gira en torno a Piper Chapman, una mujer de unos treinta años que vive en la ciudad de Nueva York y que es sentenciada a 15 meses en la penitenciaría de Litchfield.",
    "webpage": "https://www.netflix.com/co/title/70242311",
    "poster": "https://i.imgur.com/EvKe48G.jpg"
*/
}

export default Series;