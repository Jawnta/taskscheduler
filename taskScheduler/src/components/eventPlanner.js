"use strict";
// import dayjs from "dayjs";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
exports.getUserCap = exports.getTasks = void 0;
var getTasks = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("http://localhost:1337/tasks/")];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getTasks = getTasks;
var getUserCap = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("http://localhost:1337/userCap")];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getUserCap = getUserCap;
// export const createWeekCapacity = () => {
//     const years = ["2022", "2023", "2024", "2025"];
//     const numberOfWeeks = 52;
//     const weekCapData = {};
//     years.forEach((year) => {
//         weekCapData[year] = {};
//     });
//
//     for (let i = 0; i < numberOfWeeks; i++) {
//         for (const year in weekCapData) {
//             weekCapData[year][i + 1] = 0
//         }
//     }
//     return weekCapData;
// }
//
// export const sortTasksByDeadline = async () => {
//     const tasks = await getTasks();
//     return tasks.sort((a, b) => {
//         return dayjs(a.deadline) - dayjs(b.deadline);
//     });
// }
// export const setEvent = () => {
//     const data = this.sortTasksByDeadline();
//     const tasks = [];
//
//     data.forEach((task) => {
//         const userTime = this.userCap.cap;
//         let taskYear = this.getTaskYear(task.id);
//         let taskWeek = this.checkWeeklyCapacity(task);
//         let currentTaskWeek = this.weekCapData[taskYear][taskWeek];
//
//         const sumOfTime = this.weekCapData[taskYear][taskWeek] + task.estimated_duration;
//         if (!sumOfTime <= userTime){
//             let timeLeft = userTime - currentTaskWeek;
//             const negative = task.estimated_duration - timeLeft;
//             if (negative <= 0) {
//                 this.weekCapData[taskYear][taskWeek] += task.estimated_duration;
//                 task.estimated_duration = 0;
//                 tasks.push(this.addEvent(taskYear, taskWeek, task));
//             }else {
//                 const firstWeekToSchedule = taskWeek;
//                 this.weekCapData[taskYear][taskWeek] += timeLeft;
//                 task.estimated_duration -= timeLeft;
//                 const timeLeftFromTask = this.calcTimeLeft(task.estimated_duration);
//
//                 for (let x = 0; x < timeLeftFromTask.length; x++) {
//                     taskWeek++;
//                     if (taskWeek > 52) {
//                         taskYear++;
//                         taskWeek = 1;
//                     }
//                     this.weekCapData[taskYear][taskWeek] += timeLeftFromTask[x];
//
//                 }
//
//                 tasks.push(this.addEvent(taskYear, taskWeek, task, firstWeekToSchedule));
//             }
//
//         }else {
//             this.weekCapData[taskYear][taskWeek] += task.estimated_duration;
//             task.estimated_duration = 0;
//             tasks.push(this.addEvent(taskYear, taskWeek, task));
//         }
//         this.events = tasks;
//         console.log(this.weekCapData);
//     });
//
// }
console.log("lol");
console.log((0, exports.getUserCap)());
