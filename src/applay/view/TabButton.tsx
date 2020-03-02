import * as React from "react";
import * as ReactDOM from "react-dom";
import { I18nLabel } from "..";

import DropdownMenu from "./DropdownMenu";
import FlexLayout from "./FlexLayout";

import Rect from "../Rect";

import Actions from "../model/Actions";
import TabNode from "../model/TabNode";
import TabSetNode from "../model/TabSetNode";

import { Icon } from "@blueprintjs/core";

/** @hidden @internal */
export interface ITabButtonProps {
    layout: FlexLayout;
    node: TabNode;
    show: boolean;
    selected: boolean;
    height: number;
}

/** @hidden @internal */
export class TabButton extends React.Component<ITabButtonProps, any> {
    selfRef?: HTMLDivElement;

    contentWidth: number = 0;
    contentRef?: Element;

    constructor(props: ITabButtonProps) {
        super(props);
        this.state = { editing: false };
        this.onEndEdit = this.onEndEdit;
    }

    onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
        const message = this.props.layout.i18nName(I18nLabel.Move_Tab, this.props.node.getName());
        this.props.layout.dragStart(event, message, this.props.node, this.props.node.isEnableDrag(), this.onClick, this.onDoubleClick);
    }

    onClick = (_event: Event) => {
        const node = this.props.node;
        this.props.layout.doAction(Actions.selectTab(node.getId()));
    }

    onDoubleClick = (_event: Event) => {
        if (this.props.node.isEnableRename()) {
            this.setState({ editing: true });
            document.body.addEventListener("mousedown", this.onEndEdit);
            document.body.addEventListener("touchstart", this.onEndEdit);
        }
        else {
            const parentNode = this.props.node.getParent() as TabSetNode;
            if (parentNode.isEnableMaximize()) {
                this.props.layout.maximize(parentNode);
            }

        }
    }

    onEndEdit = (event: Event) => {
        if (event.target !== this.contentRef) {
            this.setState({ editing: false });
            document.body.removeEventListener("mousedown", this.onEndEdit);
            document.body.removeEventListener("touchstart", this.onEndEdit);
        }
    }

    onClose = (_event: React.MouseEvent<HTMLDivElement>) => {
        const node = this.props.node;
        this.props.layout.doAction(Actions.deleteTab(node.getId()));
    }

    onCloseMouseDown = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        event.stopPropagation();
    }

    componentDidMount() {
        this.updateRect();
    }

    componentDidUpdate() {
        this.updateRect();
        if (this.state.editing) {
            (this.contentRef as HTMLInputElement).select();
        }
    }

    updateRect() {
        // record position of tab in node
        const clientRect = (ReactDOM.findDOMNode(this.props.layout) as Element).getBoundingClientRect();
        const r = (this.selfRef as Element).getBoundingClientRect();
        this.props.node._setTabRect(new Rect(r.left - clientRect.left, r.top - clientRect.top, r.width, r.height));
        this.contentWidth = (this.contentRef as Element).getBoundingClientRect().width;
    }


    onTextBoxMouseDown = (event: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
        // console.log("onTextBoxMouseDown");
        event.stopPropagation();
    }

    onTextBoxKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // console.log(event, event.keyCode);
        if (event.keyCode === 27) { // esc
            this.setState({ editing: false });
        }
        else if (event.keyCode === 13) { // enter
            this.setState({ editing: false });
            const node = this.props.node;
            this.props.layout.doAction(Actions.renameTab(node.getId(), (event.target as HTMLInputElement).value));
        }
    }

    doRename(node: TabNode, newName: string) {
        this.props.layout.doAction(Actions.renameTab(node.getId(), newName));
    }

    render() {
        const cm = this.props.layout.getClassName;

        let classNames = cm("flexlayout__tab_button");
        const node = this.props.node;
        const parentNode = this.props.node.getParent() as TabSetNode;
        const children = parentNode.getChildren();
        if (this.props.selected && children.length > 1) {
            classNames += " " + cm("flexlayout__tab_button--selected");
        }
        else {
            classNames += " " + cm("flexlayout__tab_button--unselected");
        }

        if (this.props.node.getClassName() !== undefined) {
            classNames += " " + this.props.node.getClassName();
        }

        let leadingContent;

        if (node.getIcon() !== undefined) {
            leadingContent = <img src={node.getIcon()} alt="leadingContent"/>;
        }

        // allow customization of leading contents (icon) and contents
        const renderState = { leading: leadingContent, content: node.getName() };
        this.props.layout.customizeTab(node, renderState);

        let content = <div ref={ref => this.contentRef = (ref === null) ? undefined : ref} className={cm("flexlayout__tab_button_content")}>{renderState.content}</div>;
        // const leading = <div className={cm("flexlayout__tab_button_leading")}>{renderState.leading}<DropdownMenu /></div>;

        if (this.state.editing) {
            const contentStyle = { width: this.contentWidth + "px" };
            content = <input style={contentStyle}
                ref={ref => this.contentRef = (ref === null) ? undefined : ref}
                className={cm("flexlayout__tab_button_textbox")}
                type="text"
                autoFocus={true}
                defaultValue={node.getName()}
                onKeyDown={this.onTextBoxKeyPress}
                onMouseDown={this.onTextBoxMouseDown}
                onTouchStart={this.onTextBoxMouseDown}
            />;
        }

        let closeButton;
        if (this.props.node.isEnableClose()) {
            closeButton = <div className={cm("flexlayout__tab_button_trailing")}
                onMouseDown={this.onCloseMouseDown}
                onClick={this.onClose}
                onTouchStart={this.onCloseMouseDown}
            ><Icon icon="cross" /></div>;
        }

        return (
            <div ref={ref => this.selfRef = (ref === null) ? undefined : ref}
                style={{
                    visibility: this.props.show ? "visible" : "hidden",
                    height: this.props.height
                }}
                className={classNames}
                onMouseDown={this.onMouseDown}
                onTouchStart={this.onMouseDown}
            >
                <div className="dropdown_menu_container" onMouseDown={this.onCloseMouseDown} onTouchStart={this.onCloseMouseDown}>
                    <DropdownMenu node={this.props.node} layout={this.props.layout} />
                </div>
                {content}
                {closeButton}
            </div>
        );
    }
}

export default TabButton;
