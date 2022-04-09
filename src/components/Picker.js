import React, { Fragment, useState } from "react";
import { TimePicker } from "@material-ui/pickers";
import { format } from "date-fns";
import styled from "styled-components";

const PickerStyle = styled.div`
  margin-right: 30px;
  label {
      font-size: 20px;
      width: max-content;
      color: #3f51b5;
  }
`;

const Picker = ({ getSeconds, name, formatTime = "HH:mm:ss" }) => {
  const [selectedDate, handleDateChange] = useState(new Date());

  const convertToSecond = (string) => {
    const date = string.split(":");
    const hours = Number(date[0] * 60 * 60);
    const minutes = Number(date[1] * 60);
    const seconds = Number(date[2]);
    return hours + minutes + seconds;
  };

  const secondsToNumber = (string) => {
    const date = string.split(":");
    return Number(date[2]);
  };

  const formato = format(selectedDate, "HH:mm:ss");
  let views = ["hours", "minutes", "seconds"];
  let openTo = "hours";
  if (formatTime === "ss") {
    views = ["seconds"];
    openTo = "seconds";
    getSeconds(secondsToNumber(formato));
  } else {
    getSeconds(convertToSecond(formato));
  }

  return (
    <PickerStyle>
      <Fragment>
        <TimePicker
          ampm={false}
          openTo={openTo}
          views={views}
          format={formatTime}
          label={name}
          value={selectedDate}
          onChange={handleDateChange}
        />
      </Fragment>
    </PickerStyle>
  );
};

export default Picker;
