const cloudflareWorkersShimUrl =
  "data:text/javascript," +
  encodeURIComponent(`
    export const env = {};
    export default { env };
  `);

export async function resolve(specifier, context, defaultResolve) {
  if (specifier === "cloudflare:workers") {
    return {
      shortCircuit: true,
      url: cloudflareWorkersShimUrl,
    };
  }

  return defaultResolve(specifier, context, defaultResolve);
}
