import { useEffect, useState, useRef } from 'react';
import { Table } from 'react-bootstrap';
import Serie from './Serie';
import * as d3 from 'd3';
import { FormattedDate, FormattedNumber, FormattedMessage } from 'react-intl';

function convert(date) {
    let datearray = date.split("/");
    let newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
    return newdate;
}

const Series = (props) => {

    const canvasRef = useRef();

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
                    let aux = []
                    Object.keys(result).forEach((key) => {
                        localStorage.setItem(`series ${key}`, JSON.stringify(result[key]));
                        aux.push(result[key])
                        setState(state => [...state, false]);
                    })
                    setSeries(aux);
                })
        }
    }, [props.errMsg, props.lang]);

    useEffect(() => {
        const chart = () => {
            const width = 800;
            const height = 350;
            const margin = { top: 40, left: 30, bottom: 40, right: 30 };
            const iwidth = width - margin.left - margin.right;
            const iheight = height - margin.top - margin.bottom;

            const svg = d3
                .select(canvasRef.current)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
            let g = svg
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            let yMin = Math.min.apply(
                Math,
                series.map(function (o) {
                    return o.seasons;
                })
            );
            let yMax = Math.max.apply(
                Math,
                series.map(function (o) {
                    return o.seasons;
                })
            );
            let xMin = Math.min.apply(
                Math,
                series.map(function (o) {
                    return o.episodes;
                })
            );
            let xMax = Math.max.apply(
                Math,
                series.map(function (o) {
                    return o.episodes;
                })
            );

            const y = d3
                .scaleLinear()
                .domain([yMin - 2, yMax])
                .range([iheight, 0]);

            g.append("g").call(d3.axisLeft(y));

            const x = d3
                .scaleLinear()
                .domain([xMin - 5, xMax + 100])
                .range([0, iwidth]);

            g.append("g")
                .attr("transform", "translate(0," + iheight + ")")
                .call(d3.axisBottom(x));

            let circles = g.append("g").selectAll("dot").data(series).enter();

            circles
                .append("circle")
                .attr("cx", function (d) {
                    return x(parseInt(d.episodes));
                })
                .attr("cy", function (d) {
                    return y(parseInt(d.seasons));
                })
                .attr("r", 6)
                .style("fill", "#ffd105")
                .style("opacity", "0.7")
                .attr("stroke", "black");

            circles
                .append("text")
                .attr("class", "label")
                .style("font-size", "12px")
                .attr("y", function (d) {
                    return y(d.seasons);
                })
                .attr("x", function (d) {
                    return x(d.episodes + 10);
                })
                .text(function (d) {
                    return d.name;
                });
        };
        if (series.length > 0) {
            chart();
        }
    }, [series])

    return (
        <>
            <h1><FormattedMessage id="Title" /></h1>
            <hr />
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
                    state[item.id] && <Serie key={item.id} it={item} errMsg={props.errMsg} />
                ))
            }
            <div ref={canvasRef} className="chart"></div>
        </>
    )
}

export default Series;