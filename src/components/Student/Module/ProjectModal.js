import React, { useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { connect } from 'react-redux'

import DynamicModal from '../../shared/containers/DynamicModal'
import TwoPanel from '../../shared/containers/TwoPanel'
import DotRating from '../../shared/low/DotRating'
import Button from '../../shared/low/Button'
import ImgAndContent from '../../shared/low/ImgAndContent'
import { sizes } from '../../../styles/media'

import { chooseProjects } from '../../../redux/actions/studentData'
import withApiCache, { CACHE_ACTIVITY } from '../../HOC/WithApiCache'

const WacProject = withApiCache([CACHE_ACTIVITY])(
	({ wac_data: [project], setListView, setSelectedProject }) => {
		const { image, name, summary, time } = project ?? {}

		return (
			<ImgAndContent
				imgWidthEms="7"
				imgURL={image}
				title={name}
				description={summary}
				time={time}
				hover
				shadow
				onClick={() => {
					setListView(false)
					setSelectedProject(project)
				}}
			/>
		)
	}
)

const StyledTwoPanel = styled(TwoPanel)`
	font-size: 80%;
`

const LeftPanel = styled.div`
	margin: 0 auto;
	padding: 1.5em 2.5em 2.5em;
	background-color: ${props => props.theme.font};
	color: ${props => props.theme.fontInvert};
	height: 100%;
	display: flex;
	flex-direction: column;
`

const FullImg = styled.div`
	width: 100%;
	height: 100%;

	background: transparent url(${props => props.img});
	background-size: auto 100%;
	background-position: center;

	@media screen and (orientation: portrait) and (max-width: ${sizes.thone}px) {
		background-size: 100% auto;
	}

	@media screen and (orientation: landscape) and (max-height: 500px) {
		background-size: 100% auto;
	}
`

const Back = styled.p`
	cursor: pointer;
	display: inline-block;
	transition: ease color 0.15s;

	&:hover {
		color: #86c5ff;
	}
`

const SmallText = styled.div`
	font-size: 80%;
`

const Nbsp = styled.p`
	@media screen and (orientation: portrait) and (max-width: ${sizes.thone}px) {
		display: none;
	}
`

const FinalProject = ({
	open,
	closed,
	moduleId,
	projectIds,
	chosenProjectIds,

	onChooseProjects
}) => {
	const themeContext = useContext(ThemeContext)

	const [listView, setListView] = useState(true)
	const [selectedProject, setSelectedProject] = useState(null)

	const isChosenAlready = chosenProjectIds?.find(
		p => p.id === selectedProject?.id
	)

	const handleClickButton = () => {
		if (isChosenAlready) {
			onChooseProjects(
				moduleId,
				chosenProjectIds.filter(p => p.id !== selectedProject.id)
			)
		} else {
			onChooseProjects(
				moduleId,
				chosenProjectIds.concat([{ id: selectedProject.id }])
			)
		}
		closed()
	}

	/**
	 * LIST VIEW
	 */
	const choose = (
		<>
			<Nbsp>&nbsp;</Nbsp>
			<h2 style={{ marginBottom: 0 }}>Choose a Project</h2>
			<p>
				Choose a Project to practice your newfound knowledge in interactive,
				challenging projects.
			</p>
		</>
	)
	const projects = (
		<div style={{ padding: '1em', fontSize: '80%' }}>
			{projectIds?.map((project, index) => {
				return (
					<WacProject
						key={`learn-project-${index}`}
						id={project.id}
						setListView={setListView}
						setSelectedProject={setSelectedProject}
					/>
				)
			})}
		</div>
	)

	/**
	 * DESCRIPTION VIEW
	 */
	const description = (
		<>
			<Back onClick={() => setListView(true)}>&#8249; Back</Back>
			<h2 style={{ margin: 0 }}>{selectedProject?.name}</h2>
			<p style={{ marginBottom: '1em' }}>{selectedProject?.description}</p>
			<SmallText>difficulty</SmallText>
			<DotRating rating={3} offColor={themeContext.accentVariant} />
			{selectedProject?.time && (
				<SmallText style={{ marginTop: '1em' }}>estimated time</SmallText>
			)}
			<span style={{ fontWeight: 'bold' }}>{selectedProject?.time}</span>
			<div style={{ flexGrow: '1', display: 'flex', alignItems: 'flex-end' }}>
				<Button invert fullWidth onClick={handleClickButton}>
					{isChosenAlready ? 'Remove Project' : 'Choose Project'}
				</Button>
			</div>
		</>
	)
	const fullPic = <FullImg img={selectedProject?.image} />

	const leftPanel = <LeftPanel>{listView ? choose : description}</LeftPanel>
	const rightPanel = listView ? projects : fullPic

	return (
		<DynamicModal open={open} closed={closed} ratio={0.43}>
			<StyledTwoPanel fullSizeAxis first={leftPanel} second={rightPanel} />
		</DynamicModal>
	)
}

const mapDispatchToProps = dispatch => ({
	onChooseProjects: (moduleId, project) =>
		dispatch(chooseProjects(moduleId, project))
})

export default connect(null, mapDispatchToProps)(FinalProject)
