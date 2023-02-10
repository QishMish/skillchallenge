import { NestFactory } from "@nestjs/core";
import { ApiGatewayModule } from "./api-gateway.module";
import { createProxyMiddleware } from "http-proxy-middleware";
import { Logger } from "@nestjs/common";
import { AuthorizationMiddleware } from "./middlewares";
import { UseProxyRouting , ProxyRoutes} from "./config";

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule)

  const globalPrefix = "api";

  app.setGlobalPrefix(globalPrefix);

  const proxyConfig = process.env.PROXY_CONFIG;
  const port = process.env.PORT || 5000;

  Logger.log(
    `🚀 Registering proxy routes: ${JSON.parse(proxyConfig)}`
  );

  //Proxy endpoints
  UseProxyRouting.configure(app, JSON.parse(proxyConfig));
  
  await app.listen(port);;

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}
bootstrap();
