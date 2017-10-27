"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//PORTFOLIO LIST CONTROLLER
var portfolioItemController = {
    init: function init(parent) {
        this.cacheDOM(parent);
        this.events.init();
    },
    cacheDOM: function cacheDOM(parent) {
        this.body = parent;
    },
    getData: function getData(url, func) {
        _axios2.default.get(url).then(function (response) {
            func(response);
        }).catch(function (error) {
            console.log(error);
        });
    },

    events: {
        init: function init(parent) {
            this.tabs(parent);
        },
        tabs: function tabs(page) {
            var tabs = page.querySelectorAll(".tabs .tab");

            var content = page.querySelectorAll(".page-content");

            var activeStates = function activeStates(target) {
                tabs.forEach(function (item) {
                    item.classList.remove("active");
                });

                content.forEach(function (item) {
                    item.classList.remove("active");
                });

                target.classList.add("active");
            };

            var selectContent = function selectContent(el) {
                var id = el.dataset.target;

                var target = page.querySelector(".page-content[data-id='" + id + "']");

                target.classList.add("active");
            };

            tabs.forEach(function (item) {
                item.addEventListener("click", function (e) {
                    activeStates(e.currentTarget);
                    selectContent(e.currentTarget);
                });
            });
        }
    }
};

exports.default = portfolioItemController;