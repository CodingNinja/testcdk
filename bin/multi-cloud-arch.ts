#!/usr/bin/env node
import { App, Aspects, Aws, SecretValue } from "aws-cdk-lib";
import { CodePipelineSource } from "aws-cdk-lib/pipelines";
import { CorePipeline } from "../lib/pipeline/pipeline-stack";
import { AwsSolutionsChecks } from "cdk-nag";


const app = new App();

// This is the CodeConnect connection that will be used to clone the source repository
// containing the CfnStacks
const connectionUuid = "a1aac0e7-b3c0-4711-9cf1-dce54415ba0c"
const connectionArn = `arn:aws:codestar-connections:${Aws.REGION}:${Aws.ACCOUNT_ID}:connection/${connectionUuid}`;

new CorePipeline(app, "CorePipeline", {
  repoLocation: CodePipelineSource.connection("CodingNinja/testcdk", "master", {
    connectionArn: connectionArn,
  }),
  cidr: "10.0.0.0/24",
});

// Aspects.of(app).add(new AwsSolutionsChecks());


app.synth();
