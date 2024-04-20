import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { UpdateAssetDto, newAssetDto } from './dto/assetDto';

@Controller('interaction')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}


  @Get('initLedger/:org')
  @ApiParam({ name: 'org', required: true, type: 'string' })
  setLedager(@Param('org') org) {
    return this.interactionService.InitLedger(org);
  }

  @Get('allAssets/:org')
  @ApiParam({ name: 'org', required: true, type: 'string' })
  getAllAssets(@Param('org') org) {
    return this.interactionService.getAllAssets(org);
  }

  @Post('/newAsset/:org')
  @ApiBody({ type: newAssetDto })
  @ApiParam({ name: 'org', required: true, type: 'string' })
  createNewAsset(@Body() newAsset: newAssetDto, @Param('org') org: string) {
    return this.interactionService.createAsset(
      org,
      newAsset,
    );
  }

  @Get('/asset/:org/:assetId')
  @ApiParam({ name: 'org', required: true, type: 'string' })
  @ApiParam({ name: 'assetId', required: true, type: 'string' })
  getAssetById( @Param('org') org: string, @Param('assetId') assetId: string) {
    return this.interactionService.getAssetById(org,assetId);
  }

  @Get('/assetExiste/:org/:assetId')
  @ApiParam({ name: 'org', required: true, type: 'string' })
  @ApiParam({ name: 'assetId', required: true, type: 'string' })
  assetExiste(@Param('org') org: string, @Param('assetId') assetId: string) {
    return this.interactionService.assetExist(org,assetId);
  }

  @Patch('/updateAsset/:org/:assetId')
  @ApiParam({ name: 'org', required: true, type: 'string' })
  @ApiParam({ name: 'assetId', required: true, type: 'string' })
  updateAsset(
    @Param('org') org: string,
    @Param('assetId') assetId: string,
    @Body() updatedAsset: UpdateAssetDto,
  ) {
    return this.interactionService.updateAsset(org,assetId, updatedAsset);
  }

  @Post('/transfer-asset/:org/:owner/:assetId')
  @ApiParam({ name: 'org', required: true, type: 'string' })
  @ApiParam({ name: 'owner', required: true, type: 'string' })
  @ApiParam({ name: 'assetId', required: true, type: 'string' })
  transferAsset(
    @Param('org') org: string,
    @Param('owner') owner: string,
    @Param('assetId') assetId: string,
  ) {
    return this.interactionService.transferAsset(org,owner,assetId)
  }
}
