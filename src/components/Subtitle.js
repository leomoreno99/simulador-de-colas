import styled from "styled-components";
import React from 'react'

const SubtitleStyle = styled.div`
    h2 {
        font-size: 15px;
        font-weight:normal;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;;
        color: #3f51b5;
        margin: 0;
    }

`;

export const Subtitle = ({text}) => {
  return (
      <SubtitleStyle>
          <h2>{text}</h2>
      </SubtitleStyle>
  )
}
