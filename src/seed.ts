import axios from "axios";
import cheerio from 'cheerio'
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

    const name = $('h2[data-source="name"]').text()
    const species = $('div[data-source="species"] > div.pi-data-value.pi-font').text()
    const image = $('.image.image-thumbnail > img').attr('src')
    console.log(species);
    
}

const loadCharacter = async () => {
    const characterPageNames = await getCharacterPageName();
    for (let i = 0; i < characterPageNames.length; i++) {
        const characterInfo = await getCharacterInfo(characterPageNames[i])
        
    }
}

loadCharacter()