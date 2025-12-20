"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var prompts_1 = require("@inquirer/prompts");
var fs = require("fs");
var path = require("path");
var LeoCorpSystems = [
    {
        id: "web",
        name: "Web Experiences",
        status: "up",
        description: "Our web applications are running smoothly and serving customers without any issues.",
    },
    {
        id: "update",
        name: "Update System",
        status: "up",
        description: "Our automated update system is working as expected.",
    },
    {
        id: "gavilya-services",
        name: "Gavilya Services",
        status: "up",
        description: "All Gavilya services are working as expected.",
    },
];
var SynapsySystems = [
    {
        id: "write",
        name: "Write",
        status: "up",
        description: "Our writing platform is operating normally, allowing users to create and publish content without any issues.",
    },
    {
        id: "genidoc",
        name: "Genidoc",
        status: "up",
        description: "Genidoc is operating normally.",
    },
];
var Systems = __spreadArray(__spreadArray([], LeoCorpSystems, true), SynapsySystems, true);
var statuses = [
    { name: "Up", value: "up" },
    { name: "Partial Outage", value: "partial" },
    { name: "Down", value: "down" },
    { name: "Maintenance", value: "under-maintenance" },
];
var sys = Systems.map(function (system) {
    return { name: system.name, value: system.id };
});
var getUserInput = function () { return __awaiter(void 0, void 0, void 0, function () {
    var title, description, systems, status;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, prompts_1.input)({ message: "Enter the title:" })];
            case 1:
                title = _a.sent();
                return [4 /*yield*/, (0, prompts_1.input)({ message: "Enter the description:" })];
            case 2:
                description = _a.sent();
                return [4 /*yield*/, (0, prompts_1.checkbox)({
                        message: "Enter the affected system(s):",
                        choices: sys,
                    })];
            case 3:
                systems = _a.sent();
                return [4 /*yield*/, (0, prompts_1.select)({
                        message: "Select the status:",
                        choices: statuses,
                    })];
            case 4:
                status = _a.sent();
                return [2 /*return*/, { title: title, description: description, systems: systems, status: status }];
        }
    });
}); };
var createMdxFile = function (title, description, systems, status) {
    var dateStr = new Date().toISOString().split("T")[0];
    var filename = path.join("./app/incidents", "".concat(dateStr, "_").concat(title.replace(/ /g, "-").toLowerCase(), ".mdx"));
    var yamlFrontmatter = "---\ntitle: ".concat(title, "\ndate: \"").concat(new Date().toISOString(), "\"\nstatus: ").concat(status, "\nservices:\n  - ").concat(systems.join("\n  - "), "\nisOpen: true\n---\n\n").concat(description, "\n");
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, yamlFrontmatter);
    console.log("MDX file created at ".concat(filename));
};
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, systems, status;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getUserInput()];
            case 1:
                _a = _b.sent(), title = _a.title, description = _a.description, systems = _a.systems, status = _a.status;
                createMdxFile(title, description, systems, status);
                return [2 /*return*/];
        }
    });
}); };
main();
