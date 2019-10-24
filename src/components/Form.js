import React, { Component } from "react";
import { FormGroup, InputGroup, Intent, ControlGroup, Button, Icon, Checkbox, Alignment, RadioGroup, Radio } from "@blueprintjs/core";
import { handleStringChange } from "@blueprintjs/docs-theme";
import "@blueprintjs/core/lib/less/variables.less";
import { IconNames } from "@blueprintjs/icons";

class Form extends Component {
  state = {
    isEnabled: true,

  }

  handleEnabledChange = () => {
    this.setState(prevState => ({ isEnabled: !prevState.isEnabled }));
  }

  handleRadioChange = handleStringChange(value => this.setState({ value }));

  render() {
    return (
      <div className="form-container example-window" style={{}}>
        <div className="form-row">
          <FormGroup
            className="fg"
            style={{flex: 2}}
            helperText="tekst pomocniczy..."
            label="Etykieta A"
            labelFor="text-input"
            labelInfo="(wymagane)">
            <InputGroup intent={Intent.SUCCESS} id="text-input" placeholder="Placeholder text" />
          </FormGroup>
          <FormGroup 
            className="fg"
            style={{flex: 3}}
            helperText="tekst pomocniczy..."
            label="Etykieta B"
            labelFor="text-input"
            labelInfo="(wymagane)">
            <InputGroup intent={Intent.WARNING} id="text-input" placeholder="Placeholder text" />
          </FormGroup>
          <FormGroup 
            className="fg"
            style={{flex: 5}}
            helperText="tekst pomocniczy..."
            label="Etykieta C"
            labelFor="text-input"
            labelInfo="(wymagane)">
            <InputGroup intent={Intent.DANGER} id="text-input" placeholder="Placeholder text" />
          </FormGroup>
        </div>

        <div className="form-row">
          <ControlGroup fill={true} vertical={false} style={{flex: 1}}>
              <Button icon="filter">Filtruj</Button>
              <InputGroup placeholder="Find filters..." />
          </ControlGroup>

          <ControlGroup fill={true} vertical={false} style={{flex: 1}}>
            <Button intent={Intent.PRIMARY} icon="confirm">Ok</Button>
            <InputGroup placeholder="Find filters..." />
            <div className="bp3-select">
              <select defaultValue="0">
                <option value="0">Filter...</option>
                <option value="1">Issues</option>
                <option value="2">Requests</option>
                <option value="3">Projects</option>
              </select>
            </div>
          </ControlGroup>

          <ControlGroup fill={true} vertical={false} style={{flex: 1}}>
            <div className="bp3-input-group">
              <span className="bp3-icon bp3-icon-people"></span>
              <input type="text" className="bp3-input" placeholder="Find collaborators..." style={{paddingRight: "94px"}} />
              <div className="bp3-input-action">
                <button className="bp3-button bp3-minimal bp3-intent-primary">
                  can view<span className="bp3-icon-standard bp3-icon-caret-down bp3-align-right"></span>
                </button>
              </div>
            </div>
          </ControlGroup>

          <ControlGroup fill={true} vertical={false} style={{flex: 1}}>
              <Button icon="add">Dodaj</Button>
              <InputGroup placeholder="Find filters..." />
          </ControlGroup>
        </div>

        <div className="form-row" style={{marginTop: "1rem"}}>
            <Checkbox style={{marginRight: ".7rem"}} checked={this.state.isEnabled} onChange={this.handleEnabledChange} alignIndicator={Alignment.LEFT}>
                <Icon icon="user" style={{marginRight: ".3rem"}}/>
                Użytkownik <strong>1</strong>
            </Checkbox>

            <Checkbox style={{marginRight: ".7rem"}} checked={this.state.isEnabled} onChange={this.handleEnabledChange} alignIndicator={Alignment.LEFT}>
                <Icon icon="user" style={{marginRight: ".3rem"}}/>
                Użytkownik <strong>2</strong>
            </Checkbox>

            <Checkbox style={{marginRight: ".7rem"}} checked={this.state.isEnabled} onChange={this.handleEnabledChange} alignIndicator={Alignment.LEFT}>
                <Icon icon="user" style={{marginRight: ".3rem"}}/>
                Użytkownik <strong>3</strong>
            </Checkbox>
        </div>
      </div>
    );
  }
}

export default Form;
