"use strict";
import { Application, Router } from "https://deno.land/x/oak@v6.3.1/mod.ts";
import { renderFileToString } from "https://deno.land/x/dejs@0.9.3/mod.ts";

let shoppingList = [
    { id: 0, name: "Mehl" },
    { id: 1, name: "Wasser" },
    { id: 2, name: "Bananen" }
];

const app = new Application();
const router = new Router();

router.get("/", async (ctx) => {
    ctx.response.body = await renderFileToString(Deno.cwd() + "/index.ejs", {
        title: "Einkaufsliste",
        products: shoppingList
    });
});

router.post("/addProduct", async (ctx) => {

    let formContent = await ctx.request.body({ type: 'form' }).value; // Input vom Formular wird übergeben
    let nameValue = formContent.get("newProductName"); // newProductName wird ausgelesen

    console.log("Ein addProduct post request erhalten für: " + nameValue);

    if (nameValue) {
        shoppingList.push(
            { id: shoppingList.length, name: nameValue } // Nimmt die nächsthöhere Nummer
        );
    }

    ctx.response.redirect("/"); // Zur Startseite weiterführen
});

router.post("/deleteProduct", async (ctx) => {
    //let deleteId = url.get(id);
    //console.log(deleteId);

    console.log("Ein addProduct post request erhalten für: " + nameValue);

    for(let i = 0; i<shoppingList.length; i++)
    {
        if(shoppingList[i].id == deleteId){
            shoppingList.pop(i);
        }
    }

    ctx.response.redirect("/"); // Zur Startseite weiterführen
});

router.post("/editProduct", async (ctx) => {

    let formContent = await ctx.request.body({ type: 'form' }).value; // Input vom Formular wird übergeben
    let editValue = formContent.get("editProdict"); // newProductName wird ausgelesen

    console.log("Ein editProduct post request erhalten für: " + editValue);

    for(let i = 0; i<shoppingList.length; i++)
    {
        console.log(shoppingList[i].id);

        if(shoppingList[i].id == editId)
        {
            shoppingList[i].name = editValue;
        }
    }

    ctx.response.redirect("/"); // Zur Startseite weiterführen
});

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', () => {
    console.log("Server läuft");
});

await app.listen({ port: 8000 });