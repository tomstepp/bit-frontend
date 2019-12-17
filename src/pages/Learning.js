import React, { Component } from 'react';
import NavBar from '../components/Learning/NavBar';
import Navigation from '../components/Learning/Navigation';
import Content from '../components/Learning/Content';
import HintSection from '../components/Learning/HintSection';

import LearningService from '../services/LearningService';

class Learning extends Component {
    constructor() {
        super();
        this.state = {
            userLoggedIn: true,
            labTitle: "",
            cardTitle: "Object-Oriented Programming",
            cardContent: "",
            cardTitles: [
                "This is Card 1",
                "And then Card 2",
                "Also Card 3",
                "End with Card 4"
            ],
            lastCardOpened: null,
            totalGems: 256
        }

        this.learningService = new LearningService();
    }

    componentDidMount() {
        this.learningService.getLabInfo().then(data => {
            this.setState({
                labTitle: data.lab_title,
                lastCardOpened: data.last_card_opened
            })
        })
    }

    cardTitleChangedHandler = (e) => {
        this.setState({ cardTitle: e.target.value });
    }

    render() {
        return (
            <div className="App">
                <NavBar
                    labTitle={this.state.labTitle}
                    cardTitle={this.state.cardTitle}
                    totalGems={this.state.totalGems}
                />

                <div className="learn-section">
                    <Navigation
                        cardTitles={this.state.cardTitles}
                        lastCardOpened={this.state.lastCardOpened}
                    />
                    <Content cardContent={this.state.cardContent} />
                    <HintSection />
                </div>

                <style jsx>{`
					.learn-section {
						display: flex;
				`}</style>

                {/* input for testing */}
                <input type='text' onChange={this.cardTitleChangedHandler} value={this.state.cardTitle} />
            </div>
        );
    }
}

export default Learning;