const cron = require('node-cron');
const { db, http, signos } = require("./util")

class Main {
    static async getData() {
        const todayHoroscope = [];

        for (const signo of signos) {
            const { horoscope } = (await http.get('/' + signo)).data;
            console.log('horoscope');
            console.log(horoscope);
            
            todayHoroscope.push({
                signo,
                horoscope
            })

            console.log('today horoscope');
            console.log(todayHoroscope);
            

            const name = `${new Date().toDateString().split(" ").join("_")}.json`;
            db.setItem(name, JSON.stringify(todayHoroscope));


        }
    }
}

cron.schedule("* * * * * *", () => {
    console.log('Se está ejecutando el cron');
    Main.getData();
});