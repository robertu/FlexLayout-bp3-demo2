import * as React from "react";
import AppHeader from "./AppHeader";
import Model from "./model/Model";
import FlexLayout from "./view/FlexLayout";

export interface ILayoutProps {
  startSettings: any;
  menuLogo: any;
  customMenu: any;
  leftMenu: any;
  component: any;
  title: string;
  userMenu: any;
}

const Layout = ({startSettings, menuLogo, customMenu, leftMenu, title, component, userMenu}: ILayoutProps) => {
  const [layoutComponents, setLayoutComponents] = React.useState<any>(startSettings);
  const [model, setModel] = React.useState<any>(Model.fromJson(startSettings));
  const [layoutStyle, setLayoutStyle] = React.useState<any>({left: "6px,", right: "6px", bottom: "6px"});
  const [lightTheme, setLightTheme] = React.useState<boolean>(true);

  const themeSwitch = () => {
    if (lightTheme) {
      document.body.classList.add("bp3-dark");
    } else {
      document.body.classList.remove("bp3-dark");
    }
    setLightTheme(!lightTheme);
  };

  React.useEffect(() => {
    if (component !== null) {
      nodeCreator(component.name, component.layout);
    }
  }, [component]);

  const toolbarSettings = (location: string): void => {
    const newLayoutComponents = layoutComponents;
    newLayoutComponents.borders = newLayoutComponents.borders.map((border: any) => {
      if (border.location === location) {
        border.show = border.show === undefined ? false : !border.show;
        setLayoutStyle({...layoutStyle, [location]: border.show ? "0px" : "6px"});
      }
      return border;
    });
    setLayoutComponents(newLayoutComponents);
    setModel(Model.fromJson(newLayoutComponents));
  };

  const factory = (node: any) => {
    if (node.getLayout()) {
      return node.getLayout();
    }
    return null;
  };

  const actionModel = (node: any): void => {
    setLayoutComponents(node.toJson());
  };

  const nodeCreator = (componentName: string, componentContent: any): void => {
    let maximized: boolean = false;
    const newLayoutComponents: any = layoutComponents;
    const newId: string = String(Date.now());
    if (newLayoutComponents.layout.children.length === 0) {
      newLayoutComponents.layout.children.push({
        type: "tabset",
        weight: 50,
        selected: 0,
        children: [
          {
            type: "tab",
            name: componentName,
            component: componentName,
            enableClose: true,
            id: newId,
            layout: componentContent
          }
        ]
      });
    } else {
      newLayoutComponents.layout.children.forEach((child: any, index: number) => {
        if (child.maximized === true) {
          maximized = true;
          newLayoutComponents.layout.children[index].selected =
            newLayoutComponents.layout.children[index].children !== undefined ? newLayoutComponents.layout.children[index].children.length : 0;
          newLayoutComponents.layout.children[index].children.push({
            type: "tab",
            name: componentName,
            component: componentName,
            enableClose: true,
            id: newId,
            layout: componentContent
          });
        }
      });
      if (!maximized) {
        if (newLayoutComponents.layout.children[0].children[0] !== undefined && newLayoutComponents.layout.children[0].children[0].children !== undefined) {
          newLayoutComponents.layout.children[0].children[0].selected =
            newLayoutComponents.layout.children[0].children[0].children !== undefined ? newLayoutComponents.layout.children[0].children[0].children.length : 0;
          newLayoutComponents.layout.children[0].children[0].children.push({
            type: "tab",
            name: componentName,
            component: componentName,
            enableClose: true,
            id: newId,
            layout: componentContent
          });
        } else {
          newLayoutComponents.layout.children[0].selected =
            newLayoutComponents.layout.children[0].children !== undefined ? newLayoutComponents.layout.children[0].children.length : 0;
          newLayoutComponents.layout.children[0].children.push({
            type: "tab",
            name: componentName,
            component: componentName,
            enableClose: true,
            id: newId,
            layout: componentContent
          });
        }
      }
    }
    setLayoutComponents(newLayoutComponents);
    setModel(Model.fromJson(newLayoutComponents));
  };

  return (
    <div className={"App"}>
      <AppHeader
          customMenu={customMenu}
          leftMenu={leftMenu}
          menuLogo={menuLogo}
          layoutComponents={layoutComponents}
          lightTheme={lightTheme}
          toolbarSettings={toolbarSettings}
          themeSwitch={themeSwitch}
          title={title}
          userMenu={userMenu}
      />
      {/* <Layout model={model} factory={factory} onModelChange={actionModel}  /> */}
      <FlexLayout style={layoutStyle} model={model} factory={factory} onModelChange={actionModel} />
    </div>
  );
};

Layout.defaultProps = {
  menuLogo: null,
  customMenu: null,
  leftMenu: null,
  userMenu: null,
  startSettings: {
    global: {
      tabEnableClose: false,
      tabSetHeaderHeight: 31,
      tabSetTabStripHeight: 31,
      splitterSize: 6,
      tabEnableRename: false
    },
    borders: [
      {
        type: "border",
        location: "left",
        size: 500,
        children: [],
        show: false,
        className: "border_left"
      },
      {
        type: "border",
        location: "right",
        size: 500,
        children: [],
        show: false,
        className: "border_right"
      },
      {
        type: "border",
        location: "bottom",
        size: 500,
        children: [],
        show: false,
        className: "border_bottom"
      }
    ],
    layout: {
      type: "row",
      weight: 100,
      children: []
    }
  }
};

export default Layout;