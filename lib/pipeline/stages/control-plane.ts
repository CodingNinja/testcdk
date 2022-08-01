import { StackProps, Stage, StageProps } from "aws-cdk-lib";
import { IVpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { ControlPlaneStack } from "../../stacks/control-plane-stack";
import { NetworkingStack } from "../../stacks/networking-stack";

interface ControlPlanePipelineStageProps extends StackProps {
  vpc: IVpc
}

export class ControlPlanePipelineStage extends Stage {
  constructor(
    scope: Construct,
    id: string,
    props: ControlPlanePipelineStageProps
  ) {
    super(scope, id, props);


    new ControlPlaneStack(this, "ControlPlane", {
      vpc: props.vpc,
    });
  }
}
