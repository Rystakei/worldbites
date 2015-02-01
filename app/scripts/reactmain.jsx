var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Button = ReactBootstrap.Button;
var Grid = ReactBootstrap.Grid;
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;


var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

var wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

var buttonsInstance = (
    <div className="well" style={wellStyles}>
      <Button bsStyle="primary" bsSize="large" block>Block level button</Button>
      <Button bsSize="large" block>Block level button</Button>
    </div>
  );

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
    return (
      <ListGroup>
        {countries}
      </ListGroup>
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

React.render(<ListInstance countries={[{name:'Italy', abbr: 'it', checked: false}, {name: 'Canada', abbr: 'ca', checked: false}, {name: 'Kenya', abbr: 'ke', checked: true}]} />, document.getElementById('reactStuff'));