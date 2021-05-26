import { Card } from 'react-bootstrap';

const Serie = (props) => {
    return (
        <Card style={{ width: "30rem" }}>
            {props.it.poster !== "Error while loading image." && <Card.Img variant="top" src={props.it.poster} />}
            {props.it.poster === "Error while loading image." && <Card.Text> {props.it.poster} </Card.Text>}
            <Card.Body>
                <Card.Title>{props.it.name}</Card.Title>
                <Card.Text>
                    {props.it.description}
                </Card.Text>
                <Card.Link href={props.it.webpage}>{props.it.webpage}</Card.Link>
            </Card.Body>
        </Card>
    )
}

export default Serie;