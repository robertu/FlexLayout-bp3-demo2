import React, { useState } from "react";
import { Menu, MenuItem, FocusStyleManager } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/table/lib/css/table.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";
import ExampleTabs from "./components/ExampleTabs";
import Form from "./components/Form";
import Table from "./components/Table";
import * as AppLayout from "flexlayout-react-bp3";


FocusStyleManager.onlyShowFocusOnTabs();


const App: React.FC = () => {
  const [component, setComponent] = useState<any>(null);


  const nodeCreator = (layout: any, name: string) => {
    setComponent({
      layout,
      name
    });
  }

  const customMenu = [
    {
      icon: "document",
      name: "Plik",
      menu: (
        <Menu>
          <MenuItem icon="key-tab" text="New window with tabs" onClick={() => nodeCreator(<ExampleTabs/>, "ExampleTabs")} />
          <MenuItem icon="form" text="New window with form" onClick={() => nodeCreator(<Form/>, "ExampleForm")} />
          <MenuItem icon="panel-table" text="New window with table" onClick={() => nodeCreator(<Table/>, "ExampleTable")} />
          <MenuItem icon="map" text="Mapa" onClick={() => nodeCreator(<Form/>, "Mapa")} />
        </Menu>
      )
    }
  ];

  const userMenu = {
    icon: "user",
    name: "Jan Kowalski",
    menu: (
      <Menu>
        <MenuItem icon="settings" text="Settings" />
        <MenuItem icon="person" text="Profile" />
        <MenuItem icon="log-out" text="Logout" />
      </Menu>
    )
  }

  const leftMenu = [
      <MenuItem key="settings" icon="settings" text="Settings" />,
      <MenuItem key="person" icon="person" text="Profile" />,
      <MenuItem key="log-out" icon="log-out" text="Logout" />,
  ]

  const startSettings = {
    global: {
      tabEnableClose: false,
      tabSetHeaderHeight: 31,
      tabSetTabStripHeight: 31,
      splitterSize: 6,
      tabEnableRename: false
    },
    borders: [
        {
          "type": "border",
          "location":"left",
          "size": 500,
          "children": [],
          "show": false,
          "className": "border_left"
        },
        {
          "type": "border",
          "location":"right",
          "size": 500,
          "children": [],
          "show": false,
          "className": "border_right"
        },
        {
          "type": "border",
          "location":"bottom",
          "size": 500,
          "children": [],
          "show": false,
          "className": "border_bottom"
        }
      ],
    layout: {
        "type": "row",
        "weight": 100,
        "children": [
          {
            "type": "tabset",
            "weight": 50,
            "selected": 0,
            "children": [
                {
                    "type": "tab",
                    "name": "Dojazd z Zakładowej na Targową",
                    "component": "dojazd",
                    "enableClose": true,
                    "id": "122",
                    "layout": <Table/>,
                }
            ]
          }
        ]
    }
  }

  return (
      <AppLayout
        title="Traco GPS"
        component={component}
        userMenu={userMenu}
        leftMenu={leftMenu}
        customMenu={customMenu}
        startSettings={startSettings}
      />
  );
}

export default App;

