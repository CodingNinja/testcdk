import { CustomResource, Stack, StackProps } from "aws-cdk-lib";
import { IVpc } from "aws-cdk-lib/aws-ec2";
import { AlbControllerVersion, FargateCluster, HelmChart, ICluster, KubectlProvider, KubernetesManifest, KubernetesVersion } from "aws-cdk-lib/aws-eks";
import { Construct } from "constructs";

interface ControlPlaneStackProps extends StackProps {
  vpc: IVpc
}

export class ControlPlaneStack extends Stack {
  public readonly cluster: ICluster
  constructor(scope: Construct, id: string, props: ControlPlaneStackProps) {
    super(scope, id, props);

    this.cluster = new FargateCluster(this, "control-cluster", {
      version: KubernetesVersion.V1_21,
      albController: {
        version: AlbControllerVersion.V2_4_1,
      },
      vpc: props.vpc
    })

    // this.cluster.addHelmChart("foo", {
    //   chart: new HelmChart(this, "aoe", {

    //   })
    // })
  }
}
