"use strict";

var _portfolioListController = require("./core/portfolioListController");

var _portfolioListController2 = _interopRequireDefault(_portfolioListController);

var _portfolioItemController = require("./core/portfolioItemController");

var _portfolioItemController2 = _interopRequireDefault(_portfolioItemController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = {
    init: function init() {
        this.cacheDOM();

        if (this.list) {
            _portfolioListController2.default.init(this.list);
        }

        if (this.item) {
            _portfolioItemController2.default.init(this.item);
        }
    },
    cacheDOM: function cacheDOM() {
        var body = document.querySelector("body");

        this.list = body.querySelector(".Main.Main--property-list");
        this.item = body.querySelector(".Main Main--property-item");
    }
};

window._CustomApp = App;

App.init();