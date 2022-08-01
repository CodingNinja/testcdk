import { StackProps, Stage, StageProps } from "aws-cdk-lib";
import { IVpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { ControlPlaneStack } from "../../stacks/control-plane-stack";
import { NetworkingStack } from "../../stacks/networking-stack";

interface EnvironmentPipelineStageProps extends StackProps {
  cidr: string;
}

export class EnvironmentPipelineStage extends Stage {
  public readonly vpc: IVpc;
  constructor(
    scope: Construct,
    id: string,
    props: EnvironmentPipelineStageProps
  ) {
    super(scope, id, props);

    const nwStack = new NetworkingStack(this, "Networking", {
      cidr: props.cidr
    });

    this.vpc = nwStack.vpc


    new ControlPlaneStack(this, "ControlPlane", {
      vpc: nwStack.vpc,
    });
  }
}
