import { Component,ViewChild} from '@angular/core';
import {ServiceService} from '../app/service.service'
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iot';
  public addflag=false;
  public delflag=false;
  public flag:any;
  public groupname:any;
  public parentid:any;
  public groupid:any;
  public navtitle=""
  public issure:any;
  public loginflag=false;
  public scaleFlag=false;

  constructor(public service:ServiceService,private message: NzMessageService) {

  }
  devicegroupid(){
  
  }
  hiddenadd(){
    this.addflag=false
  }
  async sure(){
    if(this.navtitle=='设备管理'){
      if(this.flag=='添加分组'){
        if(this.groupname!=''){
          let data = JSON.parse(
            JSON.stringify(
              await this.service.postDeviceGroup(this.groupname, this.groupid)
            )
          );
          this.addflag = false;
          if (data['msg'] == 'success') {
        }else{
          this.message.create('error', `添加分组失败`);
        }
        }
       
      }else if(this.flag=='编辑分组'){
          if(this.groupname!=""){
            let data = JSON.parse(
              JSON.stringify(
                await this.service.putDeviceGroup(
                  this.groupid,
                  this.groupname,
                  this.parentid
                )
              )
            );
            if(data['msg']=='success'){
            }else{
              this.message.create('error', `编辑分组失败`);
            }
            this.addflag = false;
          }
          }
            
    }else if(this.navtitle=='数据模型'){
      if(this.flag=='添加分组'){
        if(this.groupname!=""){
          let data = JSON.parse(
            JSON.stringify(
              await this.service.postModelGroup(this.groupname, this.groupid)
            )
          );
          this.addflag = false;
          if (data['msg'] == 'success') {
        }else{
        
          this.message.create('error', `添加分组失败`);
        }
        }
       
      }else if(this.flag=='编辑分组'){
        if(this.groupname!=""){
          let data = JSON.parse(
            JSON.stringify(
              await this.service.putModelGroup(
                this.groupid,
                this.groupname,
                this.parentid
              )
            )
          );
          if(data['msg']=='success'){
          }else{
            this.message.create('error', `编辑分组失败`);
            
          }
          this.addflag = false;
        }
        }
           
    }
    this.issure=true;
    
}
  hiddendel(){
this.delflag=false
  }
  async delsure(){
    if(this.navtitle=='设备管理'){
      let data = JSON.parse(
        JSON.stringify(
          await this.service.delDeviceGroup(
            this.groupid,
            this.groupname,
            this.parentid
          )
        )
      );
      if(data['msg']=='success'){
      }else{
        this.message.create('error', `删除分组失败`);
      }
      this.delflag=false
    }else if(this.navtitle=='数据模型'){
    
      let data = JSON.parse(
        JSON.stringify(
          await this.service.delModelGroup(
            this.groupid,
            this.groupname,
            this.parentid
          )
        )
      );
      if(data['msg']=='success'){
      }else{
        this.message.create('error', `删除分组失败`);
      }
      this.delflag=false
    }
        this.issure=true;

  }
  
  addModelGroup(value:any){
    this.addflag=value[0]
    this.parentid=value[1]
    this.flag=value[2]
    this.groupid=value[3]
    this.groupname=value[4]
    this.navtitle=value[5]
  }
  delModelGroup(value:any){
    this.delflag=value[0]
    this.groupid=value[1]
    this.parentid=value[2]
    this.groupname=value[3]
    this.navtitle=value[4]
  }
  scale(){
    this.scaleFlag=!this.scaleFlag
  }
  ngOnInit(){
    
    
  }
  
}
