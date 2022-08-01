#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { MultiCloudArchStack } from '../lib/multi-cloud-arch-stack';

const app = new cdk.App();
new MultiCloudArchStack(app, 'MultiCloudArchStack');
