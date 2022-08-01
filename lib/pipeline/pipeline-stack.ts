import { Construct } from "constructs";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Stack, StackProps, Stage } from "aws-cdk-lib";
import { EnvironmentPipelineStage } from "./stages/networking";

interface CorePipelineProps extends StackProps {
  cidr: string;
  repoLocation: CodePipelineSource;
}

export class CorePipeline extends Stack {
  constructor(scope: Construct, id: string, props: CorePipelineProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "Pipeline", {
      synth: new ShellStep("Synth", {
        input: props.repoLocation,
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    const networkingStage = new EnvironmentPipelineStage(this, "Environment", {
      cidr: props.cidr
    });

    pipeline.addStage(networkingStage);
    
  }
}
