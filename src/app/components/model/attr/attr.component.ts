import { Component, OnInit,Input,Output, SimpleChange } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { NgZone } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-attr',
  templateUrl: './attr.component.html',
  styleUrls: ['./attr.component.css']
})
export class AttrComponent implements OnInit {
 
  public delflag = false;
  public searchattrname:any;
  public listOfData: any;
  public addmodelflag = false;
  public attrname: any;
  public attrflag: any;
  public modelid: any;
  public ismodelflag: any;
  public modelgroupname:any;

  public datatype:any;
  public dec:any;//保留小数位
  public readwriteprop:any;//读写属性
  public ishistory:any;
  public ratio:any;//倍率
  
  public pmodelid:any;
  public pmodelname:any;
  public oldAttrName:any;
  public oldDatatype:any;
  public oldDec:any;
  public oldisHistory:any;
  public oldRatio:any;
  public oldreadwriteprop:any;
  constructor(
    public service: ServiceService,
    public zone: NgZone,
    private route: ActivatedRoute,
    public router:Router,
    private message: NzMessageService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async data=>{
      this.modelid=data['modelid']
      this.pmodelid=data['pmodelid']
      this.pmodelname=data['pmodelname']
      this.listOfData = await this.service.getAttr(this.modelid);
    });

  } 
  async delsure() {
    let temp=false
    if(this.ishistory=='true'){
      temp=true
    }else if(this.ishistory=='false'){
      temp=false
    }
     if (this.ismodelflag == '删除模型') {
       let data=JSON.parse(JSON.stringify(await this.service.delAttr(this.attrname,this.datatype,Number(this.dec),Number(this.readwriteprop),temp,Number(this.ratio),this.modelid)))
       if(data['msg']=='success'){
        this.listOfData = await this.service.getAttr(this.modelid);
        //  alert('删除数据成功')
       }else{
        this.message.create('error', `删除属性失败`);
       }
     }
    this.delflag = false;
  }
 
 
  hiddendel() {
    this.delflag = false;
  }
  search() {
    let temp = [];
    for (let i = 0; i < this.listOfData.length; i++) {
      if (this.searchattrname == this.listOfData[i].attr_name) {
        temp.push(this.listOfData[i]);
      }
    }
    this.listOfData = temp;
  }
  addattr() {
    this.addmodelflag = true;
    this.attrflag = '添加属性';
    this.attrname="";
    this.datatype=""
    this.dec=""
    this.readwriteprop=""
    this.ishistory=""
    this.ratio=""
  }
  async sureaddattr() {
    let temp=false
    let oldtemp=false
    if(this.ishistory=='true'){
      temp=true
    }else if(this.ishistory=='false'){
      temp=false
    }
    if(this.oldisHistory=='true'){
      oldtemp=true
    }else if(this.oldisHistory=='false'){
      oldtemp=false
    }
   
    if (this.attrflag == '添加属性') {
      if(this.attrname!=''&&this.datatype!=''&&this.isShuzi(this.dec)==true&&this.readwriteprop!=''&&this.ishistory!=''&&this.isNumber(this.ratio)==true){
        let data=JSON.parse(JSON.stringify(await this.service.postAttr(this.attrname,this.datatype,Number(this.dec),Number(this.readwriteprop),temp,Number(this.ratio),this.modelid)))
        if(data['msg']=='success'){
          this.listOfData = await this.service.getAttr(this.modelid);
        }else{
          this.message.create('error', `添加属性失败`);
        }
        this.addmodelflag = false;
      }
    } else if (this.attrflag == '编辑属性') {
      if(this.attrname!=''&&this.datatype!=''&&this.isShuzi(this.dec)==true&&this.readwriteprop!=''&&this.ishistory!=''&&this.isNumber(this.ratio)==true){
        let data=JSON.parse(JSON.stringify(await this.service.putAttr(this.attrname,this.datatype,Number(this.dec),Number(this.readwriteprop),temp,Number(this.ratio),this.modelid)))
      if(data['msg']=='success'){
        let test=await this.service.delAttr(this.oldAttrName,this.oldDatatype,Number(this.oldDec),Number(this.oldreadwriteprop),oldtemp,Number(this.oldRatio),this.modelid)

        await this.service.postAttr(this.attrname,this.datatype,Number(this.dec),Number(this.readwriteprop),temp,Number(this.ratio),this.modelid)
        this.listOfData = await this.service.getAttr(this.modelid);
      }else{
        this.message.create('error', `编辑属性失败`);
      }
      this.addmodelflag = false;
      } 
    }

   
  }
  cancleaddmodel() {
    this.addmodelflag = false;
  }
  editarrt(data: any) {
    this.attrflag = '编辑属性';
    this.addmodelflag = true;
    this.attrname=data.attr_name;
    this.oldAttrName=data.attr_name;
    this.datatype=data.data_type;
    this.oldDatatype=data.data_type;
    this.dec=data.decimal_digits;
    this.oldDec=data.decimal_digits;
    if(data.is_record==true){
      this.ishistory='true'
      this.oldisHistory='true'
    }else if(data.is_record==false){
      this.ishistory='false'
      this.oldisHistory='false'
    }
    if(data.rw==0){
      this.readwriteprop='0'
      this.oldreadwriteprop='0'
    }else if(data.rw==1){
      this.readwriteprop='1'
      this.oldreadwriteprop='1'
    }else if(data.rw==2){
      this.readwriteprop='2'
      this.oldreadwriteprop='2'
    }
    this.ratio=data.ratio;
    this.oldRatio=data.ratio
   
  }
  delattr(data: any) {
    this.ismodelflag = '删除模型';
    this.delflag = true;
    // this.attrflag = '编辑属性';

    this.attrname=data.attr_name;
    this.datatype=data.data_type;
    this.dec=data.decimal_digits;
    if(data.is_record==true){
      this.ishistory='true'
    }else if(data.is_record==false){
      this.ishistory='false'
    }
    if(data.rw==0){
      this.readwriteprop='0'
    }else if(data.rw==1){
      this.readwriteprop='1'
    }else if(data.rw==2){
      this.readwriteprop='2'
    }
    this.ratio=data.ratio;
    
  }
  // 查看设备详情
  async getdevicecon(value:any){

    this.modelid=value.device_id;
    let data=await this.service.getDeviceCon(this.modelid)
    
  }
  async getAttr(value:any){
    this.modelid=value.model_id;
    this.router.navigate(['/attr', { modelid: this.modelid }]);
  }
  isNumber(val:any) {
   var regPos=/^[1-9]\d*\.\d+|0\.\d+[1-9]\d*|0|[1-9][0-9]*$/
    if(regPos.test(val) ) {
        return true;
        } else {
        return false;
        }
  } 
  isShuzi(val:any) {
    var regPos =/^(0|[1-9][0-9]*)$/;
    if(regPos.test(val) ) {
      return true;
      } else {
      return false;
      }
  }
  fnToModel(){
    this.router.navigate(['/model',{modelid:this.pmodelid,modelgroupname:this.pmodelname}])
  }
}






