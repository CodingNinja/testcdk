import { Stack, StackProps } from "aws-cdk-lib";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

interface NetworkingStackProps extends StackProps {
  cidr: string;
}

export class NetworkingStack extends Stack {

  public readonly vpc: Vpc

  constructor(scope: Construct, id: string, props: NetworkingStackProps) {
    super(scope, id, props);

    this.vpc = new Vpc(this, "my-cdk-vpc", {
      cidr: props?.cidr,
    });
  }
}
