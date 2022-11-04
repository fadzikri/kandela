const axios = require("axios");
const cheerio = require('cheerio');
const pretty = require("pretty");
const fs = require("fs");

const baseURL = "https://kernelnewbies.org/LinuxVersions";

const createSenaraiJSON = () => {
    axios.get(baseURL).then((response) => {
        fs.writeFileSync(`${__dirname}/senarai.html`, pretty(response.data), "utf-8");
        scrapeSenaraiJSON();
    }).catch((error) => {
        console.log(error);
    });
    return true;
}

const scrapeSenaraiJSON = () => {
    const $ = cheerio.load(fs.readFileSync(`${__dirname}/senarai.html`));
    const header = $("#content h1");
    const senarai = $("#content ul");
    const datas = new Array();
    
    header.each((i, el) => {
        if (i == header.length - 1) return true;
        
        const minor = new Object();
        const versions = new Array();
        const link = new Array();
        
        $(senarai[i]).find("p").each((i, el) => {
            versions.push($(el).text().trim());
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
}

module.exports = createSenaraiJSON;