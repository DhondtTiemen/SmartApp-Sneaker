import { openDatabase, SQLError, SQLResultSet, SQLTransaction, WebSQLDatabase } from "expo-sqlite"
import uuid from 'react-native-uuid';

const databaseName: string = "sneakerdb"

//Database openen
//Transaction function
export const transaction = (name: string = databaseName): Promise<SQLTransaction> => {
    const db: WebSQLDatabase = openDatabase(name);

    return new Promise((resolve, reject) => 
        db.transaction(
            (tx: SQLTransaction) => resolve(tx),
            (txError: SQLError) => reject(txError),
        ),
    )
}

//Statement function
export const statement = (tx: SQLTransaction, sql: string, params?: any[] | undefined): Promise<SQLResultSet> => {
    return new Promise((resolve, reject) => {
        tx.executeSql(
            sql, 
            params,
            (tx: SQLTransaction, res: SQLResultSet) => resolve(res),
            (tx: SQLTransaction, error: SQLError) => {
                reject(error)
                return false
            },
        )
    })
}

//Fill database
export const dummyData = async () => {
    console.log('Dummy data uitvoeren');

    //Tabel verwijderen
    console.log('Tabel verwijderen');
    const tx0: SQLTransaction = await transaction();
    const del: SQLResultSet | void = await statement(
        tx0,
        `DROP TABLE IF EXISTS 'tblSneaker';`
    )

    //Table aanmaken
    console.log('Tabel aanmaken');
    const tx: SQLTransaction = await transaction();
    const res: SQLResultSet | void = await statement(
        tx,
        `CREATE TABLE IF NOT EXISTS 'tblSneaker' (id integer primary key autoincrement, brand text, name text, price double, url text, description text, reminder boolean, releaseDate text, inCollection boolean)`,
    )
    console.log(res);

    //Data toevoegen
    console.log('Data aanmaken');
    const tx1: SQLTransaction = await transaction();
    // const date: string = new Date().toLocaleDateString();
    // console.log("Datum: " + date);
    const insert1: SQLResultSet | void = await statement(
        tx1,
        `INSERT INTO 'tblSneaker' (id, brand, name, price, url, description, reminder, releaseDate, inCollection) VALUES ('123456', "Nike", 'Air Max 1 “Sketch To Shelf”', 140, 'https://sneakernews.com/wp-content/uploads/2019/07/nike-air-max-1-sketch-to-shelf-cj4286-101-4.jpg', 'Tinker Hatfield‘s status as Nike’s most well-known footwear designer is well-established, and now the Swoosh Brand is probing the inspiration behind one of his most famous creations for the new Air Max 1 “Sketch To Shelf.” Featuring a hand-scrawled take on the classic “University Red” colorway that launched the AM1 — the first-ever shoe to feature visible Air cushioning — back in 1987, these “‘Sketch To Shelf” makeups offer a simple white mesh base, but then call upon scrawled marker-style strokes to provide color.', false, "2019-07-13", true)`,
    )
    console.log(insert1);

    console.log('Data aanmaken');
    const tx2: SQLTransaction = await transaction();
    // const date: string = new Date().toLocaleDateString();
    // console.log("Datum: " + date);
    const insert2: SQLResultSet | void = await statement(
        tx2,
        `INSERT INTO 'tblSneaker' (id, brand, name, price, url, description, reminder, releaseDate, inCollection) VALUES ('897542', "M&M's x Adidas", 'Forum Low "Yellow"', 150, 'https://sneakernews.com/wp-content/uploads/2022/04/MM-adidads-Forum-Low-Yellow-5.jpg?w=1140', 'Every year, sneaker collaborations get progressively more interesting, merging industries that rarely ever mingled prior. Offerings such as the Dior x Air Jordan 1 and Chunky Dunky, for example, were genre-bending upon reveal, and sneakerheads have since adjusted their expectations. And yet, when you think you’ve seen it all, adidas surprises us with a partnership with M&M… yes, the candy.', false, "2022-04-23", false)`,
    )
    console.log(insert2);

    const tx3: SQLTransaction = await transaction();
    const insert3: SQLResultSet | void = await statement(
        tx3,
        `INSERT INTO 'tblSneaker' (id, brand, name, price, url, description, reminder, releaseDate, inCollection) VALUES ('4654832', 'Yeezy', 'Foam Runner "Sulfur"', 90, 'https://s3.amazonaws.com/images.kicksfinder.com/products/thumbs/55b6c3e27e3ca36b13badbf4c1a37041_1647527452.jpg', 'Social media often portrays Ye (formerly Kanye West) as both a villain and a genius, with most able to easily separate the Chicago-raised artist’s personal life and work. His fashion, too, is treated the same way, though his fits and designs have become as divisive as the man himself. This is as true of the YZY NSLTD BT as it is the Foam Runner, though the latter has found a dedicated following among fans of adidas Yeezy.', true, "2022-04-22", false)`,
    )
    console.log(insert3);

    const tx4: SQLTransaction = await transaction();
    const insert4: SQLResultSet | void = await statement(
        tx4,
        `INSERT INTO 'tblSneaker' (id, brand, name, price, url, description, reminder, releaseDate, inCollection) VALUES ('615351', 'Adidas x Yeezy', 'Boost 350 v2 "Static Black"', 220, 'https://sneakernews.com/wp-content/uploads/2019/06/adidas-yeezy-350-black-fu9006-1.jpg?w=780', 'Kanye West and adidas have grabbed the momentum of the sneaker game with the help of their relentless streak of Yeezy releases. Dropping on June 7th, 2019 is perhaps one of the more universally attractive releases from that category – the adidas Yeezy Boost 350 v2 in “Black Static”.', false, "2019-06-07", true)`,
    )
    console.log(insert4);

    const tx5: SQLTransaction = await transaction();
    const insert5: SQLResultSet | void = await statement(
        tx5,
        `INSERT INTO 'tblSneaker' (id, brand, name, price, url, description, reminder, releaseDate, inCollection) VALUES ('7964831', 'Adidas x Yeezy', 'Boost 350 v2 "Static"', 220, 'https://sneakernews.com/wp-content/uploads/2018/12/adidas-yeezy-boost-350-v2-static-store-list-2.jpg?w=780', 'Rounding out this year’s incredibly busy slate of adidas Yeezy releases is a Static-colored version of the revered adidas Yeezy Boost 350 v2 silhouette. Other than its clean Static grey and white color scheme, the major deviation from the norm as far as this pair is concerned comes by way of a see-through window taking shape on its usual SPLY-350-branded forefoot stripe acting as a window into what makes Yeezy 350s one of the single most comfortable sneakers on the market.', false, "2018-12-27", true)`,
    )
    console.log(insert5);

    const tx6: SQLTransaction = await transaction();
    const insert6: SQLResultSet | void = await statement(
        tx6,
        `INSERT INTO 'tblSneaker' (id, brand, name, price, url, description, reminder, releaseDate, inCollection) VALUES ('135135', 'Pharrell x Adidas HU', 'NMD S1 RYAT', 250, 'https://sneakernews.com/wp-content/uploads/2022/04/Pharrell-adidas-Hu-NMD-S1-RYAT-GV6640-7.jpg?w=1140', 'Unveiled during the Summer of last year, the NMD S1 completely reimagines the original silhouette, effectively evolving one of adidas’ most iconic offerings. And just as he did all those years ago, Pharrell is further experimenting with the line-up’s design language, now injecting his own personal love and appreciation for the outdoors.', true, "2022-04-23", false)`,
    )
    console.log(insert6);

    const tx7: SQLTransaction = await transaction();
    const insert7: SQLResultSet | void = await statement(
        tx7,
        `INSERT INTO 'tblSneaker' (id, brand, name, price, url, description, reminder, releaseDate, inCollection) VALUES ('3151351', 'Billie Eilish x Nike', 'Air Force 1 High "Mushroom"', 170, 'https://s3.amazonaws.com/images.kicksfinder.com/products/thumbs/b4cae917611dc238fc543bcd9c3a0575_1649387762.jpeg', 'Grammy Award-winning pop artist Billie Eilish has had quite an unpredictable start to her tenure as an official creative partner of the Nike, Inc. brands. Starting off with Jordan Brand, she touched on the Air Jordan 15 in a tonal beige set-up, while contrasting that drab aesthetic with an all-green Air Jordan 1 KO. While her next shoe collaboration is a far less uncommon silhouette, she’s added quite an unprecedented touch to the model, giving it new life — while welcoming some polarizing response.', false, "2022-06-25", false)`,
    )
    console.log(insert7);

    const tx8: SQLTransaction = await transaction();
    const insert8: SQLResultSet | void = await statement(
        tx8,
        `INSERT INTO 'tblSneaker' (id, brand, name, price, url, description, reminder, releaseDate, inCollection) VALUES ('1531351351', 'Comme des Garcons Play x Converse', 'Chuck 70 High Top (Black)', 140, 'https://sneakernews.com/wp-content/uploads/2018/08/converse-cdg-play-chuck-70-available-2.jpg', 'When it comes to Converse collaborations, it’s safe to say that nothing is more well-known and omnipresent than Comme des GARÇONS‘ heart-adorned take on the Converse Chuck 70. The shoes feature a simple base — black or white canvas upper with contrasting heel stripe, white rubber toe cap, off-white midsole — but their instantly recognizable detailing arrives via the upper two-thirds of CDG’s iconic heart graphic on the lateral midfoot, cheekily peeking over the midsole’s edge.', true, "2018-03-31", false)`,
    )
    console.log(insert8); 

    const tx9: SQLTransaction = await transaction();
    const insert9: SQLResultSet | void = await statement(
        tx9,
        `INSERT INTO 'tblSneaker' (id, brand, name, price, url, description, reminder, releaseDate, inCollection) VALUES ('464864231', 'Pharrel x Adidas HU', 'NMD', 220, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/116609fda98548d2b2b3ac1a01123b18_9366/Pharrell_Williams_Hu_NMD_Schoenen_zwart_GX2487_01_standard.jpg', 'Een nieuwe kijk op de toekomst. De nu iconische HU NMD schoen krijgt een opvallende make-over van de niet in een hokje te stoppen designer Pharrell Williams. Het gestroomlijnde model heeft een subtiel design dat frisse energie uitstraalt. Het flexibele adidas Primeknit-bovenwerk en de Boost-demping houden je van begin tot eind comfortabel.', true, "2022-05-27", false)`,
    )
    console.log(insert9);    

    const tx10: SQLTransaction = await transaction();
    const insert10: SQLResultSet | void = await statement(
        tx10,
        `INSERT INTO 'tblSneaker' (id, brand, name, price, url, description, reminder, releaseDate, inCollection) VALUES ('577844351', 'Nike', 'Dunk Low Next Nature', 105, 'https://s3.amazonaws.com/images.kicksfinder.com/products/thumbs/2867cc68cec43f33ef011d55b2cdabd9_1633356353.png', 'Although old and new Nike Dunk Low-enthusiasts alike have expressed frustration with the model’s accessibility via the Nike SNKRS app, many have been able to add a classic “White/Black” option to their rotations. Most recently, the highly-coveted (and decently-common) proposition has re-appeared, only this time with upcycled materials as part of the Swoosh’s Next Nature program.', true, "2022-05-12", false)`,
    )
    console.log(insert10);    

    //Data bekijken
    console.log('Data bekijken');
    const tx11: SQLTransaction = await transaction();
    const read: SQLResultSet | void = await statement(
        tx11,
        `SELECT * FROM 'tblSneaker'`,
    )
    console.log(read);
}