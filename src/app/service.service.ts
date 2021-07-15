/**
 * @module service
 * @author 齐
 */
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams} from '@angular/common/http';
import {ipconfig} from './ipconfig'
import {DatePipe} from '@angular/common'
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public token='test';
  public getHeader=new HttpHeaders();
  public postHeader=new HttpHeaders({
    'Content-Type':"application/x-www-form-urlencoded;charset=UTF-8"
  })
  public putHeader=new HttpHeaders({
     'Content-Type':"application/x-www-form-urlencoded;charset=UTF-8"
  })
  public userid='4cb9f035-52c0-478f-86df-c4239a59561c';
  public loginflag=true

  constructor(public http:HttpClient,public datepipe:DatePipe) { }
  ngOnInit(){
    
  }
  
   getDeviceGroup(parentid:any){
    let params=new HttpParams().set('parent_id',parentid)
    let headers=new HttpHeaders().set('Authorization',this.token)
    return new Promise(resolve=>{
      this.http.get(ipconfig()+'/devicegroups',{headers:this.getHeader,params:params}).subscribe(data=>{
        
        resolve(data)
      })
    })
    
  }
  // 修改
  /**
   * 
   * @param {groupid:any} 组id
   * @param {groupname:any} 组名称
   * @param {parentid:any} 父级id
   * @return {object} 返回修改设备组数据
   */
  putDeviceGroup(groupid:any,groupname:any,parentid:any){
    // let option=new RequestOptions({headers:this.putHeader})
    let params=new HttpParams().set('group_id',groupid).set('group_name',groupname).set('parent_id',parentid)
    return new Promise(resolve=>{
      this.http.post(ipconfig()+'/udevicegroups',{group_id:groupid,group_name:groupname,parent_id:parentid},{headers:this.postHeader}).subscribe(data=>{
        console.log(data);
        resolve(data)
        
      })
    })
    
  }
  // 增加
  postDeviceGroup(groupname:any,parentid:any){
    return new Promise(resolve=>{
      this.http.post(ipconfig()+'/devicegroups',{group_name:groupname,parent_id:parentid},{headers:this.postHeader}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  // 删除
  delDeviceGroup(groupid:any,groupname:any,parentid:any){
    return new Promise(resolve=>{
      let params=new HttpParams().set('group_id',groupid).set('group_name',groupname).set('parent_id',parentid)
      this.http.delete(ipconfig()+'/devicegroups',{headers:this.getHeader,params:params}).subscribe(data=>{
        console.log(data);
        resolve(data)
      })
    })
    
  }
  // 修改设备
  putDevice(deviceid:any,devicename:any,devicekey:any,isrecord:boolean,groupid:any,protocolname:any){
    return new Promise(resolve=>{
      this.http.post(ipconfig()+'/udevices',{device_id:deviceid,device_name:devicename,device_key:devicekey,is_record:isrecord,group_id:groupid,protocol_name:protocolname,user_id:this.userid},{headers:this.postHeader}).subscribe(data=>{
        // console.log(data);
        resolve(data)
      })
    })
    
  }
  // 获取设备信息
  getDevice(groupid:any){
    let params=new HttpParams().set('group_id',groupid)
    return new Promise(resolve=>{
      this.http.get(ipconfig()+'/devices',{headers:this.getHeader,params:params}).subscribe(data=>{
        resolve(data)
      })
    })
    
  }
  // 增加设备
  postDevice(devicename:any,devicekey:any,isrecord:any,groupid:any,protocolname:any){
    return new Promise(resolve=>{
      this.http.post(ipconfig()+'/devices',{device_name:devicename,device_key:devicekey,is_record:isrecord,group_id:groupid,protocol_name:protocolname,user_id:this.userid},{headers:this.postHeader}).subscribe(data=>{
        console.log(data);
        resolve(data)
      })
    })
    
  }
  // 获取设备详情
  getDeviceCon(deviceid:any){
    let params=new HttpParams().set('device_id',deviceid)
    return new Promise(resolve=>{
      this.http.get(ipconfig()+'/devicebyid',{headers:this.getHeader,params:params}).subscribe(data=>{
        console.log(data);
        
        resolve(data)
      })
    })
  }
  getModelCon(modelid:any){
    let params=new HttpParams().set('model_id',modelid)
    return new Promise(resolve=>{
      this.http.get(ipconfig()+'/modelbyid',{headers:this.getHeader,params:params}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  // 删除设备
  delDevice(deviceid:any,devicename:any,devicekey:any,isrecord:any,groupid:any,protocolname:any){
    return new Promise(resolve=>{
      let params=new HttpParams().set('device_id',deviceid).set('device_name',devicename).set('device_key',devicekey).set('is_record',isrecord).set('group_id',groupid).set('protocol_name',protocolname).set('user_id',this.userid)
      this.http.delete(ipconfig()+'/devices',{headers:this.getHeader,params}).subscribe(data=>{
        // console.log(data);
        resolve(data)
      })
    })
    
  }
  // 通过设备id获取模块
  getModule(deviceid:any){
    return new Promise(resolve=>{
      let params=new HttpParams().set('device_id',deviceid)
      this.http.get(ipconfig()+'/module',{headers:this.getHeader,params:params}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  //
  postModule(modulename:any,deviceid:any,modelid:any){
    return new Promise(resolve=>{
      this.http.post(ipconfig()+'/module',{module_name:modulename,device_id:deviceid,model_id:modelid},{headers:this.postHeader}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  putModule(modulename:any,deviceid:any,modelid:any){
    return new Promise(resolve=>{
      this.http.post(ipconfig()+'/umodule',{module_name:modulename,device_id:deviceid,model_id:modelid},{headers:this.postHeader}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  delModule(modulename:any,deviceid:any,modelid:any){
    return new Promise(resolve=>{
      let params=new HttpParams().set('module_name',modulename).set('device_id',deviceid).set('model_id',modelid)
      this.http.delete(ipconfig()+'/module',{headers:this.getHeader,params:params}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  // 获取系统支持的协议列表
  /**
   * @method getArgumentsList
   * return {} 返回获取到的协议列表数据
   */
  getArgumentsList(){
    return new Promise(resolve=>{
      let params=new HttpParams()
      this.http.get(ipconfig()+'/protocols',{headers:this.getHeader,params:params}).subscribe(data=>{
        // console.log(data);
        resolve(data)
      }) 
    })
    
  }
  // 模型分组
  /**
   * 
   * @method getModelGroup
   * param {parentid} 父级id
   * return {data} 返回获取模型分组的数据
   */
  getModelGroup(parentid:any){
    return new Promise(resolve=>{
      let params=new HttpParams().set('parent_id',parentid)
      this.http.get(ipconfig()+'/modelgroups',{headers:this.getHeader,params:params}).subscribe(data=>{
        resolve(data)
      })
    })
    
  }
  /**
   * 
   * @method postModelGroup
   * param {groupname} 组名称
   * param {parentid} 父级id
   * return {data} 返回修改后的模型分组数据
   */
  postModelGroup(groupname:any,parentid:any){
    return new Promise(resolve=>{
      this.http.post(ipconfig()+'/modelgroups',{group_name:groupname,parent_id:parentid},{headers:this.postHeader}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  putModelGroup(groupid:any,groupname:any,parentid:any){
    return new Promise(resolve=>{
      this.http.post(ipconfig()+'/umodelgroups',{group_id:groupid,group_name:groupname,parent_id:parentid},{headers:this.postHeader}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  delModelGroup(groupid:any,groupname:any,parentid:any){
    return new Promise(resolve=>{
      let params=new HttpParams().set('group_id',groupid).set('group_name',groupname).set('parent_id',parentid)
      this.http.delete(ipconfig()+'/modelgroups',{headers:this.getHeader,params:params}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  // 模型
  getModel(groupid:any){
    return new Promise(resolve=>{
      let params=new HttpParams().set('group_id',groupid)
      this.http.get(ipconfig()+'/models',{headers:this.getHeader,params:params}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  postModel(modelname:any,groupid:any){
    return new Promise(resolve=>{
      this.http.post(ipconfig()+'/models',{model_name:modelname,group_id:groupid},{headers:this.postHeader}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  putModel(modelid:any,modelname:any,groupid:any){
    return new Promise(resolve=>{
      this.http.post(ipconfig()+'/umodels',{model_id:modelid,model_name:modelname,group_id:groupid},{headers:this.postHeader}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  delModel(modelid:any,modelname:any,groupid:any){
    return new Promise(resolve=>{
      let params=new HttpParams().set('model_id',modelid).set('model_name',modelname).set('group_id',groupid)
      this.http.delete(ipconfig()+'/models',{headers:this.getHeader,params:params}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  // 属性
  getAttr(modelid:any){
    return new Promise(resolve=>{
      let params=new HttpParams().set('model_id',modelid)
      this.http.get(ipconfig()+'/attrs',{headers:this.getHeader,params:params}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  postAttr(attrname:any,datatype:any,decimaldigits:any,rw:any,isrecord:boolean,ratio:any,modelid:any){
    return new Promise(resolve=>{
      let body={
        attr_name:attrname,data_type:datatype,decimal_digits:decimaldigits,rw:rw,is_record:isrecord,ratio:ratio,model_id:modelid
      }
      this.http.post(ipconfig()+'/attrs',body,{headers:this.postHeader}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  putAttr(attrname:any,datatype:any,decimaldigits:any,rw:any,isrecord:boolean,ratio:any,modelid:any){
    return new Promise(resolve=>{
      let body={
        attr_name:attrname,data_type:datatype,decimal_digits:decimaldigits,rw:rw,is_record:isrecord,ratio:ratio,model_id:modelid
      }
      this.http.post(ipconfig()+'/uattrs',body,{headers:this.postHeader}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  delAttr(attrname:any,datatype:any,decimaldigits:any,rw:any,isrecord:any,ratio:any,modelid:any){
    return new Promise(resolve=>{
      let params=new HttpParams().set('attr_name',attrname).set('data_type',datatype).set('decimal_digits',decimaldigits).set('rw',rw).set('is_record',isrecord).set('ratio',ratio).set('model_id',modelid)
      this.http.delete(ipconfig()+'/attrs',{headers:this.getHeader,params:params}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  // 根据属性获取联动列表
  getAttrLinkList(deviceid:any,modulename:any,attrname:any){
    return new Promise(resolve=>{
      let params=new HttpParams().set('from_device_id',deviceid).set('from_module_name',modulename).set('from_attr_name',attrname)
      this.http.get(ipconfig()+'/listlinkage',{headers:this.getHeader,params:params}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  // 添加联动
  addLink(fromdeviceid:any,frommodulename:any,fromattrname:any,condition:any,conditionvalue:any,todeviceid:any,tomodulename:any,toattrname:any,tovalue:any,todevicename:any){
    return new Promise(resolve=>{
      let body={
        from_device_id:fromdeviceid,from_module_name:frommodulename,from_attr_name:fromattrname,condition:condition,from_value:conditionvalue,to_device_id:todeviceid,to_module_name:tomodulename,to_attr_name:toattrname,to_value:tovalue,to_device_name:todevicename
      }
      this.http.post(ipconfig()+'/addlinkage',body,{headers:this.postHeader}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  // 删除联动
  delLink(fromdeviceid:any,frommodulename:any,fromattrname:any,condition:any,conditionvalue:any,todeviceid:any,tomodulename:any,toattrname:any,tovalue:any,todevicename:any){
    return new Promise(resolve=>{
      let body={
        from_device_id:fromdeviceid,from_module_name:frommodulename,from_attr_name:fromattrname,condition:condition,from_value:conditionvalue,to_device_id:todeviceid,to_module_name:tomodulename,to_attr_name:toattrname,to_value:tovalue,to_device_name:todevicename
      }
      this.http.post(ipconfig()+'/deletelinkage',body,{headers:this.postHeader}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  // 获取设备影子
  getDeviceShadow(deviceid:any,modulename:any,attrs:Array<String>){
    return new Promise(resolve=>{
      let params=new HttpParams().set('device_id',deviceid).set('module_name',modulename).set('attrs',JSON.stringify(attrs))
      let body={
        device_id:deviceid,module_name:modulename,attrs:attrs
      }
      this.http.post(ipconfig()+'/latestdata',body,{headers:this.postHeader}).subscribe(data=>{
        resolve(data)
      })
    })
  }
  // 格式化属组数据
  formatGroupData(data:any,parentname:any) {
    let temp = []
    if (data.length != 0) {
        for (let i = 0; i < data.length; i++) {
            temp.push({
          title:data[i].group_name,
          key:data[i].group_id,
          parentid:data[i].parent_id,
          ancestors:parentname,
          id:data[i].group_id,
          isLeaf:false
            })
        }
    } else {
        temp = []
    }
    return temp
}
formatData(data:any) {
  let temp = []
  if (data.length != 0) {
      for (let i = 0; i < data.length; i++) {
          temp.push({
        title:data[i].model_name,
        key:data[i].model_id,
        parentid:data[i].group_id,
        isLeaf:true,
       
          })
      }
  } else {
      temp = []
  }
  return temp
}
formatDeviceData(data:any){
  let temp=[];
  if(data.length!=0){
    for(let i=0;i<data.length;i++){
      temp.push({
        title:data[i].device_name,
        key:data[i].device_id,
        parentid:data[i].group_id,
        isLeaf:true,
        
      })
    }
  }else{
    temp=[]
  }
  return temp;
}
formatDate(date:any){
 
  if(date!=""){
    return this.datepipe.transform(new Date(Number(date)*1000),'YYYY-MM-dd HH:mm:ss')
  }
  return ""
}

/**
 * 检测是否由于汉字或者字母开头且不能有空格的字符串
 * @param {str} 字符串
 * @return {boolean} 
 */
reg(str:any){
  var re = /^[\u4E00-\u9FA5A-Za-z]\S{0,}$/;
  return re.test(str)

}
/**
 *  检测是否由六位字母和数字组成且可以包含特殊字符的字符串组成
 * @param {str} 字符串类型
 * @return {boolean} 
 */
regpsd(str:any){
  var re=/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9].{6,}$/
  // var re=/^$/
  return re.test(str)
}
/**
 * 判断是否是整数、0、浮点数
 * @param val 字符串
 * @return {boolean} 返回布尔类型值
 */
isNumber(val:any) {
  var regPos=/^[1-9]\d*\.\d+|0\.\d+[1-9]\d*|0|[1-9][0-9]*$/
   if(regPos.test(val) ) {
       return true;
       } else {
       return false;
       }
 } 
 /**
  * 判断是否是整数、0
  * @param val  字符串
  * @return {boolean} 返回布尔类型
  */
 isShuzi(val:any) {
   var regPos =/^(0|[1-9][0-9]*)$/;
   if(regPos.test(val) ) {
     return true;
     } else {
     return false;
     }
 }
}
