import React from 'react';
import styled from 'styled-components';
import greenIcon from '../../../assets/icons/green-exclamation.png';
import orangeIcon from '../../../assets/icons/orange-exclamation.png';

const WhiteCard = styled.div`
  display: flex;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  margin: 1em 1em;
  padding: 0.25em 1em;
  max-width: 600px;
`
const LeftColumn = styled.div`
  flex: 33%;
  margin: 2em 1em 1em 1em;
  padding: 0.25em 1em;
`
const RightColumn = styled.div`
  flex: 67%;
  margin: 2em 1em 1em 1em;
  padding: 0.25em 1em;
`
const Icon = styled.div`
  color: white;
  margin: 2em 1em 1em 1em;
  padding: 0.25em 1em;
`
const CardText = styled.h1`
  color: white;
  margin: 1em 1em;
  padding: 0.25em 1em;
`
const Button = styled.h1`
  color: white;
  margin: 1em 1em;
  padding: 0.25em 1em;
`
const HelpCard = (props) => {
    var text, icon, width='48', height='48';
    if (props.type === 'issue'){
      title = 'Raise an Issue';
      description = '...';
      btnText = 'Resume Activity';
      btnColor = 'green';
      icon = greenIcon;
    } else if (props.type === 'feedback') {
      title = 'Feedback';
      description = '...';
      btnText = 'Provide Feedback';
      btnColor = 'orange';
      icon = orangeIcon;
    } else {
      // Invalid style property, you should not be here.
    }

    return (
        <WhiteCard>
          <LeftColumn>
            <Icon>
              <img src={icon} alt="Icon" width={width} height={height}/>
            </Icon>
          </LeftColumn>
          <RightColumn>
            <h1>{title}</h1>
            <p>{description}</p>
            <Button />
          </RightColumn>
        </WhiteCard>
    )
}

export default HelpCard;
