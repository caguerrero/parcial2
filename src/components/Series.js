import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Serie from './Serie';
import { FormattedDate, FormattedNumber, FormattedMessage } from 'react-intl';

function convert(date) {
    let datearray = date.split("/");
    let newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
    return newdate;
}

const Series = (props) => {
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
            arrSeries.forEach((item) => {
                item.poster = props.errMsg;
            })
            setSeries(arrSeries);
        } else {
            fetch(props.lang)
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
                        <th><FormattedMessage id="Name" /></th>
                        <th><FormattedMessage id="Channel" /></th>
                        <th><FormattedMessage id="Seasons" /></th>
                        <th><FormattedMessage id="Episodes" /></th>
                        <th><FormattedMessage id="ReleaseDate" /></th>
                    </tr>
                </thead>
                <tbody>
                    {series.map((item) => (
                        <tr onClick={() => clickedSerie(item.id)}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.channel}</td>
                            <td>
                                <FormattedNumber
                                    value={item.seasons}
                                />
                            </td>
                            <td>
                                <FormattedNumber
                                    value={item.episodes}
                                />
                            </td>
                            <td>
                                <FormattedDate
                                    value={convert(item.release)}
                                    year="numeric"
                                    month="long"
                                    day="numeric"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {
                series.map((item) => (
                    state[item.id] && <Serie key={item.id} it={item} errMsg= {props.errMsg} />
                ))
            }
        </>
    )
}

export default Series;