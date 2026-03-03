const withMDX = require("@next/mdx")({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure `pageExtensions` to include MDX files
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
    output: "export",
    distDir: "docs",
};

module.exports = withMDX(nextConfig);
