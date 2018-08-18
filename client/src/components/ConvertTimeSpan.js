import React from 'react';
const dateFns = require('date-fns');

const ConvertTimeSpan = (date) => {
  // console.log(date.date)
  const newDate = new Date(date.date);
  const next = dateFns.addMinutes(newDate, 30);
  // console.log('newDate:', newDate)
  // console.log(dateFns.format(date))
  return (
    <div>
      {/* {dateFns.format(date)} */}
      {/* <h2>Convert</h2> */}
      {dateFns.format(newDate, 'hh:mm a')} - {dateFns.format(next, 'hh:mm a')}
    </div>
  );
}

export default ConvertTimeSpan;