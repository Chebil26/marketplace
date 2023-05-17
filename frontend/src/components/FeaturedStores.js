import { Row, Col, Image, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function FeaturedStores({ stores }) {
  return (
    <Container>
      <h2
        className='text-center mb-4'
        style={{
          color: '#18bc9c',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
        }}>
        Featured Stores
      </h2>
      <Row xs={1} md={2} lg={3} className='g-4'>
        {stores &&
          stores.map((store) => (
            <Col key={store.id} className='text-center'>
              <Link
                to={`/stores/${store.id}`}
                style={{ textDecoration: 'none' }}>
                <Image
                  src={`${process.env.REACT_APP_API_SERVER}${store.image}`}
                  alt={store.name}
                  fluid
                  style={{ maxWidth: '200px' }}
                />
                <h3 className='mt-3'>{store.name}</h3>
                <p>{store.wilaya}</p>
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default FeaturedStores;
