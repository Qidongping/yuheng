import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceComponent } from './components/device/device/device.component';
import { DevicegroupComponent } from './components/device/devicegroup/devicegroup.component';
import { ModuleComponent } from './components/module/module/module.component';
import { ModelComponent } from './components/model/model/model.component';
import { ModelgroupComponent } from './components/model/modelgroup/modelgroup.component';
import { AttrComponent } from './components/model/attr/attr.component';
import {LinkComponent} from './components/module/link/link.component';
import { ShadowComponent } from './components/module/shadow/shadow.component'
const routes: Routes = [
  {path:'devicegroup',component:DevicegroupComponent},
  {path:'device',component:DeviceComponent},
  {path:'module',component:ModuleComponent},
  {path:'modelgroup',component:ModelgroupComponent},
  {path:'model',component:ModelComponent},
  {path:'attr',component:AttrComponent},
  {path:'link',component:LinkComponent},
  {path:'shadow',component:ShadowComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
