import { Alignment, Button, Classes, Menu, MenuDivider, MenuItem, Navbar, NavbarDivider, NavbarGroup, NavbarHeading, Popover, Position } from "@blueprintjs/core";
import * as React from "react";
// import React, { MouseEvent } from 'react';
import { AppHeaderLogo } from "./AppHeaderLogo";

export interface IThemedIconProps {
  lightTheme: boolean;
  width: number;
  height: number;
}

export interface IThemedHeaderProps {
  lightTheme: boolean;
  themeSwitch: () => void;
  toolbarSettings: (name: string) => void;
  layoutComponents: any;
  menuLogo: any;
  customMenu: any;
  leftMenu: any;
  title: string;
  userMenu: any;
  // addToTopRight: (name: string) => (event: MouseEvent) => void;
}

export const CustomLogo = ({ lightTheme, width, height }: IThemedIconProps) => <AppHeaderLogo width={width} height={height} lightTheme={lightTheme} />;

export const AppHeader = ({
  lightTheme,
  themeSwitch,
  layoutComponents,
  toolbarSettings,
  menuLogo,
  customMenu,
  leftMenu,
  title,
  userMenu
}: IThemedHeaderProps) => (
  <Navbar>
    <NavbarGroup align={Alignment.LEFT}>
      <Popover
        content={
          <Menu>
            <MenuItem icon="contrast" text={lightTheme ? "Switch to dark theme" : "Switch to light theme"} onClick={themeSwitch} />
            <MenuDivider />
            {
              layoutComponents.borders.map((border: any, index: number) => {
                switch(border.location) {
                  case "bottom":
                    return <MenuItem
                      key={index}
                      icon={border.show === true ? "remove-row-bottom" : "add-row-bottom"}
                      text={border.show === true ? "Hide bottom dock" : "Show bottom dock"}
                      onClick={() => toolbarSettings(border.location)}
                    />;
                  case "left":
                    return <MenuItem
                      key={index}
                      icon={border.show === true ? "remove-column-left" : "add-column-left"}
                      text={(border.show || border.show === undefined) ? "Hide left dock" : "Show left dock"}
                      onClick={() => toolbarSettings(border.location)}
                    />;
                  case "right":
                    return <MenuItem
                      key={index}
                      icon={border.show === true ? "remove-column-right" : "add-column-right"}
                      text={(border.show || border.show === undefined) ? "Hide right dock" : "Show right dock"}
                      onClick={() => toolbarSettings(border.location)}
                    />;
                  default:
                    return null;
                }
              })
            }
            {
              leftMenu
            }
          </Menu>
        }
        position={Position.BOTTOM_LEFT}
        minimal={true}
      >
        <Button className={Classes.MINIMAL} icon={menuLogo === null ? <CustomLogo width={80} height={32} lightTheme={lightTheme} /> : menuLogo} text={null} />
      </Popover>
      <NavbarDivider />
        {
          customMenu !== null
          ?
          customMenu.map((cm:any, index:number) => {
            const { icon, name, menu } = cm;
            return (
              <Popover
                key={index}
                content={menu}
                minimal={true}
                position={Position.BOTTOM_LEFT}
              >
                <Button className={Classes.MINIMAL} icon={icon} text={name} />
              </Popover>
            );
          })
          :
          null
        }
    </NavbarGroup>
    <NavbarGroup align={Alignment.RIGHT}>
      <NavbarHeading>{ title }</NavbarHeading>
      <NavbarDivider />
      {
        userMenu !== null
        ?
        <Popover
          content={
            userMenu.menu
          }
          position={Position.BOTTOM_RIGHT}
          minimal={true}
        >
          <Button className={Classes.MINIMAL} icon={userMenu.icon} text={userMenu.name} />
        </Popover>
        :
        null
      }
    </NavbarGroup>
  </Navbar>
);

export default AppHeader;