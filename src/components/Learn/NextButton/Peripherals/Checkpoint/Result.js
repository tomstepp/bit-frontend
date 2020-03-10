import React from 'react'
import styled from 'styled-components'

const LeftPanel = styled.div`
	padding: 2em;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	text-align: center;
	position: relative;
`

export const ResultLeftPanel = ({}) => {
	return <LeftPanel></LeftPanel>
}

const TestLineContainer = styled.div`
	margin: 1em 0;
	font-size: 80%;
`

const PassFail = styled.div`
	width: 4.5em;
	border-radius: 0.6em;

	background-color: ${props => (props.pass ? '#95FF7088' : '#f002')};
	color: ${props => (props.pass ? '#1C6A00' : '#C70000')};
	text-align: center;
`

const BlackTextArea = styled.pre`
	padding: 1em;
	width: 100%;
	background-color: black;
	color: white;
	min-height: 6em;
`

const TestLine = ({ pass, details = {} }) => (
	<TestLineContainer>
		<div style={{ display: 'flex' }}>
			<div style={{ flex: 1 }}>
				<h4>{details.name}</h4>
			</div>
			<PassFail pass={pass}>{pass ? 'Passed' : 'Failed'}</PassFail>
		</div>
		{!pass && (
			<div style={{ margin: '1em 0' }}>
				<hr />
				<h4>Expected Output</h4>
				<BlackTextArea className="code">{details.expected}</BlackTextArea>
				<h4>Your Output</h4>
				<BlackTextArea className="code">{details.output}</BlackTextArea>
				<hr />
			</div>
		)}
	</TestLineContainer>
)

const RightPanelContainer = styled.div``

export const AutograderRightPanel = ({}) => {
	return (
		<>
			<TestLine
				details={{
					name: 'TODO',
					output: ['>>> from thing import *', '>>> mult_add(3, 4)', '12']
				}}
				pass
			/>
			<TestLine
				details={{
					expected: '12\n',
					name: 'TODO',
					output: '7\n'
				}}
				pass={false}
			/>
		</>
	)
}
