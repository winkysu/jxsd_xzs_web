import axios from 'axios';

let host = 'http://shop.projectsedu.com';
let localhost = 'http://127.0.0.1:8000/api/v1'

//获取商品类别信息
export const queryCategorygoods = params => { return axios.get(`${host}/indexgoods/`) }


//获取轮播图
export const bannerGoods = params => { return axios.get(`${host}/banners/`) }

//获取商品类别信息
export const getCategory = params => {
  if('id' in params){
    return axios.get(`${host}/categorys/`+params.id+'/');
  }
  else {
    return axios.get(`${host}/categorys/`, params);
  }
};

//获取学期
export const getSemester = params => {
  if('id' in params){
    return axios.get(`${localhost}/semester/`+params.id+'/');
  }
  else {
    return axios.get(`${localhost}/semester/`, params);
  }
};

//获取有成绩的学期
export const scoreSemester = params => {
  return axios.post(`${localhost}/score-semester/`,params )
}
//获取成绩
export const getScores = params => {
  return axios.get(`${localhost}/score/`, { params: params })
};
//获取最新成绩
export const checkNewScores = params => {
  return axios.get(`${localhost}/new-score/`, { params: params })
};
//更新最新学期最新成绩
export const updateNewScores = params => {
  return axios.post(`${localhost}/new-score/`, params)
};
//更新最新学期最新成绩
export const updateScores = params => {
  return axios.post(`${localhost}/update-score/`, params)
};


//获取新闻列表
export const getredios = params => { return axios.get(`${localhost}/redio/`, { params: params }) }

//新闻详情
export const getlistDetail = id => { return axios.get(`${localhost}/redio/`+id+'/') }

//获取有课表的学期
export const scedculeSemester = params => {
  return axios.post(`${localhost}/student-schedule-semester/`,params )
}
//获取课表
export const getSchedule = params => {
  //return axios.get(`${localhost}/student-schedule/?student_id=`+query.student_id+'&'+`semester=`+query.semester);
  return axios.get(`${localhost}/student-schedule/`, { params: params })
};
//获取课程学生
export const StudentList = params => {
  return axios.get(`${localhost}/schedule-student-list/`, { params: params })
};


//获取历史记录
export const getLog = query => {
  if('page' in query){
    return axios.get(`${localhost}/log/`+query.page);
  }
  else {
    return axios.get(`${localhost}/log/`, query);
  }}
//登录
export const login = params => {
  return axios.post(`${localhost}/login/`,params )
}
//重置密码
export const resetPwd = params => {
  return axios.post(`${localhost}/reset-password/`, params)
}
//获取用户信息
export const getUserDetail =params => { return axios.get(`${localhost}/user-profile/`+params+'/') }

//修改用户信息
export const updateUserInfo = params => { return axios.patch(`${localhost}/user-profile/3/`, params) }
//获取教务在线信息
export const getJxInfo = params => {
  return axios.get(`${localhost}/student-detail-retrieve/`+params+'/')
};

//关注
export const addFriend = params => { return axios.post(`${localhost}/friend/`, params) }

//取消关注
export const delFriend = Id => { return axios.delete(`${localhost}/friend/`+Id+'/') }

export const getAllFriend = params => { return axios.get(`${localhost}/friend/`, { params: params }) }

//判断是否关注
//export const getFriend = goodsId => { return axios.get(`${localhost}/friend/`+goodsId+'/') }
export const getFriend = params => { return axios.get(`${localhost}/friend/`, params) }
//查询用户
export const getPerson = params => { return axios.get(`${localhost}/user/`, { params: params }) }
//查询学院
export const getAcademy = params => { return axios.get(`${localhost}/colloge/`, { params: params }) }
//查询部门
export const getDep= params => { return axios.get(`${localhost}/department/`, { params: params }) }
//查询班级
export const getCla= params => { return axios.get(`${localhost}/class/`, { params: params }) }
//查询关系
export const findRel= params => { return axios.post(`${localhost}/find-relation/`, params) }




