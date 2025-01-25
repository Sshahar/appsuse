const { Container, Row, Col, Button } = ReactBootstrap
const { Link } = ReactRouterDOM

export function Home() {
    return (<section className="home">
        <div className="bg-light py-5">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <h1 className="display-4">Manage Everything in One Place</h1>
                        <p className="lead">
                            Simplify your life with our integrated platform. Stay on top of your emails, reading list, and notes—all from one app.
                        </p>
                        <Link to='/about'>
                            <Button variant="primary" size="lg">Get Started</Button>
                        </Link>
                    </Col>
                    <Col md={6}>
                        <img
                            src="assets/img/big-logo.png"
                            alt="Appsuse Illustration"
                            className="img-fluid"
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    </section>
    );
};
