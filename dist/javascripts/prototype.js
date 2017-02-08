var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InputText = (function () {
    function InputText(text) {
        this.text = text;
        this.id = Date.now();
    }
    ;
    return InputText;
}());
var InputTextList = (function () {
    function InputTextList() {
        this.list = [];
    }
    InputTextList.prototype.add = function (text) {
        this.list.push(new InputText(text));
    };
    return InputTextList;
}());
var ForInputAction = (function (_super) {
    __extends(ForInputAction, _super);
    function ForInputAction(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            inputChara: "",
            muraiClassName: "murai_animation_1",
            muraiSrc: "images/murai/1.png"
        };
        return _this;
    }
    ForInputAction.prototype.handleInputTextChange = function (e) {
        var inputValue = e.target.value;
        this.setState({ inputChara: inputValue });
    };
    ForInputAction.prototype.handleSubmit = function (e) {
        if (this.state.inputChara == "") {
            e.preventDefault();
        }
        else {
            e.preventDefault();
            this.props.onSubmit(this.state.inputChara);
            this.setState({ inputChara: "", muraiClassName: "bounceOut" });
            setTimeout(function () {
                var muraicnt1 = Math.floor(Math.random() * 2);
                var murai_classname = "murai_animation_" + muraicnt1;
                var muraicnt2 = Math.floor(Math.random() * 9);
                var murai_src = "images/murai/" + muraicnt2 + ".png";
                this.setState({ muraiClassName: murai_classname, muraiSrc: murai_src });
            }.bind(this), 1000);
        }
    };
    ForInputAction.prototype.handleMouseDown = function (e) { };
    ;
    ForInputAction.prototype.handleMouseUp = function (e) { };
    ;
    ForInputAction.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("img", { id: "murai", className: this.state.muraiClassName, src: this.state.muraiSrc }),
            React.createElement("form", { id: "formBox", onSubmit: this.handleSubmit.bind(this) },
                React.createElement("div", null,
                    React.createElement("input", { id: "inputBox", type: "text", value: this.state.inputChara, onChange: this.handleInputTextChange.bind(this) }),
                    React.createElement("input", { id: "textSubmit", type: "submit", value: "送信", onMouseDown: this.handleMouseDown.bind(this), onMouseUp: this.handleMouseUp.bind(this) })))));
    };
    return ForInputAction;
}(React.Component));
var InputTextDisp = (function (_super) {
    __extends(InputTextDisp, _super);
    function InputTextDisp() {
        return _super.call(this) || this;
    }
    InputTextDisp.prototype.render = function () {
        var listItems = this.props.displist.map(function (x) {
            return React.createElement("li", { key: x.id, className: "input_disp" },
                React.createElement("span", null,
                    "Q.",
                    x.text));
        });
        return (React.createElement("div", null,
            React.createElement("ul", null, listItems)));
    };
    return InputTextDisp;
}(React.Component));
;
var AnswerTextDisp = (function (_super) {
    __extends(AnswerTextDisp, _super);
    function AnswerTextDisp() {
        return _super.call(this) || this;
    }
    AnswerTextDisp.prototype.render = function () {
        var listItems = this.props.answerlist.map(function (x) {
            return React.createElement("li", { key: x.id, className: "answer_disp" },
                React.createElement("span", null,
                    "A.",
                    x.text));
        });
        return (React.createElement("div", null,
            React.createElement("ul", null, listItems)));
    };
    return AnswerTextDisp;
}(React.Component));
var Main = (function (_super) {
    __extends(Main, _super);
    function Main(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            displistpost: new InputTextList(),
            answerlistpost: new InputTextList()
        };
        return _this;
    }
    Main.prototype.handleInputTextSubmit = function (texts) {
        this.state.displistpost.add(texts);
        this.state.answerlistpost.add(texts);
        this.setState({ displistpost: this.state.displistpost, answerlistpost: this.state.answerlistpost });
    };
    Main.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(InputTextDisp, { displist: this.state.displistpost.list }),
            React.createElement(ForInputAction, { onSubmit: this.handleInputTextSubmit.bind(this) }),
            React.createElement(AnswerTextDisp, { answerlist: this.state.answerlistpost.list })));
    };
    return Main;
}(React.Component));
ReactDOM.render(React.createElement(Main, null), document.getElementById('root'));
