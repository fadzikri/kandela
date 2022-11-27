const { createSenaraiHTML, scrapeSenaraiJSON } = require("./senarai/senarai");
const { createAllDetailHTML, createDetailJSON } = require("./detail/detail");

setTimeout(() => createSenaraiHTML(), 0);
setTimeout(() => scrapeSenaraiJSON(), 600000);
setTimeout(() => createAllDetailHTML(), 120000);
setTimeout(() => createDetailJSON(), 180000);