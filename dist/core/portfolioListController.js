"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require("vue");

var _vue2 = _interopRequireDefault(_vue);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//PORTFOLIO LIST CONTROLLER
var portfolioListController = {
    init: function init(parent) {
        this.cacheDOM(parent);
        this.getData();

        console.log(this);
    },

    util: {
        toArray: function toArray(array) {
            return [].slice.call(array);
        }
    },
    cacheDOM: function cacheDOM(parent) {
        var body = parent;

        this.list = body.querySelector("#portfolio-list");
        this.map = body.querySelector("#svg-us-map");
        this.labels = this.util.toArray(body.querySelectorAll("text"));
        this.states = this.filterStates(this.util.toArray(body.querySelectorAll("path")));
    },
    filterStates: function filterStates(array) {
        var _this = this;

        return array.filter(function (item) {
            var result = false;

            if (item.id.length < 3) {
                item.classList.add("state");

                _this.labels.forEach(function (filter) {
                    var str = filter.textContent.replace(/\s/g, "");

                    if (str === item.id) {
                        item.setAttribute("data-label", filter.id);
                    }
                });

                result = item;
            }

            return result;
        });
    },
    getData: function getData() {
        var _this2 = this;

        _axios2.default.get("https://american-commercial-realty.squarespace.com/portfolio-list-collection?format=json").then(function (response) {
            _this2.addActiveStates(response.data);
            _this2.render(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    },
    addActiveStates: function addActiveStates(data) {
        data.collection.tags.forEach(function (tagName) {
            var activeState = document.getElementById(tagName);

            if (activeState) {
                activeState.classList.add("active");
            }

            var target = document.getElementById(document.getElementById(tagName).dataset.label);

            if (target) {
                target.classList.add("active");
            }
        });
    },
    render: function render(_data) {
        var vm = new _vue2.default({
            el: "#portfolio-list",
            data: function data() {
                return {
                    categories: _data.collection.categories,
                    items: _data.items
                };
            }
        });

        console.log(vm);
    }
};

exports.default = portfolioListController;