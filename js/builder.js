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

function extend(o1, o2, add_super) {
  var o3 = {};
  for (var i in o2) {
    o3[i] = o2[i];
  }
  for (var i in o1) {
    if (o3[i]) {
      if (add_super) {
        o3['super_'+i] = o1[i];
      }
    } else {
      o3[i] = o1[i];
    }
  }
  return o3;
}

var BaseFieldDef = {
  handleToggle: function(evt) {
    if (this.props.onChange) {
      this.props.onChange(this.props.name + "_check", evt.target.checked);
    }
  },
  renderCheckbox: function() {
    var input = this.renderInput(true);
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
  renderInput: function(disabled) {
    var value = this.props.form[this.props.name];
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
var TextFieldDef = extend(BaseFieldDef, {}, true);
var TextField = React.createClass(TextFieldDef);

var CheckboxMixin = (function(){
    var stateVar1 = "foo";

    return { // the mixin object, all functions here will be "mixed into" the component
        componentDidMount: function() { // will be called before your component's componentDidMount
            console.log(this.state); // outputs the components state
            console.log(stateVar1); // outputs the closure's stateVar1 variable
        }
    };
}());

var CheckboxTextFieldDef = extend(TextFieldDef, {
  renderInput: function() {
    var input = this.super_renderInput(true);
    return (
      <span>
        <input type="checkbox" onClick={this.handleToggle} />
        {input}
      </span>
    );
  }
}, true);
var CheckboxTextField = React.createClass(CheckboxTextFieldDef);



var Builder = React.createClass({
  getInitialState: function() {
    return {
      form: {
        net: "IU",
        sta: "*",
        loc: "",
        cha: "",
        starttime: ""
      },
      query: {}
    };
  },
  formToQuery: function(form) {
    var query = {};
    for (var key in form) {
      if (key.substr(-6) == '_check') {
      }
      else {
        var check = form[key + '_check'];
        if (check !== false) {
          query[key] = form[key]; 
        }
      }
    }
    console.log(form);
    console.log(query);
    return query;
  },
  handleFormChange: function(key, value) {
    console.log('Builder.handleChange: ' + key + ', ' + value);
    var partialState = {};
    partialState.form = extend(this.state.form, {});
    partialState.form[key] = value;
    partialState.query = this.formToQuery(partialState.form);
    this.setState(partialState);
  },
  render: function() {
    var common = {
      onChange: this.handleFormChange,
      form: this.state.form
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
      
        quary?net={this.state.query.net}&sta={this.state.query.sta}&loc={this.state.query.loc}&cha={this.state.query.cha}&starttime={this.state.query.starttime}
      </div>
    );
  }
});

ReactDOM.render(
  <Builder />,
  document.getElementById('builder')
);
