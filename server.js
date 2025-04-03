const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
    res.send("Le bot Vinted est en ligne !");
});

app.get("/scrape", async (req, res) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto("https://www.vinted.fr");

    const data = await page.evaluate(() => {
        return document.title;
    });

    await browser.close();
    res.json({ title: data });
});

app.listen(PORT, () => {
    console.log(`Serveur en ligne sur http://localhost:${PORT}`);
});
