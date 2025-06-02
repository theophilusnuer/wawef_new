/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://wawef.org", 
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/api/*", "/dashboard/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*", "/dashboard/*"],
      },
    ],
  },
  async additionalPaths() {
    const paths = [
      {
        loc: "/pad-a-girl-campaign",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
    ];

    return paths;
  },
};