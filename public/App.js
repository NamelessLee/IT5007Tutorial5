"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

function removeIssue(_x) {
  return _removeIssue.apply(this, arguments);
}

function _removeIssue() {
  _removeIssue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(issue) {
    var query, data;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log("I'm removeIssue");
            query = "mutation issueDelete($issue: IssueDeletes!){\n    issueDelete(issue: $issue) {\n      id\n    }\n  }";
            _context3.next = 4;
            return graphQLFetch(query, {
              issue: issue
            });

          case 4:
            data = _context3.sent;
            window.location.reload();

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _removeIssue.apply(this, arguments);
}

function handleRemove(issue, e) {
  e.preventDefault();
  console.log("Delete:" + issue.id);
  removeIssue(issue);
}

function IssueRow(props) {
  var issue = props.issue;
  var index = props.index;
  index++;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, index), /*#__PURE__*/React.createElement("td", null, issue.serialNumber), /*#__PURE__*/React.createElement("td", null, issue.name), /*#__PURE__*/React.createElement("td", null, issue.phoneNumber), /*#__PURE__*/React.createElement("td", null, issue.created.toDateString()), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick(e) {
      return handleRemove(issue, e);
    }
  }, "Remove")));
}

function IssueTable(props) {
  var issueRows = props.issues.map(function (issue, index) {
    return /*#__PURE__*/React.createElement(IssueRow, {
      key: issue.id,
      issue: issue,
      index: index
    });
  });
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table",
    id: "wltable"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "No."), /*#__PURE__*/React.createElement("th", null, "Serial Number"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Phone Number"), /*#__PURE__*/React.createElement("th", null, "Created"), /*#__PURE__*/React.createElement("th", null, "Remove"))), /*#__PURE__*/React.createElement("tbody", null, issueRows));
}

var IssueAdd = /*#__PURE__*/function (_React$Component) {
  _inherits(IssueAdd, _React$Component);

  var _super = _createSuper(IssueAdd);

  function IssueAdd() {
    var _this;

    _classCallCheck(this, IssueAdd);

    _this = _super.call(this);
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(IssueAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.issueAdd;

      if (form.name.value == "" || form.phoneNumber.value == "") {
        alert("Invalid input. Please enter content");
        return;
      } //console.log("size=" + document.getElementById("wltable").getElementsByTagName("tr").length);


      var size = document.getElementById("wltable").getElementsByTagName("tr").length;

      if (size == 25) {
        alert("Waitlist is full");
        return;
      }

      var issue = {
        name: form.name.value,
        phoneNumber: form.phoneNumber.value
      };
      this.props.createIssue(issue);
      form.name.value = "";
      form.phoneNumber.value = "";
      this.props.decfs();
    }
  }, {
    key: "render",
    value: function render() {
      var myAddStyle = {
        width: "300px",
        float: "left",
        padding: "0.5px 10px 10px 20px",
        backgroundColor: "bisque",
        borderRadius: "10px"
      };
      return /*#__PURE__*/React.createElement("div", {
        style: myAddStyle
      }, /*#__PURE__*/React.createElement("form", {
        name: "issueAdd",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("label", {
        for: "name"
      }, "Name:"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: "name",
        name: "name",
        placeholder: "Name"
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
        for: "phoneNumber"
      }, "Phone Number:"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: "phoneNumber",
        name: "phoneNumber",
        placeholder: "Phone Number"
      }), /*#__PURE__*/React.createElement("div", {
        className: 'block',
        style: {
          textAlign: "center"
        }
      }, /*#__PURE__*/React.createElement("input", {
        type: "submit",
        value: "submit"
      }), /*#__PURE__*/React.createElement("input", {
        type: "reset",
        value: "reset"
      }))));
    }
  }]);

  return IssueAdd;
}(React.Component);

function graphQLFetch(_x2) {
  return _graphQLFetch.apply(this, arguments);
}

function _graphQLFetch() {
  _graphQLFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(query) {
    var variables,
        response,
        body,
        result,
        error,
        details,
        _args4 = arguments;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            variables = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
            _context4.prev = 1;
            _context4.next = 4;
            return fetch('/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: query,
                variables: variables
              })
            });

          case 4:
            response = _context4.sent;
            _context4.next = 7;
            return response.text();

          case 7:
            body = _context4.sent;
            result = JSON.parse(body, jsonDateReviver);

            if (result.errors) {
              error = result.errors[0];

              if (error.extensions.code == 'BAD_USER_INPUT') {
                details = error.extensions.exception.errors.join('\n ');
                alert("".concat(error.message, ":\n ").concat(details));
              } else {
                alert("".concat(error.extensions.code, ": ").concat(error.message));
              }
            }

            return _context4.abrupt("return", result.data);

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](1);
            alert("Error in sending data to server: ".concat(_context4.t0.message));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 13]]);
  }));
  return _graphQLFetch.apply(this, arguments);
}

