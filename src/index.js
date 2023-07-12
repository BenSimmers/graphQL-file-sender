"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileTypeSchema = exports.deconstructFile = exports.handleDownload = exports.base64ToArrayBuffer = exports.GET_FILE = void 0;
var client_1 = require("@apollo/client");
var funfix_1 = require("funfix");
var fs_1 = require("fs");
var path_1 = require("path");
exports.GET_FILE = (0, client_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query GetFile {\n    file {\n      filename\n      mimetype\n      encoding\n      content\n    }\n  }\n"], ["\n  query GetFile {\n    file {\n      filename\n      mimetype\n      encoding\n      content\n    }\n  }\n"])));
var base64ToArrayBuffer = function (base64) {
    var binaryString = window.atob(base64);
    var bytes = Uint8Array.from(binaryString, function (char) { return char.charCodeAt(0); });
    return bytes.buffer;
};
exports.base64ToArrayBuffer = base64ToArrayBuffer;
var handleDownload = function (data) {
    var _a;
    var _b = (_a = data === null || data === void 0 ? void 0 : data.file) !== null && _a !== void 0 ? _a : {}, filename = _b.filename, content = _b.content, mimetype = _b.mimetype;
    if (!filename || !content || !mimetype)
        return;
    var blob = new Blob([(0, exports.base64ToArrayBuffer)(content)], { type: mimetype });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
};
exports.handleDownload = handleDownload;
/**
 *
 * @param filename - filename to deconstruct
 * @returns - file object or empty object
 */
var deconstructFile = function (filename) {
    return funfix_1.Option.of(filename)
        .map(function (f) {
        var file = (0, path_1.join)(__dirname, f);
        var fileContent = (0, fs_1.readFileSync)(file);
        var base64Content = Buffer.from(fileContent).toString('base64');
        // @ts-ignore
        var fileMime = mime.lookup(file);
        var fileObj = { filename: filename, mimetype: fileMime, encoding: 'base64', content: base64Content };
        return fileObj;
    })
        .getOrElse({
        filename: '',
        mimetype: '',
        encoding: '',
        content: '',
    });
};
exports.deconstructFile = deconstructFile;
exports.FileTypeSchema = "\n  type File {\n    filename: String!\n    mimetype: String!\n    encoding: String!\n    content: String!\n  }\n";
var templateObject_1;
