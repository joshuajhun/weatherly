import React from 'react';
import Jquery from 'jquery';

const InputField = React.createClass({
  getInitialState: function () {
    return {
      location: "",
      weather: []
    };
  },

  getWeatherByLocation: function() {
    var thisState = this.state.location.toLowerCase();
    var spacesFree = thisState.replace(" ", '-')
    let apiUrl = 'http://weatherly-api.herokuapp.com/api/weather/' + spacesFree

    $.get(apiUrl, function(response) {
      this.setState({
        weather:response
      })
    }.bind(this))
  },

  handleClick: function() {
    this.getWeatherByLocation()
  },

  updateLocation: function(e) {
    this.setState({location: e.target.value})
  },

  render: function() {
    let weather = this.state.weather;

    return (
      <section className="Weather">
        <div>
          <input type="text"
                className="WeatherInput"
                value={this.state.location}
                onChange={this.updateLocation}
                />
        <input type="submit" onClick={(e) => this.handleClick(e)}/>
        </div>

        <div>
        <ul>
          {weather.map(dailyForecast => {
            return <li key={dailyForecast.date}>{dailyForecast.location} {dailyForecast.date} {dailyForecast.weatherType.type}</li>
          })
        }
        </ul>
        </div>
      </section>
    );

  }
});

module.exports = InputField;
//iterate through this.state.weather objects to pull out date, location, weather
