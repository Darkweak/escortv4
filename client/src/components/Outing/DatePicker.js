import React from 'react';
import {compose, withHandlers, withState} from 'recompose';
import DateTimePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export const DatePicker = compose(
  withState('date', 'setDate', new Date()),
  withHandlers({
    handleChange: ({setDate}) => value => setDate(value),
  }),
)(({date, name, handleChange}) => (
  <DateTimePicker
    selected={date}
    className={'form-control'}
    onChange={handleChange}
    showTimeSelect
    timeFormat="HH:mm"
    minDate={new Date()}
    name={name}
    showDisabledMonthNavigation
    dateFormat="dd/MM/YYYY HH:mm"/>
));
