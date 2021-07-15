import { Component, OnInit,Input,Output, SimpleChange } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { NgZone } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  public devicegroupid:any;
  public getDeviceID:any;
  public groupname: any;
  public delflag = false;
 
  public listOfData: any;
  public searchdevicename: any;
  public history: any;
  public adddeviceflag = false;
  public devicename: any;
  public protocolname: any;
  public protocolList: any;
  public devicepsd: any;
  public deviceflag: any;
  public deviceid: any;
  public isdeviceflag: any;
  public removeflag=false;
  public treetitle:any;
  public devicegroupname:any;
  public treeflag=false;
  public removegroupdeviceid:any;
  public parentname:any;
  public nodes = [
    {
      title: '设备管理',
      key: '4cb9f035-52c0-478f-86df-c4239a59561c',
      value:'4cb9f035-52c0-478f-86df-c4239a59561c',
      isLeaf: false,
      parentid: '4cb9f035-52c0-478f-86df-c4239a59561c',
    },
  ];
  constructor(
    public service: ServiceService,
    public zone: NgZone,
    private route: ActivatedRoute,
    public router:Router,
    private message: NzMessageService
  ) {}

  async ngOnInit() {
   
    this.protocolList = await this.service.getArgumentsList();
   
    this.route.params.subscribe(async data=>{
      this.devicegroupid=data['pid'];
      this.parentname=data['pname']
      this.listOfData = await this.service.getDevice(this.devicegroupid);
    });
  }
 
  async delsure() {
     if (this.isdeviceflag == '删除设备') {
      let temp: any;
      if (this.history == 'true') {
        temp = true;
      } else if (this.history == 'false') {
        temp = false;
      }
      let data = JSON.parse(
        JSON.stringify(
          await this.service.delDevice(
            this.deviceid,
            this.devicename,
            this.devicepsd,
            temp,
            this.devicegroupid,
            this.protocolname
          )
        )
      );
      if (data['msg'] == 'success') {
        this.listOfData = await this.service.getDevice(this.devicegroupid);
      } else {
        this.message.create('error', `删除设备失败`);
      }
    }
    this.delflag = false;
  }
 
  delDropdown() {
  
    this.delflag = true;
    this.isdeviceflag = '删除分组';
  }
  hiddendel() {
    this.delflag = false;
  }
  search() {
    let temp = [];
    for (let i = 0; i < this.listOfData.length; i++) {
      if (this.searchdevicename == this.listOfData[i].device_name) {
        temp.push(this.listOfData[i]);
      }
    }
    this.listOfData = temp;
  }
  adddevice() {
    this.adddeviceflag = true;
    this.deviceflag = '添加设备';
    this.devicename=""
    this.devicepsd=""
    this.history=""
    this.protocolname=""
  }
  async sureadddevice() {
    let temp: any;
    if (this.history == 'true') {
      temp = true;
    } else if (this.history == 'false') {
      temp = false;
    }
    if (this.deviceflag == '添加设备') {
      if(this.devicename!=''&&this.devicepsd!=''&&this.history!=""&&this.protocolname!=''){
        let data = JSON.parse(
          JSON.stringify(
            await this.service.postDevice(
              this.devicename,
              this.devicepsd,
              temp,
              this.devicegroupid,
              this.protocolname
            )
          )
        );
  
        if (data['msg'] == 'success') {
          this.listOfData = await this.service.getDevice(this.devicegroupid);
        } else {
          this.message.create('error', `添加设备失败`);
        }
        this.adddeviceflag = false;
      }
      
    } else if (this.deviceflag == '编辑设备') {
      if(this.devicename!=""&&this.devicepsd!=""&&this.history!=""&&this.protocolname!=""){
        let data = JSON.parse(
          JSON.stringify(
            await this.service.putDevice(
              this.deviceid,
              this.devicename,
              this.devicepsd,
              temp,
              this.devicegroupid,
              this.protocolname
            )
          )
        );
        if (data['msg'] == 'success') {
     
          this.listOfData = await this.service.getDevice(this.devicegroupid);
          console.log(this.listOfData);
          
        } else {
          this.message.create('error', `编辑设备失败`);
        }
        this.adddeviceflag = false;
      }
     
    }

   
  }
  cancleadddevice() {
    this.adddeviceflag = false;
  }
  editdevice(data: any) {
    this.deviceflag = '编辑设备';
    this.adddeviceflag = true;
    this.deviceid = data.device_id;
    this.devicepsd = data.device_key;
    this.devicename = data.device_name;
    this.protocolname = data.protocol_name;
    if (data.is_record == true) {
      this.history = 'true';
    } else if (data.is_record == false) {
      this.history = 'false';
    }
  }
  deldevice(data: any) {
    this.isdeviceflag = '删除设备';
    this.delflag = true;
    this.deviceid = data.device_id;
    this.devicepsd = data.device_key;
    this.devicename = data.device_name;
    this.protocolname = data.protocol_name;
    if (data.is_record == true) {
      this.history = 'true';
    } else if (data.is_record == false) {
      this.history = 'false';
    }
  }
  // 查看设备详情
  async getdevicecon(value:any){

    this.deviceid=value.device_id;
    let data=await this.service.getDeviceCon(this.deviceid)
    
  }
  async getModule(value:any){
    console.log(value);
    this.deviceid=value.device_id;
    this.router.navigate(['/module', { deviceid: this.deviceid,devicename:value.device_name,groupid:value.group_id,pname:this.parentname }]);
  }
  removedevice(data:any){
    this.removegroupdeviceid=data.group_id;
    this.removeflag=true;
    this.deviceid=data.device_id;
    this.devicepsd=data.device_key;
    this.devicename=data.device_name;
    this.protocolname=data.protocol_name;
   this.treetitle=this.parentname
    if(data.is_record==true){
      this.history='true'
    }else if(data.is_record==false){
      this.history='false'
    }
  }
  cancleremovedevice(){
    this.removeflag=false;
  }
  async sureremovedevice(){
    let temp: any;
    if (this.history == 'true') {
      temp = true;
    } else if (this.history == 'false') {
      temp = false;
    }
    if(this.devicegroupid!=this.removegroupdeviceid){
      let data=JSON.parse(JSON.stringify(await this.service.putDevice(this.deviceid,this.devicename,this.devicepsd,temp,this.removegroupdeviceid,this.protocolname)))
      if(data['msg']=='success'){
        this.listOfData = await this.service.getDevice(this.devicegroupid);
        this.removeflag=false
      }else{
        this.message.create('error', `移动设备失败`);
      }
    }
  }
  tree(){
    this.treeflag=true
  }
  hiddentree(){
    this.treeflag=false
  }
  nzEvent(event: NzFormatEmitEvent): void {
    const node = event.node;
    this.removegroupdeviceid=node?.key;
    if (node && node.getChildren().length === 0 && node.isExpanded) {
        this.loadNode().then((data) => {
          this.zone.run(() => {
            node.addChildren(data);
          });
        });
    }
  }
  async loadNode(): Promise<NzTreeNodeOptions[]> {
    let data = JSON.parse(
      JSON.stringify(await this.service.getDeviceGroup(this.removegroupdeviceid))
    );

    return new Promise(async (resolve) => {
        let arr: any[] | PromiseLike<NzTreeNodeOptions[]> = [];
        if (data.length != 0) {
          for (let i = 0; i < data.length; i++) {
            arr.push(data[i]);
          }
          arr = this.service.formatGroupData(arr, "");
        }
        
        resolve(arr);
    });
  }
  getDeviceGroup(node:any){
    this.treeflag=false
    this.removegroupdeviceid=node.key;
    this.treetitle=node.title
  }
}
