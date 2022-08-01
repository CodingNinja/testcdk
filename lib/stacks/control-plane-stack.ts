import { Stack, StackProps } from "aws-cdk-lib";
import { IVpc } from "aws-cdk-lib/aws-ec2";
import { AlbControllerVersion, FargateCluster, KubernetesVersion } from "aws-cdk-lib/aws-eks";
import { Construct } from "constructs";

interface ControlPlaneStackProps extends StackProps {
  vpc: IVpc
}

export class ControlPlaneStack extends Stack {
  constructor(scope: Construct, id: string, props: ControlPlaneStackProps) {
    super(scope, id, props);

    new FargateCluster(this, "Control", {
      version: KubernetesVersion.V1_21,
      albController: {
        version: AlbControllerVersion.V2_4_1,
      },
      vpc: props.vpc
    })
  }
}
