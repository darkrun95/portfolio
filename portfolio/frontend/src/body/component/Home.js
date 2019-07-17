import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import MainContentContainer from '../../content/container/MainContentContainer.js';
import SideBarContainer from '../../content/container/SideBarContainer.js';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: undefined,
        }

        fetch('/api/users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(json => {
            if (json) {
                this.setState({
                    profile: json,
                })
            }
        })
        .catch((error) => {
            console.error("Something went wrong.")
        });
    }

	render() {
        const { profile } = this.state;
		return (
            <div>
                {
                    profile === undefined ? "":
                    <Container>
                        <Row>
                            <Col lg={3} md={3} sm={4} xs={12} className="inintoku-center">
                                <Image src={"/" + profile.profile_image}
                                       className="inintoku-face-image"
                                       roundedCircle 
                                       thumbnail />
                            </Col>
                            <Col lg={5} md={5} sm={4} xs={5} className="inintoku-main">
                                <MainContentContainer />
                            </Col>
                            <Col lg={4} md={4} sm={4} xs={7} className="inintoku-main">
                                <SideBarContainer />
                            </Col>
                        </Row>
                    </Container>
                }
            </div>
		);
	}
}

export default Home;