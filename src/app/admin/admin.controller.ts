import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiParam } from '@nestjs/swagger';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @ApiParam({ name: 'org', required: true, type: 'string' })
  @Get('/ccp/:org')
   getCcpOrg(@Param('org') org:string) {
    console.log('org1',org);
    return this.adminService.getCCPOrg(org);
  }

  @Get('/ca-client/:org')
  @ApiParam({ name: 'org', required: true, type: 'string' })
   getCaClient(@Param('org') org) {
    console.log('org1',org);
    //return this.adminService.getCAForOrg(org);
  }

  @Get('/wallet/:org')
  @ApiParam({ name: 'org', required: true, type: 'string' })
   createWalletForOrg(@Param('org') org) {
    return this.adminService.createWalletForOrg(org);
  }

  @Get('/admin/:org')
  @ApiParam({ name: 'org', required: true, type: 'string' })
   createAdminForOrg(@Param('org') org) {
    return this.adminService.createAdminForOrg(org);
  }

  @Get('/admin/registerUser/:org')
  @ApiParam({ name: 'org', required: true, type: 'string' })
   createUserForOrg(@Param('org') org) {
    return this.adminService.createUserForOrg(org);
  }

  @Get('/admin/getwayOrgUser/:org')
  @ApiParam({ name: 'org', required: true, type: 'string' })
   getWayForOrgUser(@Param('org') org) {
    return this.adminService.createGetWayForOrgUser(org);
  }
  @Get('/admin/chaincodeOrgUser/:org')
  @ApiParam({ name: 'org', required: true, type: 'string' })
   getChaincodeForOrgUser(@Param('org') org) {
    return this.adminService.createGetWayForOrgUser(org);
  }
  @Get('/admin/chaincodeOrgUser/initleadger/:org')
  @ApiParam({ name: 'org', required: true, type: 'string' })
   getInitLeadger(@Param('org') org) {
    return this.adminService.InitLedger(org);
  }

  @Get('/admin/chaincodeOrgUser/allAssets/:org')
  @ApiParam({ name: 'org', required: true, type: 'string' })
   getAllAssets(@Param('org') org) {
    return this.adminService.getAllAssets(org);
  }
  
}
