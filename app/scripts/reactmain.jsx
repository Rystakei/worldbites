var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Button = ReactBootstrap.Button;
var Grid = ReactBootstrap.Grid;
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;

var ListInstance = React.createClass({

  getInitialState: function() {
    return {
      checked: {it: true, ca: true, ke: false}
    }
  },

  render: function() {
    var self = this; 
    var countries = this.props.countries.map(function(country, i){
      var countryIcon = "mg map-" + country.abbr;
      var checkType = self.state.checked[country.abbr] ? 'checked' : 'unchecked';
      var checkIcon = self.state.checked[country.abbr] ? "fa fa-check-square-o pull-right" : "fa fa-square-o pull-right";
      return (
        <ListGroupItem > <i className={countryIcon}></i> {country.name} <i className={checkIcon} onClick={self.handleClick.bind(this, country)}></i> </ListGroupItem>
      );
    });

    //generate countryCode colors;
    var self = this;
    var countryColors = {};
    this.props.countries.map(function(country){
      var countryCode = country.abbr;
      var statusColor = self.state.checked[countryCode] ? "#A5D6A7" : "white";
      var updatedCountry = {}
      var countryCode = country.abbr.toUpperCase();
      var result = countryColors[countryCode] = statusColor;
    });


    return (
      <div className="worldContainer">
        <div id="map">
          <WorldMap countries={this.props.countries} checkedCountries={this.state.checked} countryColors={countryColors}/>
        </div>
        <ListGroup>
          {countries}
        </ListGroup>
      </div>
    );
  },

  handleClick: function(country) {
      var checked = this.state.checked;
      if (!checked[country.abbr]){
        checked[country.abbr] = true;
        this.setState({checked: checked});        
      }
      else{
        checked[country.abbr] = false;
        this.setState({checked: checked});
      }
  }

});

var WorldMap = React.createClass({
  componentDidMount: function() {
    // console.log(this.getDOMNode()); 
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

React.render(<ListInstance countries={[{name:'Italy', abbr: 'it', checked: false}, {name: 'Canada', abbr: 'ca', checked: false}, {name: 'Kenya', abbr: 'ke', checked: true}]} />, document.getElementById('reactStuff'));