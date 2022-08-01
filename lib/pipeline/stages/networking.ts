import { CfnOutput, StackProps, Stage, StageProps } from "aws-cdk-lib";
import { IVpc } from "aws-cdk-lib/aws-ec2";
import { CfnCACertificate } from "aws-cdk-lib/aws-iot";
import { Construct } from "constructs";
import { ControlPlaneStack } from "../../stacks/control-plane-stack";
import { NetworkingStack } from "../../stacks/networking-stack";

interface EnvironmentPipelineStageProps extends StackProps {
  cidr: string;
}

export class EnvironmentPipelineStage extends Stage {
  public readonly vpcId: CfnOutput;
  constructor(
    scope: Construct,
    id: string,
    props: EnvironmentPipelineStageProps
  ) {
    super(scope, id, props);

    const nwStack = new NetworkingStack(this, "Networking", {
      cidr: props.cidr
    });

    this.vpcId = new CfnOutput(nwStack, "VpcId", {
      value: nwStack.vpc.vpcId,
    });

    new ControlPlaneStack(this, "ControlPlane", {
      vpc: nwStack.vpc,
    });
  }
}
