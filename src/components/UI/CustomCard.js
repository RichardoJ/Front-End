import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';

function CustomCard(props) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Start Date : {props.startDate}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">End Date : {props.endDate}</Card.Subtitle>
        <Card.Text>
          Link : {props.link}
        </Card.Text>
        {/* <Link href="/assignment"></Link> */}
        <Link to ={'/student/courses/' + props.id} ><Button variant="primary" id='btnModule'>Overview</Button></Link>
      </Card.Body>
    </Card>
  );
}

export default CustomCard;