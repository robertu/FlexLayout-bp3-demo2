import * as React from "react";

import { Button, Menu, MenuItem, Popover, Position } from "@blueprintjs/core";
import Actions from "../model/Actions";
import TabNode from "../model/TabNode";
import TabSetNode from "../model/TabSetNode";
import FlexLayout from "./FlexLayout";

export interface ITabButtonProps {
    node: TabNode;
    layout: FlexLayout;
}
export class DropdownMenu extends React.PureComponent<any, ITabButtonProps> {
    closeTab = ():void => {
        const node = this.props.node;
        this.props.layout.doAction(Actions.deleteTab(node.getId()));
    }
    maxTab = ():void => {
        const parentNode = this.props.node.getParent() as TabSetNode;
        if (parentNode.isEnableMaximize()) {
            this.props.layout.maximize(parentNode);
        }
    }
    render() {
        // const parentNode = this.props.node.getParent() as TabSetNode;
        const exampleMenu = (
            <Menu>
                <MenuItem icon="cross" text="Close tab" onClick={this.closeTab} />
                <MenuItem icon="fullscreen" text="Fullscreen"  onClick={this.maxTab} />
            </Menu>
        );
        return (
            <Popover minimal={true} enforceFocus={false} className="tab_menu" content={exampleMenu} position={Position.BOTTOM_LEFT}>
                 <Button icon="application" />
            </Popover>
        );
    }
}

export default DropdownMenu;