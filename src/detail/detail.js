const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const fs = require("fs");

const baseURL = "https://kernelnewbies.org";

const createAllDetailHTML = async () => {
    console.log("Mengambil data dari senarai...");
    const senaraiJSON = JSON.parse(fs.readFileSync(`${__dirname}/../senarai/senarai.json`));
    console.log("Pengunduhan data sumber versi Linux...");
    senaraiJSON.forEach((senarai) => {
        senarai.links.forEach((link) => {
            axios.get(`${baseURL}${link}`).then((response) => {
                let name = link;
                name = name.replace("/", "");

                fs.writeFileSync(`${__dirname}/${name}.html`, pretty(response.data), "utf-8");

                console.log(`${name}.html berhasil diunduh!`);
            }).catch((error) => {
                console.log("Terjadi kesalahan! Mengulang kembali...");
                createAllDetailHTML();
            });
        });
    });
}

const createDetailJSON = () => {
    let files = fs.readFileSync(`${__dirname}/../senarai/filename.json`, "utf-8");
    files = JSON.parse(files).reverse();
    const datas = new Array();

    files.forEach((file) => {
        const detail = new Object();
                
        const $ = cheerio.load(fs.readFileSync(`${__dirname}/${file}`));

        let name = file.replace("_", " ");
        name = name.replace(".html", "")
        name = name.replaceAll("_", ".");

        console.log(`Membuat detail versi ${name}`);

        let text = new String();
        let regex = new RegExp(/^summary\:\s/i);

        $("#content p").each((i, el) => {
            if (i == 1) {
                return text = $(el).text().trim();
            }
        });

        if (!regex.test(text)) {
            text = null
        } else {
            text = text.replace(regex, "");
        }

        detail["version"] = name;
        detail["summary"] = text;

        datas.push(detail);
    });

    fs.writeFileSync(`${__dirname}/detail.json`, JSON.stringify(datas), "utf-8");
    console.log("JSON detail berhasil dibuat!");
    process.exit(0);
}

createDetailJSON();

module.exports = { createAllDetailHTML, createDetailJSON };
