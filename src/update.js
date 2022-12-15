const { createSenaraiHTML, scrapeSenaraiJSON } = require("./senarai/senarai");
const { createAllDetailHTML, createDetailJSON } = require("./detail/detail");

setTimeout(() => createSenaraiHTML(), 0);
setTimeout(() => scrapeSenaraiJSON(), 30000);
setTimeout(() => createAllDetailHTML(), 60000);
setTimeout(() => createDetailJSON(), 120000);