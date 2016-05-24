/*
var TextInput = React.createClass({
  handleChange: function(evt) {
    console.log('TextInput.handleChange');
    if (this.props.onChange) {
      this.props.onChange(this.props.name, evt.target.value);
    }
  },
  render: function() {
    var value = this.props.query[this.props.name];
    return (
      <input type="text" value={value} onChange={this.handleChange} />
    );
  }
});

var ToggleTextInput = React.createClass({
  handleToggle: function(evt) {
    if (this.props.onChange) {
      if (evt.target.checked) {
        this.props.onChange(this.props.name, this.props.value);
      }
    }
  },
  render: function() {
    return (
      <span>
        <input type="checkbox" onClick={this.handleToggle} />
        <TextInput {...this.props} />
      <span>
    );
  }
});
*/

var BaseFieldDef = {
  handleToggle: function(evt) {
    if (evt.target.checked) {
      console.log("checked");
    } else {
      if (this.props.onChange) {
        this.props.onChange(this.props.name, "");
      }
    }
  },
  renderCheckbox: function() {
    var input = this.renderInput();
    return (
      <span>
        <input type="checkbox" onClick={this.handleToggle} />
        {input}
      </span>
    );
  },
  handleChange: function(evt) {
    console.log('TextField.handleChange');
    if (this.props.onChange) {
      this.props.onChange(this.props.name, evt.target.value);
    }
  },
  renderInput: function() {
    var value = this.props.query[this.props.name];
    return (
      <input type="text" value={value} onChange={this.handleChange} />
    );
  },
  render: function() {
    var input = this.props.checkbox ? this.renderCheckbox() : this.renderInput();
    return (
      <div>
        <label>{this.props.label}</label>
        {input}
      </div>
    );
  }
};

var TextField = React.createClass(BaseFieldDef);

var Builder = React.createClass({
  getInitialState: function() {
    return {
      net: "IU",
      sta: "*",
      loc: "",
      cha: "",
      starttime: ""
    };
  },
  handleChange: function(key, value) {
    console.log('Builder.handleChange: ' + key + ', ' + value);
    var partialState = {};
    partialState[key] = value;
    this.setState(partialState);
  },
  render: function() {
    var common = {
      onChange: this.handleChange,
      query: this.state
    };
    var rows = [
      ['Network', (<TextField name="net" label="Network" {...common} />)],
    ];
    return (
      <div>
        {rows}
        <TextField name="sta" label="Station" {...common} />
        <TextField name="loc" label="Location" {...common} />
        <TextField name="cha" label="Channel" {...common} />
        
        <TextField checkbox="true" name="starttime" label="Start Time" {...common} />
      
        quary?net={this.state.net}&sta={this.state.sta}&loc={this.state.loc}&cha={this.state.cha}&starttime={this.state.starttime}
      </div>
    );
  }
});

ReactDOM.render(
  <Builder />,
  document.getElementById('builder')
);
