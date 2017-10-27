'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ImageLoader = require('./ImageLoader');

var _ImageLoader2 = _interopRequireDefault(_ImageLoader);

var _Lifecycle = require('./Lifecycle');

var _Lifecycle2 = _interopRequireDefault(_Lifecycle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The public JavaScript API for Squarespace template developers.
 * @namespace SQS
 */
/**
 * @license
 * Copyright 2016 Squarespace, INC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var SQS = {
  ImageLoader: _ImageLoader2.default,
  Lifecycle: _Lifecycle2.default
};

exports.default = SQS;