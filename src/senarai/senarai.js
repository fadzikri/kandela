const axios = require("axios");
const cheerio = require('cheerio');
const pretty = require("pretty");
const fs = require("fs");

const baseURL = "https://kernelnewbies.org/LinuxVersions";

const createSenaraiHTML = () => {
    console.log("Mengunduh sumber senarai...");
    axios.get(baseURL).then((response) => {
        fs.writeFileSync(`${__dirname}/senarai.html`, pretty(response.data), "utf-8");
        console.log("Sumber terunduh!");
    }).catch((error) => {
        console.log(error);
        process.exit(5);
    });
    return true;
}

const scrapeSenaraiJSON = () => {
    const $ = cheerio.load(fs.readFileSync(`${__dirname}/senarai.html`));
    const header = $("#content h1");
    const senarai = $("#content ul");
    const datas = new Array();
    
    console.log("Membuat JSON senarai...");
    header.each((i, el) => {
        if (i == header.length - 1) return true;
        
        const minor = new Object();
        const versions = new Array();
        const link = new Array();
        
        $(senarai[i]).find("p").each((i, el) => {
            const versi = $(el).text().trim();
            versions.push(versi);
            console.log(`Menambahkan senarai ${versi}!`);
        })
        
        $(senarai[i]).find("a").each((i, el) => {
            link.push($(el).attr("href"));
        })
        
        minor["versions"] = versions;
        minor["links"] = link;
        
        datas["major"] = $(el).text();
        datas["minor"] = minor;

        datas.push(minor);
    })
    
    fs.writeFileSync(`${__dirname}/senarai.json`, JSON.stringify(datas), "utf-8");
    console.log("JSON senarai dibuat!");
    process.exit(0);
}

module.exports = { createSenaraiHTML, scrapeSenaraiJSON };