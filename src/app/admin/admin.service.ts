import { Injectable } from '@nestjs/common';
import * as FabricCAServices from 'fabric-ca-client';
import { Gateway, GatewayOptions, Wallets } from 'fabric-network';
import * as fs from 'fs';
import * as path from 'path';
import {
  buildCAClient,enrollAdmin
} from '../../utils/CAUtil';
import { CAHostName, ChannelConfig, Config, MspOrgs, OrganizationUsers, walletBasePath } from 'src/utils/Constants';
import { buildWallet, prettyJSONString } from 'src/utils/AppUtil';
import {registerAndEnrollUser} from 'src/utils/CAUtil';

@Injectable()
export class AdminService {
  getCCPOrg = (org: string) : Record<string, any>=> {
    console.log('org',org)
    // load the common connection configuration file
    let ccpPath = null;
    org === 'Org1'
      ? (ccpPath = path.resolve(
      'src',
      'organizations',
      'peerOrganizations',
      'org1.example.com',
      'connection-org1.json',))
      : null;
    org === 'Org2'
      ? (ccpPath = path.resolve(
      'src',
      'organizations',
      'peerOrganizations',
      'org1.example.com',
      'connection-org2.json',))
      : null;
    const fileExists = fs.existsSync(ccpPath);
    if (!fileExists) {
      throw new Error(`no such file or directory: ${ccpPath}`);
    }
    const contents = fs.readFileSync(ccpPath, 'utf8');
    // build a JSON object from the file contents
    const ccp = JSON.parse(contents);
    console.log(`Loaded the network configuration located at ${ccpPath}`);
    return ccp;
  };

  getCAForOrg = (org: string) => {
    let hostName = null;
    const ccp = this.getCCPOrg(org);
    if(org == 'Org1'){
      hostName = CAHostName.caHostNameOrg1;
    }
    if(org == 'Org2')
    {
      hostName = CAHostName.caHostNameOrg2;
    }
    const ca = buildCAClient(ccp, hostName);
    return ca;
  };

  createWalletForOrg = async (org: string) => {
    const res = await buildWallet(walletBasePath, org);
    return res;
  };

  createAdminForOrg = async (org) => {
    const caClient = this.getCAForOrg(org);
    let wallet = null;
    let msp = null;
    if(org =='Org1'){
     wallet = await buildWallet(walletBasePath, org);
     msp = MspOrgs.MspOrg1;
    }
    if(org =='Org2'){
      wallet = await buildWallet(walletBasePath, org);
      msp = MspOrgs.MspOrg2;
     }
    const res = await enrollAdmin(caClient,wallet, msp)
    return res;
  };

  createUserForOrg = async (org:string) => {
    const caClient = this.getCAForOrg(org);
    let wallet = null;
    let res =null;
    if(org =='Org1'){
     wallet = await buildWallet(walletBasePath, org);
           // in a real application this would be done only when a new user was required to be added
    // and would be part of an administrative flow
    res = await registerAndEnrollUser(
      caClient,
      wallet,
      MspOrgs.MspOrg1,
      OrganizationUsers.org1UserId,
      'org1.department1',
    );
    }
    if(org =='Org2'){
      wallet = await buildWallet(walletBasePath, org);
            // in a real application this would be done only when a new user was required to be added
      // and would be part of an administrative flow
      res = await registerAndEnrollUser(
      caClient,
      wallet,
      MspOrgs.MspOrg2,
      OrganizationUsers.org2UserId,
      'org2.department2',
    );
    }
  }

  generateRandomId(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
  
    for (let i = 0; i < length; i++) {
      randomId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    return randomId;
  }

    async createGetWayForOrgUser(org: string)  {
      let _identity = null;
      if (org == 'Org1') {
        _identity = OrganizationUsers.org1UserId;
        const wallet = await buildWallet(walletBasePath, org);
        //const wallet = walletBasePath+org+userEmail
        // Create a new gateway instance for interacting with the fabric network.
        // In a real application this would be done as the backend server session is setup for
        // a user that has been verified.
        const getWay = new Gateway();
  
        const gatewayOpts: GatewayOptions = {
          wallet,
          identity: _identity,
          discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
        };
        return { getWay: getWay, gatewayOpts: gatewayOpts };
      }
      if (org == 'Org2') {
        _identity = OrganizationUsers.org2UserId;
        const wallet = await buildWallet(walletBasePath, org);
  
        // Create a new gateway instance for interacting with the fabric network.
        // In a real application this would be done as the backend server session is setup for
        // a user that has been verified.
        const getWay = new Gateway();
  
        const gatewayOpts: GatewayOptions = {
          wallet,
          identity:  _identity,
          discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
        };
        return { getWay: getWay, gatewayOpts: gatewayOpts };
      }
    }
    async getChainCodeForOrgUser(org: string) {
      const ccp = this.getCCPOrg(org);
      const way = await this.createGetWayForOrgUser(org);
  
      // setup the gateway instance
      // The user will now be able to create connections to the fabric network and be able to
      // submit transactions and query. All transactions submitted by this gateway will be
      // signed by this user using the credentials stored in the wallet.
      await way.getWay.connect(ccp, way.gatewayOpts);
  
      // Build a network instance based on the channel where the smart contract is deployed
      const network = await way.getWay.getNetwork(ChannelConfig.channelName);
  
      // Get the contract from the network.
      const contract = network.getContract(ChannelConfig.chaincodeName);
      //console.log('contract :', contract);
  
      return contract;
    }

    async getCarChainCodeForOrgUser(org: string) {
      const ccp = this.getCCPOrg(org);
      const way = await this.createGetWayForOrgUser(org);
  
      // setup the gateway instance
      // The user will now be able to create connections to the fabric network and be able to
      // submit transactions and query. All transactions submitted by this gateway will be
      // signed by this user using the credentials stored in the wallet.
      await way.getWay.connect(ccp, way.gatewayOpts);
  
      // Build a network instance based on the channel where the smart contract is deployed
      const network = await way.getWay.getNetwork(Config.channelName);
  
      // Get the contract from the network.
      const contract = network.getContract(Config.chaincodeName);
      //console.log('contract :', contract);
  
      return contract;
    }


    async InitLedger(org: string) {
      const contract = await this.getChainCodeForOrgUser(org);
      console.log('contract :', contract);
      console.log(
        '\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger',
      );
      const res = await contract.submitTransaction('InitLedger');
      console.log('*** Result: committed');
  
      return res;
    }

    async getAllAssets(org: string) {
      const contract = await this.getChainCodeForOrgUser(org);
      // Let's try a query type operation (function).
      // This will be sent to just one peer and the results will be shown.
      console.log(
        '\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger',
      );
      const result = await contract.evaluateTransaction('GetAllAssets');
      console.log(`*** Result: ${prettyJSONString(result.toString())}`);
  
      return prettyJSONString(result.toString());
    }
  };

