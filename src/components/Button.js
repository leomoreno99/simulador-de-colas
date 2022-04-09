import React from 'react'
import styled from "styled-components";

const ButtonStyle = styled.div`
    button {
        padding: 12px 60px;
        background-color: #3f51b5;
        color: white;
        border: none;
        border-radius: 5px;
        font-weight: normal;
        font-size: 15px;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }
    button:hover {
        background-color: #5168E8;
    }
    button:active {
        background-color: #252F69;
    }
`;

export default function Button({text, onClick}) {
  return (
    <ButtonStyle>
        <button onClick={onClick} >{text}</button>
    </ButtonStyle>
  )
}
