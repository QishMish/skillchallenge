import { INestApplication, Logger } from "@nestjs/common";
import { Request, Response } from "express";
import { ClientRequest } from "http";
import { ServerOptions } from "http-proxy";
import { createProxyMiddleware } from "http-proxy-middleware";

export interface ProxyRoutes extends ServerOptions {
  prefix: string;
}

export class UseProxyRouting {
  static configure(app: INestApplication, proxyRoutes: ProxyRoutes[]) {
    proxyRoutes.forEach((routeOptions) => {
      const proxyMiddleware = createProxyMiddleware({
        ...routeOptions,
        changeOrigin: routeOptions.changeOrigin
          ? routeOptions.changeOrigin
          : true,
        onProxyReq(proxyReq: ClientRequest, req: Request) {
          Logger.log(proxyReq.method, proxyReq.host, proxyReq.path);
        },
        onError(err: Error) {
          Logger.error(err);
        },
      });
      app.use(routeOptions.prefix, proxyMiddleware);
    });
  }
}
