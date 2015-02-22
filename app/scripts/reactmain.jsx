var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Multiselect = require('react-bootstrap-multiselect');
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Button = ReactBootstrap.Button;
var Grid = ReactBootstrap.Grid;
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;

var ListInstance = React.createClass({

  getInitialState: function() {
    return {
    countries: {},
    filteredCountries: {},
    checked: {}
    }
  },

  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      type: "GET",
      crossDomain: true,
      dataType: 'JSON',
      success: function(data) {
        this.setState({countries: data, filteredCountries:data});

        var checked = {};
        $.each(data, function(i,country){
            if (country.checked === true) {
                var countryCode = country.code;
                checked[countryCode]=true;
            }
        });
       this.setState({checked: checked});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    var self = this; 
    var countries = [];
    var countryColors = {};

    $.each(this.state.filteredCountries, function(i, country) {
        console.log(country.region);
        var countryCode = country.code;
        var countryCodeLC = country.code.toLowerCase();
        var countryName = country.name;
        var demonym = country.demonym;
        var countryIcon = "mg map-" + countryCodeLC;
        var checkType = self.state.checked[countryCode] ? 'checked' : 'unchecked';
        var checkIcon = self.state.checked[countryCode] ? "fa fa-check-square-o pull-right" : "fa fa-square-o pull-right";
        var countryStats = <div className="country-stats"> <p><b>30</b> {demonym} restaurants near <a href="#"><b>02143</b></a></p></div>;
        var wikiPage = <div className="wiki-page"><a href="#"> Learn about {demonym} cuisine on Wikipedia </a></div>;
        var listItem = <ListGroupItem className="country-item"> <i className={countryIcon}></i> {countryName} <i className={checkIcon} onClick={self.handleClick.bind(this, countryCode.toUpperCase())}></i> {countryStats} {wikiPage} </ListGroupItem>;

        countries.push(listItem);

        var statusColor = self.state.checked[country.code] ? "#A5D6A7" : "white";
        var result = countryColors[country.code] = statusColor;

    });

    return (
      <div className="worldContainer">
        <div id="map">
          <WorldMap countries={this.props.countries} checkedCountries={this.state.checked} countryColors={countryColors}/>
        </div>
        <div className="total-countries">
            <p> You have tried food from <b>{Object.keys(self.state.checked).length} / {Object.keys(self.state.countries).length}</b> countries. </p>
        </div>
        <h2> Find Restaurants </h2>
        <label> Your location  </label>
        <input className="form-control" type="text" placeholder="Somerville, MA"></input>
        <label> Filter by continent</label>
        <div className="select-container">
            <BootstrapSelect onChange={this.filterList} className="continent-filter">
            </BootstrapSelect>
        </div>
        <div className="country-filter">
            <label> Filter by country</label>
            <input className="form-control" type="text" placeholder="Algeria"></input>
        </div>
        <div className="filtered-countries">
            <ListGroup>
              {countries}
            </ListGroup>
        </div>
      </div>
    );
  },

filterList: function(region) {
    var filteredCountries;
    
    if (region === 'All') {
        filteredCountries = this.state.countries;
    }
    else {
        filteredCountries = this.state.countries.filter(function(country,i){
            return country.region === region;
        });
    }
    
    this.setState({
        filteredCountries: filteredCountries,
    });
},

  handleClick: function(abbr) {
      var checked = this.state.checked;
      if (!checked[abbr]){
        checked[abbr] = true;
        this.setState({checked: checked});  
      }
      else{
        delete checked[abbr];
        this.setState({checked: checked});
      }
  }

});

var BootstrapSelect = React.createClass({
    componentDidMount: function() {
        var bSelect = this.refs.select;
        $(bSelect.getDOMNode()).selectpicker();
        $(bSelect.getDOMNode()).change(function() {
         var value = $(this.refs.select.getDOMNode()).val();
         this.props.onChange(value);
        }.bind(this));
    },
    render: function() {
        var regions = {
                        ar: 'All',
                        af: 'Africa',
                        as: 'Asia',
                        eu:'Europe',
                        na: 'Americas',
                        oc: 'Oceania' 
                       };

        var options = [];

        $.each(regions, function(key, value) {
            var continentIcon = "mg map-glb-" + key;
            var option = <option value={value} data-icon={continentIcon}>{value}</option>
            options.push(option);
        });

        return (
            <select ref="select" className="select-picker">
                {options}
            </select>
        );
    }
});

var WorldMap = React.createClass({
  componentDidMount: function() {
    this.worldMap = new jvm.Map({
      map: 'world_mill_en',
      backgroundColor: "#0288D1",
      container: $(this.getDOMNode()),
      series: {
        regions: [{
          attribute: 'fill'
        }]
      }
    });
    this.worldMap.series.regions[0].setValues(this.props.countryColors);

  },

  componentDidUpdate: function() {
    this.worldMap.series.regions[0].setValues(this.props.countryColors);
  },

  render: function() {
    return (
      <div className="map-container">
      </div>
    );
  }
});

React.render(<ListInstance url={"http://localhost:3000/countries.json"} countries={[{name:'Italy', abbr: 'it', checked: false}, {name: 'Canada', abbr: 'ca', checked: false}, {name: 'Kenya', abbr: 'ke', checked: true}]} />, document.getElementById('myApp'));

exports.React = window.React = React;
