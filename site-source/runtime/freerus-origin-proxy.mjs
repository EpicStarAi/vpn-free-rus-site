import http from "node:http";
import { URL } from "node:url";

const proxyPort = Number.parseInt(process.env.PROXY_PORT ?? "5174", 10);
const appPort = Number.parseInt(process.env.APP_PORT ?? "5175", 10);
const primaryHost = process.env.PRIMARY_HOST ?? "freerus.site";
const wwwHost = process.env.WWW_HOST ?? "www.freerus.site";

function getForwardedScheme(headers) {
  const forwardedProto = headers["x-forwarded-proto"];
  if (typeof forwardedProto === "string" && forwardedProto.length > 0) {
    return forwardedProto.split(",")[0]?.trim().toLowerCase();
  }

  const cfVisitor = headers["cf-visitor"];
  if (typeof cfVisitor === "string") {
    try {
      const parsed = JSON.parse(cfVisitor);
      if (typeof parsed.scheme === "string") {
        return parsed.scheme.toLowerCase();
      }
    } catch {
      return undefined;
    }
  }

  return undefined;
}

function getHostname(headers) {
  const forwardedHost = headers["x-forwarded-host"];
  const host = Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost ?? headers.host ?? "";
  return host.split(",")[0]?.trim().split(":")[0]?.toLowerCase() ?? "";
}

function shouldRedirect(headers) {
  const hostname = getHostname(headers);
  const scheme = getForwardedScheme(headers);

  return hostname === wwwHost || scheme === "http";
}

const server = http.createServer((request, response) => {
  if (shouldRedirect(request.headers)) {
    const target = new URL(request.url ?? "/", `https://${primaryHost}`);
    response.writeHead(301, {
      Location: target.toString(),
      "Cache-Control": "public, max-age=3600",
    });
    response.end();
    return;
  }

  const proxyRequest = http.request(
    {
      hostname: "127.0.0.1",
      port: appPort,
      method: request.method,
      path: request.url,
      headers: request.headers,
    },
    (proxyResponse) => {
      response.writeHead(proxyResponse.statusCode ?? 502, proxyResponse.headers);
      proxyResponse.pipe(response);
    },
  );

  proxyRequest.on("error", () => {
    response.writeHead(502, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Bad Gateway");
  });

  request.pipe(proxyRequest);
});

server.listen(proxyPort, "127.0.0.1", () => {
  console.log(
    `FreeRUS origin proxy listening on http://127.0.0.1:${proxyPort}, upstream http://127.0.0.1:${appPort}`,
  );
});
