#!/usr/bin/env node
import { App } from "aws-cdk-lib";
import { CodePipelineSource } from "aws-cdk-lib/pipelines";
import { CorePipeline } from "../lib/pipeline/pipeline-stack";

const app = new App();

new CorePipeline(app, "CorePipeline", {
  repoLocation: CodePipelineSource.gitHub("CodingNinja/testcdk", "master"),
  cidr: "10.0.0.0/24",
});

app.synth();
