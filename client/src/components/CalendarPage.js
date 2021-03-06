import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dateFns from 'date-fns';

class CalendarPage extends Component {
  constructor() {
    super();
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date()
    }
    this.renderHeader = this.renderHeader.bind(this);
    this.renderDays = this.renderDays.bind(this);
    this.renderCells = this.renderCells.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
  }

  previousMonth() {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, -1)
    })
  }

  nextMonth() {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    })
  }

  renderHeader() {
    const { currentMonth } = this.state;
    const { previousMonth, nextMonth } = this;
    const dateFormat = 'MMMM YYYY';
    return (
      <div className='row' style={styles.header}>
        <div className='col' onClick={previousMonth}>
          <button className='btn btn-info'>Previous Month</button>
        </div>
        <div className='col'>
          <h3>{dateFns.format(currentMonth, dateFormat)} WINTER QUARTER</h3>
        </div>
        <div className='col' onClick={nextMonth}>
          <button className='btn btn-info'>Next Month</button>
        </div>
      </div>
    );
  }

  renderDays() {
    const days = [0, 1, 2, 3, 4, 5, 6];
    const startDate = dateFns.startOfWeek(this.state.currentMonth);

    return (
      <div className='row' style={styles.dayRow}>
        {
          days.map((day, index) => {
            return (
              <div className='col' key={index} style={styles.days}>
                {dateFns.format(dateFns.addDays(startDate, index), 'dddd')}
              </div>
            )
          })
        }
      </div>
    )
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = 'D';
    const rows = [];

    let days = [];
    let day = startDate
    let formattedDate = '';

    // console.log('day', dateFns.format(day, 'YYYY-MM-DD'))

    while(day <= endDate) {
      for(let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        // const dayOfWeek = dateFns.format(cloneDay, 'dddd');
        const today = dateFns.format(new Date(), 'dddd, MMMM D YYYY');
        const eachDay = dateFns.format(cloneDay, 'dddd, MMMM D YYYY');
        days.push(
          <Link
            to={`/calendar/${day}`}
            // to={`/calendar/${dateFns.format(day, 'YYYY-MM-DD')}`}
            key={day}
            className='col'
            style={
              i === 0 || i === 6 ? (
                today === eachDay ? (
                  Object.assign({}, styles.dayBoxWeekend, styles.today )
                ) : styles.dayBoxWeekend
              ) : (
                today === eachDay ? (
                  Object.assign({}, styles.dayBoxWeekday, styles.today )
                ) : styles.dayBoxWeekday
              )
            }
          >
            <span
              style={
                dateFns.format(cloneDay, 'MMMM') === dateFns.format(currentMonth, 'MMMM') ? (
                  styles.dateNumberCurrMonth
                ) : (
                  styles.dateNumberOtherMonth
                )
              }
            >
              {formattedDate}
            </span>
          {/* </div> */}
          </Link>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className='row' key={day}>
          {days}
        </div>
      )
      days = [];
    }
    return <div>{rows}</div>

  }

  render() {
    return(
      <div>
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default CalendarPage;

const styles = {
  header: {
    textAlign: 'center',
    marginTop: '20px' 
  },
  days: {
    textAlign: 'center'
  },
  dayRow: {
    margin: '10px'
  },
  today: {
    border: '5px solid blue'
  },
  dayBoxWeekday: {
    margin: '10 10 0 10',
    borderRadius: '10px',
    height: '100px',
    backgroundColor: 'rgb(210, 210, 210)'
  },
  dayBoxWeekend: {
    margin: '10 10 0 10',
    borderRadius: '10px',
    height: '100px',
    backgroundColor: 'rgb(255, 199, 0)'
  },
  dateNumberCurrMonth: {
    textAlign: 'center',
    fontSize: '50px',
    color: 'black'
  },
  dateNumberOtherMonth: {
    fontSize: '50px',
    color: 'white'
  }
}