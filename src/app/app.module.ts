import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData,DatePipe } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LeftnavComponent } from './components/leftnav/leftnav.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { DeviceComponent } from './components/device/device/device.component';
import { DevicegroupComponent } from './components/device/devicegroup/devicegroup.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { ModuleComponent } from './components/module/module/module.component';
import { ModulegroupComponent } from './components/module/modulegroup/modulegroup.component';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ModelComponent } from './components/model/model/model.component';
import { ModelgroupComponent } from './components/model/modelgroup/modelgroup.component';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { AttrComponent } from './components/model/attr/attr.component';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import {LinkComponent} from './components/module/link/link.component';
import { ShadowComponent } from './components/module/shadow/shadow.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { LoginComponent } from './components/login/login.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LeftnavComponent,
    TopnavComponent,
    DeviceComponent,
    DevicegroupComponent,
    ModuleComponent,
    ModulegroupComponent,
    ModelComponent,
    ModelgroupComponent,
    AttrComponent,
    LinkComponent,
    ShadowComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzMenuModule,
    NzIconModule,
    NzDropDownModule,
    NzToolTipModule,
    NzTreeModule,
    NzButtonModule,
    NzFormModule,
    NzTableModule,
    NzInputModule,
    NzSelectModule,
    NzTreeSelectModule,
    NzCascaderModule,
    NzMessageModule
  
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN },DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
