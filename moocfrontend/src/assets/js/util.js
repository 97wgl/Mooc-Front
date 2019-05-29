const baseUrl = "http://192.168.1.102:8080/"

const transformRequest = function transformRequest(obj) {
    　　　var str = [];
    　　　for ( var p in obj) {
    　　　　str.push(encodeURIComponent(p) + "="+ encodeURIComponent(obj[p]));
    　　　}
    　　　return str.join("&");
    　　}

export {
    baseUrl,
    transformRequest
}
