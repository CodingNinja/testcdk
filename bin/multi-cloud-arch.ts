#!/usr/bin/env node
import { App, Aspects, Aws, SecretValue } from "aws-cdk-lib";
import { CodePipelineSource } from "aws-cdk-lib/pipelines";
import { CorePipeline } from "../lib/pipeline/pipeline-stack";
import { AwsSolutionsChecks } from "cdk-nag";


const app = new App();

new CorePipeline(app, "CorePipeline", {
  repoLocation: CodePipelineSource.connection("CodingNinja/testcdk", "master", {
    connectionArn: `arn:aws:codestar-connections:${Aws.REGION}:${Aws.ACCOUNT_ID}:connection/a1aac0e7-b3c0-4711-9cf1-dce54415ba0c`,
  }),
  cidr: "10.0.0.0/24",
});

// Aspects.of(app).add(new AwsSolutionsChecks());


app.synth();
