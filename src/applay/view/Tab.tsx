import * as React from "react";
import Actions from "../model/Actions";
import TabNode from "../model/TabNode";
import TabSetNode from "../model/TabSetNode";
import { JSMap } from "../Types";
import FlexLayout from "./FlexLayout";

/** @hidden @internal */
export interface ITabProps {
    layout: FlexLayout;
    selected: boolean;
    node: TabNode;
    factory: (node: TabNode) => React.ReactNode;
}

/** @hidden @internal */
export class Tab extends React.Component<ITabProps, any> {

    constructor(props: ITabProps) {
        super(props);
        this.state = { renderComponent: !props.node.isEnableRenderOnDemand() || props.selected };
    }

    componentDidMount() {
        // console.log("mount " + this.props.node.getName());
    }

    componentWillUnmount() {
        // console.log("unmount " + this.props.node.getName());
    }

    componentWillReceiveProps(newProps: ITabProps) {
        if (!this.state.renderComponent && newProps.selected) {
            // load on demand
            // console.log("load on demand: " + this.props.node.getName());
            this.setState({ renderComponent: true });
        }
    }

    onMouseDown = () => {
        const parent = this.props.node.getParent() as TabSetNode;
        if (parent.getType() === TabSetNode.TYPE) {
            if (!parent.isActive()) {
                this.props.layout.doAction(Actions.setActiveTabset(parent.getId()));
            }
        }
    }

    render() {
        const cm = this.props.layout.getClassName;
        const node = this.props.node;
        const classes = node.getClassName();
        const parentNode = node.getParent() as TabSetNode;
        const nodeId = parentNode.getId();
        const flexlayoutBorderInnerBottom : HTMLElement | null = document.querySelector(".flexlayout__border_inner_bottom");
        const flexlayoutTabBorderBottom : HTMLElement | null = document.querySelector(".flexlayout__tab-border_bottom");
        const style: JSMap<any> = node._styleWithPosition({
            display: this.props.selected ? "block" : "none"
        });
        if (nodeId === "border_bottom") {
            style.borderRadius = "3px 3px 0px 0px";
        }
        if (nodeId === "border_left") {
            style.borderRadius = "0px 3px 3px 0px";
        }
        if (nodeId === "border_right") {
            style.borderRadius = "3px 0px 0px 3px";
        }
        if (parentNode.isMaximized()) {
            style.zIndex = 100;
        }
        if(flexlayoutTabBorderBottom !== null) {
            const left:any = flexlayoutTabBorderBottom.style.left;
            if (flexlayoutBorderInnerBottom !== null && parseInt(style.left, 10) >= 25) {
                flexlayoutBorderInnerBottom.style.paddingLeft = `${parseInt(left, 10) - 25}px`;
            }
        }

        let child;
        if (this.state.renderComponent) {
            child = this.props.factory(node);
        }

        return <div className={cm(`flexlayout__tab flexlayout__tab-${nodeId} ${classes}`)}
            onMouseDown={this.onMouseDown}
            onTouchStart={this.onMouseDown}
            style={style}>{child}
        </div>;
    }
}

export default Tab;
