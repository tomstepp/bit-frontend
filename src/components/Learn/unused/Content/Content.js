import React, { Component } from 'react'
import styled from 'styled-components'

import ParsedContent from '../../../shared/ParsedContent'
import { getCard } from '../../../../services/ContentfulService'

import Button from '../../../shared/unused/Button'
import ConceptModal from '../Concept/ConceptModal'
import CheckpointModal from '../Checkpoint/CheckpointModal'

const ButtonSection = styled.div`
	text-align: right;
`
const ContentWrapper = styled.div`
	padding: 30px 30px 0 30px;
`

class Content extends Component {
	constructor(props) {
		super()
		this.state = {
			cardID: null,
			conceptID: props.conceptID,
			cardData: {}
		}
		this.switchCard = this.switchCard.bind(this)
	}

	componentDidUpdate(prevProps) {
		if (this.props.cardID !== prevProps.cardID) {
			this.switchCard(this.props.cardID)
			this.setState({
				conceptID: this.props.conceptID
			})
		}
	}

	switchCard(cardID) {
		getCard(cardID).then(data => {
			console.log(data.content)
			this.setState({
				cardData: data.content
			})
		})
	}

	render() {
		return (
			<ContentWrapper>
				<ParsedContent content={this.state.cardData} />

				<ButtonSection>
					{!this.props.firstCard ? (
						<Button
							buttonState="PrevCard"
							class_name="button"
							moveToPrev={this.props.click}
						/>
					) : null}
					{!this.props.lastCard ? (
						<Button
							buttonState="NextCard"
							class_name="button invert"
							moveToNext={this.props.click}
						/>
					) : (
						<Button buttonState="Submit" class_name="button invert" />
					)}
				</ButtonSection>

				{this.state.conceptID ? (
					<ConceptModal conceptID={this.state.conceptID} />
				) : null}

				<CheckpointModal />

				<style>{`
                    table {
                        font-family: arial, sans-serif;
                        border-collapse: collapse;
                        width: 100%;
                    }
                    td, th {
                        border: 1px solid #dddddd;
                        text-align: left;
                        padding: 12px;
                    }
                    tr:nth-child(even) {
                        background-color: #f5f5f5;
                    }
                    tr:nth-child(odd) {
                        background-color: white;
                    }
                    tr:hover {
                        // color: #555555;
                        background-color: #fff5ee;
                        cursor: pointer;
                    }
                `}</style>
			</ContentWrapper>
		)
	}
}

export default Content