var MyHeader = /*#__PURE__*/function (_React$Component2) {
  _inherits(MyHeader, _React$Component2);

  var _super2 = _createSuper(MyHeader);

  function MyHeader() {
    _classCallCheck(this, MyHeader);

    return _super2.apply(this, arguments);
  }

  _createClass(MyHeader, [{
    key: "render",
    value: function render() {
      var myHeaderStyle = {
        backgroundColor: "mistyrose",
        textAlign: "center",
        color: "saddlebrown"
      };
      return /*#__PURE__*/React.createElement("div", {
        id: "header2",
        style: myHeaderStyle
      }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("h1", null, "\uD83C\uDFE8 Home Page \uD83C\uDF7D\uFE0F ")));
    }
  }]);

  return MyHeader;
}(React.Component);

var IssueList = /*#__PURE__*/function (_React$Component3) {
  _inherits(IssueList, _React$Component3);

  var _super3 = _createSuper(IssueList);

  function IssueList() {
    var _this2;

    _classCallCheck(this, IssueList);

    _this2 = _super3.call(this);
    _this2.state = {
      issues: [],
      fs: 25
    };
    _this2.createIssue = _this2.createIssue.bind(_assertThisInitialized(_this2));
    _this2.incfs = _this2.incfs.bind(_assertThisInitialized(_this2));
    _this2.decfs = _this2.decfs.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(IssueList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query, data, num, newfs;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "query {\n      issueList {\n        id serialNumber name phoneNumber\n        created \n      }\n    }";
                _context.next = 3;
                return graphQLFetch(query);

              case 3:
                data = _context.sent;

                if (data) {
                  this.setState({
                    issues: data.issueList
                  });
                }

                num = data.issueList.length;
                console.log("num=" + num);
                newfs = 25 - num;
                this.setState({
                  fs: newfs
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "createIssue",
    value: function () {
      var _createIssue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(issue) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "mutation Add($issue: IssueInputs!) {\n      Add(issue: $issue) {\n        id\n      }\n    }";
                _context2.next = 3;
                return graphQLFetch(query, {
                  issue: issue
                });

              case 3:
                data = _context2.sent;

                if (data) {
                  this.loadData();
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createIssue(_x3) {
        return _createIssue.apply(this, arguments);
      }

      return createIssue;
    }()
  }, {
    key: "incfs",
    value: function incfs() {
      console.log("incfs");
      var newfs = this.state.fs;
      newfs++;
      this.setState({
        fs: newfs
      });
    }
  }, {
    key: "decfs",
    value: function decfs() {
      var newfs = this.state.fs;
      newfs--;
      this.setState({
        fs: newfs
      });
    }
  }, {
    key: "render",
    value: function render() {
      var myFreeSlotsStyle = {
        width: "150px",
        float: "right",
        backgroundColor: "gold",
        borderRadius: "10px",
        fontSize: "large",
        padding: "10px 25px",
        color: "maroon"
      };
      var myWlStyle = {
        width: "480px",
        float: "left",
        backgroundColor: "rgb(215, 191, 216)",
        borderRadius: "10px",
        padding: "5px 20px 20px 20px",
        textAlign: "center",
        border: "2px solid rgb(112, 56, 79)"
      };
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MyHeader, null), /*#__PURE__*/React.createElement("div", {
        style: myFreeSlotsStyle
      }, /*#__PURE__*/React.createElement("h3", null, "Free slots: ", this.state.fs)), /*#__PURE__*/React.createElement(IssueAdd, {
        createIssue: this.createIssue,
        incfs: this.incfs,
        decfs: this.decfs
      }), /*#__PURE__*/React.createElement("div", {
        style: myWlStyle
      }, /*#__PURE__*/React.createElement(IssueTable, {
        issues: this.state.issues,
        fs: this.state.fs
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          float: "left",
          margin: "0px 10px 10px 10px"
        }
      }, /*#__PURE__*/React.createElement("button", {
        className: 'button1'
      }, "Hide Waitlist"), /*#__PURE__*/React.createElement("span", null, "Total: "), /*#__PURE__*/React.createElement("span", null, "4")));
    }
  }]);

  return IssueList;
}(React.Component);

var element = /*#__PURE__*/React.createElement(IssueList, null);
ReactDOM.render(element, document.getElementById('contents'));