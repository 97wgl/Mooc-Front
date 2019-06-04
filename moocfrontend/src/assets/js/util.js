const baseUrl = "http://192.168.1.107:8080/"

const baseUrlTwo = "http://192.168.1.107:8080"


const transformRequest = function transformRequest(obj) {
    　　　var str = [];
    　　　for ( var p in obj) {
    　　　　str.push(encodeURIComponent(p) + "="+ encodeURIComponent(obj[p]));
    　　　}
    　　　return str.join("&");
}

/**
     * 判断是否登录
     */
const isLogin = function isLogin() {
    let user = JSON.parse(sessionStorage.getItem('Authorization')) // session_storage 登录注册的时候获取到session存在浏览器中
    if (!user) { // 未登录
        return false;
    }
        return true;
}

const toTreeData = function toTreeData(data) {
    let nodesData=data;
    let tree=[];
    for(let i=0;i<nodesData.length;i++){
        if(nodesData[i].parentId===0){
            let obj={
                sectionId: nodesData[i].sectionId,
                name: nodesData[i].name,
                createTime: nodesData[i].createTime,
                time: nodesData[i].time,
                video: nodesData[i].videoUrl,
                children:[]
            }

            tree.push(obj);
            nodesData.splice(i,1);

            i--;
        }
    }

    const run = function run (chiArr){
        if(nodesData.length!==0){
          for(let i=0;i<chiArr.length;i++){
            for(let j=0;j<nodesData.length;j++){
              if(chiArr[i].sectionId==nodesData[j].parentId){
                let obj={
                  sectionId: nodesData[j].sectionId,  
                  name: nodesData[j].name,
                  createTime: nodesData[j].createTime,
                  time: nodesData[j].time,
                  video: nodesData[j].videoUrl,
                  children:[]
                }
                chiArr[i].children.push(obj);
                nodesData.splice(j,1); 
                j--;
              }
            }
            run(chiArr[i].children);
          }
        }
    }

    run(tree);

    return tree;
}


export {
    baseUrl,
    transformRequest,
    isLogin,
    toTreeData,
    baseUrlTwo
}
