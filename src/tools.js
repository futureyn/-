function t(d) {
    return d < 10 ? "0" + d : d
}
function startDate() {
    let start = new Date(new Date(new Date().toLocaleDateString()).getTime()); // 获取零点 标准时间
    let initStartDate = start.getFullYear() + "-" + t((start.getMonth() + 1)) + "-" + t(start.getDate()) + " " + t(start.getHours()) + ":" + t(start.getMinutes())
    return initStartDate
}
function endDate() {
    let end = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1); // 获取23：59：59 标准时间
    let initEndDate = end.getFullYear() + "-" + t((end.getMonth() + 1)) + "-" + t(end.getDate()) + " " + t(end.getHours()) + ":" + t(end.getMinutes())
    return initEndDate
}
function timeString(time) {
    return time.getFullYear() + "-" + t((time.getMonth() + 1)) + "-" + t(time.getDate()) + "-" + t(time.getHours()) + "-" + t(time.getMinutes())
}
export { startDate, endDate,timeString }