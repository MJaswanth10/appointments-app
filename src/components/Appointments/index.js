// Write your code here
import {Component} from 'react'
import {v4 as uuid4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentList: [],
    isFilterActive: false,
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {title, date} = this.state
    if (title === '' || date === '') {
      return
    }
    const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: uuid4(),
      title,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onClickFilter = () => {
    this.setState(prevState => ({
      isFilterActive: !prevState.isFilterActive,
    }))
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  render() {
    const {title, date, appointmentList, isFilterActive} = this.state

    const filteredList = isFilterActive
      ? appointmentList.filter(eachItem => eachItem.isStarred)
      : appointmentList
    const filterClassName = isFilterActive ? 'active-button' : ''

    return (
      <div className="app-container">
        <div className="appointment-container">
          <div className="input-section">
            <form className="form" onSubmit={this.onAddAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                id="title"
                type="text"
                value={title}
                placeholder="Title"
                className="input"
                onChange={this.onChangeTitle}
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                id="date"
                type="date"
                value={date}
                placeholder="dd/mm/yyyy"
                className="input"
                onChange={this.onChangeDate}
              />
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-image"
            />
          </div>
          <hr className="line" />
          <div className="appointment-section">
            <h1 className="title">Appointments</h1>
            <button
              type="button"
              className={`filter-button ${filterClassName}`}
              onClick={this.onClickFilter}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list">
            {filteredList.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                appointmentDetails={eachItem}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
