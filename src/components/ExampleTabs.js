/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as React from "react";

import {
  Alignment,
  Classes,
  H3,
  H5,
  InputGroup,
  Navbar,
  Switch,
  Tab,
  Tabs
} from "@blueprintjs/core";
import { Example, handleBooleanChange } from "@blueprintjs/docs-theme";

export default class ExampleTabs extends React.PureComponent {
  state = {
    activePanelOnly: false,
    animate: true,
    navbarTabId: "Home",
    vertical: false
  };

  toggleActiveOnly = handleBooleanChange(activePanelOnly =>
    this.setState({ activePanelOnly })
  );
  toggleAnimate = handleBooleanChange(animate => this.setState({ animate }));
  toggleVertical = handleBooleanChange(vertical => this.setState({ vertical }));

  render() {
    const options = (
      <>
        <H5>Props</H5>
        <Switch
          checked={this.state.animate}
          label="Animate indicator"
          onChange={this.toggleAnimate}
        />
        <Switch
          checked={this.state.vertical}
          label="Use vertical tabs"
          onChange={this.toggleVertical}
        />
        <Switch
          checked={this.state.activePanelOnly}
          label="Render active tab panel only"
          onChange={this.toggleActiveOnly}
        />
      </>
    );

    return (
      <Example className="docs-tabs-example" options={options} {...this.props}>

        {/* uncontrolled mode & each Tab has a panel: */}
        <Tabs
          animate={this.state.animate}
          id="TabsExample"
          key={this.state.vertical ? "vertical" : "horizontal"}
          renderActiveTabPanelOnly={this.state.activePanelOnly}
          vertical={this.state.vertical}
        >
          <Tab id="rx" title="React" panel={<ReactPanel />} />
          <Tab id="ng" title="Angular" panel={<AngularPanel />} />
          <Tab
            id="mb"
            title="Ember"
            panel={<EmberPanel />}
            panelClassName="ember-panel"
          />
          <Tab
            id="bb"
            disabled={true}
            title="Backbone"
            panel={<BackbonePanel />}
          />
          <Tabs.Expander />
          <InputGroup
            className={Classes.FILL}
            type="text"
            placeholder="Search..."
          />
        </Tabs>
      </Example>
    );
  }

  handleNavbarTabChange = navbarTabId => this.setState({ navbarTabId });
}

const ReactPanel = () => (
  <div>
    <H3>Example panel: React</H3>
    <p className={Classes.RUNNING_TEXT}>
      Lots of people use React as the V in MVC. Since React makes no assumptions
      about the rest of your technology stack, it's easy to try it out on a
      small feature in an existing project.
    </p>
  </div>
);

const AngularPanel = () => (
  <div>
    <H3>Example panel: Angular</H3>
    <p className={Classes.RUNNING_TEXT}>
      HTML is great for declaring static documents, but it falters when we try
      to use it for declaring dynamic views in web-applications. AngularJS lets
      you extend HTML vocabulary for your application. The resulting environment
      is extraordinarily expressive, readable, and quick to develop.
    </p>
  </div>
);

const EmberPanel = () => (
  <div>
    <H3>Example panel: Ember</H3>
    <p className={Classes.RUNNING_TEXT}>
      Ember.js is an open-source JavaScript application framework, based on the
      model-view-controller (MVC) pattern. It allows developers to create
      scalable single-page web applications by incorporating common idioms and
      best practices into the framework. What is your favorite JS framework?
    </p>
    <input className={Classes.INPUT} type="text" />
  </div>
);

const BackbonePanel = () => (
  <div>
    <H3>Backbone</H3>
  </div>
);
