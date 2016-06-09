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

/* Simple extend function
 * This extends objects, not classes, because they go into React.createClass, which actually makes things simple.
 * Anything "overridden" is copied into super_xxx, eg. obj.foo() / obj.super_foo()
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
    console.log('BaseFieldDef.handleChange');
    if (this.props.onChange) {
      this.props.onChange(this.props.name, evt.target.value);
    }
  },
  renderInput: function(disabled) {
    var value = this.props.form[this.props.name];
    return (
      <input type="text" name={this.props.name} value={value} onChange={this.handleChange} />
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

var CheckboxMixin = {
    renderInput: function() {
        var input = this.super_renderInput(true);
        return (
          <span>
            <input type="checkbox" onClick={this.handleToggle} />
            {input}
          </span>
        );
    },
    componentDidMount: function() { // will be called before your component's componentDidMount
        console.log(this.state); // outputs the components state
        console.log(stateVar1); // outputs the closure's stateVar1 variable
    }
};

var CheckboxTextField = React.createClass(
    extend(TextFieldDef, CheckboxMixin, true)
);


var Builder = React.createClass({
  getInitialState: function() {
    return {
      form: {
        net: "IU",
        sta: "*",
        loc: "",
        cha: "",
        starttime: "2015-01-01",
        starttime_check: false
      },
      query: {},
      queryKeys: [],
      queryString: ""
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
    return query;
  },
  queryString: function(query) {
      var queryKeys = null;
      if (!queryKeys) {
          queryKeys = ['net'];
          for (var k in query) { queryKeys.push(k); }
      }
      console.log('query:', query);
      console.log('queryKeys: ', queryKeys);
      var queryParams = [];
      queryKeys.forEach(function(k) {
          if (query[k] !== undefined && query[k] !== '') {
              queryParams.push('' + k + '=' + escape(query[k]));
          }
      });
      return queryParams.join('&');
  },
  handleFormChange: function(key, value) {
    console.log('Builder.handleChange: ' + key + ', ' + value);
    var partialState = {};
    partialState.form = extend(this.state.form, {});
    if (key) {
        partialState.form[key] = value;
    }
    partialState.query = this.formToQuery(partialState.form);
    partialState.queryString = this.queryString(partialState.query);
    console.log(partialState);
    this.setState(partialState);
  },
  componentDidMount: function() {
    this.handleFormChange();
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

        <TextField checkbox="true" name="starttime" label="Start Time" value="2015-01-01" {...common} />

        query?{this.state.queryString}
      </div>
    );
  }
});

ReactDOM.render(
  <Builder />,
  document.getElementById('builder')
);
