import { Row, Col, Image, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function FeaturedStores({ stores }) {
  return (
    <Container>
      <h2>Featured Stores</h2>
      <Row xs={1} md={2} lg={3} className='g-4'>
        {stores &&
          stores.map((store) => (
            <Col key={store.id}>
              <Link to={`/stores/${store.id}`}>
                <Image
                  src={`${process.env.REACT_APP_API_SERVER}${store.image}`}
                  alt={store.name}
                  fluid
                  style={{ maxWidth: '200px' }}
                />

                <h3>{store.name}</h3>
                <p>{store.description}</p>
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default FeaturedStores;
