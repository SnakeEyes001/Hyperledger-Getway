import { Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { prettyJSONString } from 'src/utils/AppUtil';
import { UpdateAssetDto, newAssetDto } from './dto/assetDto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserChaincodeFunctions, functionNames } from 'src/utils/Constants';
// ESM
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { parse, stringify, toJSON, fromJSON } from 'flatted';

@Injectable()
export class InteractionService {
  constructor(
    private adminService: AdminService,
    private AdminOprService: AdminService,
  ) {}

  async InitLedger(org: string) {
    const contract = await this.AdminOprService.getChainCodeForOrgUser(org);
    console.log('contract :', contract);
    console.log(
      '\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger',
    );
    const res = await contract.submitTransaction('InitLedger');
    console.log('*** Result: committed');

    return res;
  }

  async getAllAssets(org: string) {
    const contract = await this.AdminOprService.getChainCodeForOrgUser(org);
    // Let's try a query type operation (function).
    // This will be sent to just one peer and the results will be shown.
    console.log(
      '\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger',
    );
    console.log('0');
    const result = await contract.evaluateTransaction('GetAllAssets');
    console.log('1');
    console.log(`*** Result: ${prettyJSONString(result.toString())}`);
    console.log('2');
    return prettyJSONString(result.toString());
  }

  async createAsset(org: string, newAssetModel: newAssetDto) {
    const contract = await this.adminService.getChainCodeForOrgUser(org);
    // Now let's try to submit a transaction.
    // This will be sent to both peers and if both peers endorse the transaction, the endorsed proposal will be sent
    // to the orderer to be committed by each of the peer's to the channel ledger.
    console.log(
      '\n--> Submit Transaction: CreateAsset, creates new asset with ID, color, owner, size, and appraisedValue arguments',
    );
    const res = await contract.submitTransaction(
      functionNames.CreateAsset,
      newAssetModel.ID,
      newAssetModel.Color,
      newAssetModel.Size,
      newAssetModel.Owner,
      newAssetModel.AppraisedValue,
    );
    console.log('*** Result: committed');
    return res;
  }

  async getAssetById(org: string, assetId: string) {
    const contract = await this.AdminOprService.getChainCodeForOrgUser(org);
    console.log(
      '\n--> Evaluate Transaction: ReadAsset, function returns an asset with a given assetID',
    );
    const result = await contract.evaluateTransaction(
      functionNames.getAssetById,
      assetId,
    );
    console.log(`*** Result: ${JSON.parse(JSON.stringify(result.toString()))}`);

    return prettyJSONString(result.toString());
  }

  async assetExist(org: string, assetId = 'asset1') {
    const contract = await this.AdminOprService.getChainCodeForOrgUser(org);
    console.log(
      '\n--> Evaluate Transaction: AssetExists, function returns "true" if an asset with given assetID exist',
    );
    const result = await contract.evaluateTransaction(
      functionNames.AssetExists,
      assetId,
    );
    console.log(`*** Result: ${prettyJSONString(result.toString())}`);
    return prettyJSONString(result.toString());
  }
  //stlsca.org1.example.com-cert
  async updateAsset(
    org: string,
    assetId: string,
    updateAssetModel: UpdateAssetDto,
  ) {
    const contract = await this.AdminOprService.getChainCodeForOrgUser(org);
    console.log(
      '\n--> Submit Transaction: UpdateAsset asset1, change the appraisedValue to 350',
    );
    const result = await contract.submitTransaction(
      functionNames.UpdateAsset,
      assetId,
      updateAssetModel.Color,
      updateAssetModel.Size,
      updateAssetModel.Owner,
      updateAssetModel.AppraisedValue,
    );
    console.log('*** Result: committed');
    return prettyJSONString(result.toString());
  }

  async transferAsset(org: string, owner: string, assetId: string) {
    const contract = await this.AdminOprService.getChainCodeForOrgUser(org);
    console.log(
      '\n--> Submit Transaction: TransferAsset asset1, transfer to new owner of Tom',
    );
    const result = await contract.submitTransaction(
      functionNames.TransferAsset,
      assetId,
      owner,
    );
    console.log('*** Result: committed');
    return JSON.parse(JSON.stringify(result.toString()))
  }
}
