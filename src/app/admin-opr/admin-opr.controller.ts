import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminOprService } from './admin-opr.service';
import { ApiParam } from '@nestjs/swagger';

@Controller('admin-opr')
export class AdminOprController {
  constructor(private readonly adminOprService: AdminOprService) {}
  @ApiParam({ name: 'org', required: true, type: 'string' })
  @Get('/ccp/:org')
   getCcpOrg(@Param('org') org:string) {
    console.log('org1',org);
    return this.adminOprService.getCCPOrg(org);
  }

  @Get('/ca-client/:org')
  @ApiParam({ name: 'org', required: true, type: 'string' })
   getCaClient(@Param('org') org) {
    console.log('org1',org);
    return this.adminOprService.getCAForOrg(org);
  }

  @Get('/wallet/:org')
  @ApiParam({ name: 'org', required: true, type: 'string' })
   createWalletForOrg(@Param('org') org) {
    return this.adminOprService.createWalletForOrg(org);
  }

  @Get('/createadmin/:org')
  @ApiParam({ name: 'org', required: true, type: 'string' })
   createAdminForOrg(@Param('org') org) {
    return this.adminOprService.createAdminForOrg(org);
  }

  @Get('/registerUser/:org')
  @ApiParam({ name: 'org', required: true, type: 'string' })
   createUserForOrg(@Param('org') org) {
    return this.adminOprService.createUserForOrg(org);
  }

  @Get('/getwayOrgUser/:org')
  @ApiParam({ name: 'org', required: true, type: 'string' })
   getWayForOrgUser(@Param('org') org) {
    return this.adminOprService.createGetWayForOrgUser(org);
  }
  @Get('/chaincodeOrgUser/:org')
  @ApiParam({ name: 'org', required: true, type: 'string' })
   getChaincodeForOrgUser(@Param('org') org) {
    return this.adminOprService.createGetWayForOrgUser(org);
  }

}
