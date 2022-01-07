import axios from "axios";
import cheerio from 'cheerio'
import { query } from "express";
import mysql from 'mysql';

const connectionString = process.env.DATABASE_URL || '';
const connection = mysql.createConnection(connectionString);
connection.connect()

const getCharacterPageName = async () => {

    const url = "https://throneofglass.fandom.com/wiki/Category:Kingdom_of_Ash_characters"

    const { data } = await axios.get(url);
    const $ = cheerio.load(data)
    // console.log(data);

    const categories = $('ul.category-page__members-for-char');

    const characterPageNames = [];

    for (let i = 0; i < categories.length; i++) {
        const ul = categories[i];
        const characterLIs = $(ul).find('li.category-page__member')
        for (let j = 0; j < characterLIs.length; j++) {
            const li = characterLIs[j];
            // console.log(li);

            const path = $(li).find('a.category-page__member-link').attr('href') || '';
               
            const name = path.replace('/wiki/', '');

            characterPageNames.push(name);
            // console.log(name);
            
        }
        
    }

    return characterPageNames;


}

// getCharacterPageName()

const getCharacterInfo = async (chaacterName: string) => {
    const baseUrl = "https://throneofglass.fandom.com/wiki/" + chaacterName;

    const {data} = await axios.get(baseUrl);

    const $ = cheerio.load(data);

    let name = $('h2[data-source="name"]').text()
    const species = $('div[data-source="species"] > div.pi-data-value.pi-font').text()
    const image = $('.image.image-thumbnail > img').attr('src');

    if(!name) {
        name = chaacterName.replace('_', ' ');
    }

    const characterInfo = {
        name, species, image
    }
    // console.log(species);

    return characterInfo;
    
}

const loadCharacter = async () => {
    const characterPageNames = await getCharacterPageName();
    const characterInfoPromises = characterPageNames.map(characterName =>
    getCharacterInfo(characterName))
    const characters = await Promise.all(characterInfoPromises)
    // console.log(characters);
    const values = characters.map((character, i) => [i, character.name, character.species,  character.image] )

    const sql = 'INSERT INTO Characters (id, name, species, image) values ?';

    connection.query(sql, [values], (err) => {
        if (err) {
            console.log('Ahhhh him no gree work');
            console.log(err);
            
        } 
        else console.log('Yyyyy DB is populated............');
        
        
    })

    // const characterInfoArr = [];
    // for (let i = 0; i < characterPageNames.length; i++) {
    //     const characterInfo = await getCharacterInfo(characterPageNames[i])
    //     characterInfoArr.push(characterInfo);

    //     console.log(characterInfo);
        
         
    // }
}

loadCharacter()