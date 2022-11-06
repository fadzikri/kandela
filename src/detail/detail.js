const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const fs = require("fs");

const baseURL = "https://kernelnewbies.org";

const createAllDetailHTML = () => {
    const senaraiJSON = JSON.parse(fs.readFileSync(`${__dirname}/../senarai/senarai.json`));
    senaraiJSON.forEach((senarai) => {
        senarai.links.forEach((link) => {
            axios.get(`${baseURL}${link}`).then((response) => {
                let name = link;
                name = name.replace("/", "");

                fs.writeFileSync(`${__dirname}/${name}.html`, pretty(response.data), "utf-8");

                console.log(`${name}.html berhasil diunduh!`);
            }).catch((error) => {
                console.log(error);
            });
        })
    })
}

createAllDetailHTML();
