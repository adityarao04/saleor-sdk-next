module.exports = {
  client: {
    includes: ["src/**/*.ts"],
    name: "sdk",
    service: {
      url: "https://gourmetgardenhapi.farziengineer.co/graphql/?source=website",
      name: "saleor",
    },
  },
};
