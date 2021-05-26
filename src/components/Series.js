import { useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
import Serie from "./Serie";

const Series = () => {
    const [series, setSeries] = useState([]);

    const [state, setState] = useState([]);

    const clickedSerie = (id) => {
        let newArr = [...state];
        if (newArr[id]) {
            newArr[id] = false;
            setState(newArr);
        } else {
            let i = 0;
            while (i < newArr.length) {
                newArr[i] = false;
                i++;
            }
            newArr[id] = true;
            setState(newArr);
        }
    }

    useEffect(() => {
        if (!navigator.onLine) {
            let i = 0;
            const arrSeries = [];
            while (localStorage.getItem(`series ${i}`) !== null) {
                arrSeries.push(JSON.parse(localStorage.getItem(`series ${i}`)));
                i++;
            }
            if (arrSeries.length < 0) {
                arrSeries.push({ id: 0, name: "Error while loading", channel: "Error while loading", seasons: 0, episodes: 0, release: "0/0/0", description: "Error while loading", webpage: "Error while loading", poster: "Error while loading image." });
            }
            arrSeries.forEach((item)=>{
                item.poster = "Error while loading image.";
            })
            setSeries(arrSeries);
        } else{
            fetch("https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/a467415350e87c13faf9c8e843ea2fd20df056f3/series-es.json")
            .then(result => result.json())
            .then((result) => {
                Object.keys(result).forEach((key) => {
                    localStorage.setItem(`series ${key}`, JSON.stringify(result[key]));
                    setSeries(series => [...series, result[key]]);
                    setState(state => [...state, false]);
                })
            })
        }
    }, []);


    return (
        <>
            <Table bordered striped hover style={{ width: "40rem" }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Channel</th>
                        <th>Seasons</th>
                        <th>Episodes</th>
                        <th>Release Date</th>
                    </tr>
                </thead>
                <tbody>
                    {series.map((item) => (
                        <tr onClick={() => clickedSerie(item.id)}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.channel}</td>
                            <td>{item.seasons}</td>
                            <td>{item.episodes}</td>
                            <td>{item.release}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {
                series.map((item) => (
                    state[item.id] && <Serie key={item.id} it = {item}/>
                ))
            }
        </>
    )
}

export default Series;