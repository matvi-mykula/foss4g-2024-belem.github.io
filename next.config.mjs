import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    baseUrl: "https://2024.foss4g.org"
  },
  basePath: undefined, //process.env.NODE_ENV == "production" ? "/foss4g-belem" : undefined,
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

export default withMDX()(nextConfig);
