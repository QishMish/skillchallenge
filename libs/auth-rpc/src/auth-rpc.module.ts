import { RmqModule } from "@app/rmq";
import { Module } from "@nestjs/common";
import { AuthRpcService } from "./auth-rpc.service";

@Module({
  imports: [RmqModule.register({ name: "AUTH" })],
  providers: [AuthRpcService],
  exports: [AuthRpcService],
})
export class AuthRpcModule {}
