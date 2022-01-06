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

    const characterPageNames = ["name"];

    for (let i = 0; i < categories.length; i++) {
        const ul = categories[i];
        const characterLIs = $(ul).find('li.category-page__member')
        for (let j = 0; j < characterLIs.length; j++) {
            const li = characterLIs[j];
            // console.log(li);

            const path = $(li).find('a.category-page__member-link').attr('href') || '';
               
            const name = path.replace('/wiki/', '');

            characterPageNames.push(name);
            console.log(name);
            
        }
        
    }

    return characterPageNames;


}

getCharacterPageName()

const getCharacterInfo = async (chaacterName: string) => {

}

const loadCharacter = async () => {
    const characterPageNames = await getCharacterPageName();
    for (let i = 0; i < characterPageNames.length; i++) {
        const characterInfo = await getCharacterInfo(characterPageNames[i])
        
    }
}