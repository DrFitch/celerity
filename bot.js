import { timeStamp } from 'console';
import Web3 from 'web3';
import routerAbi from './abi/avax/traderjoe_router.json';
import factoryAbi from './abi/avax/traderjoe_factory.json';
import inquirer from 'inquirer';
import { Spinner } from 'cli-spinner';

// const provider = provider;
const rpcURL = "http://turboswap.tech:9650/ext/bc/C/rpc";
const web3 = new Web3(rpcURL);
const address = "0x2c5d7333d81eB0eeC7f1ab437d0Bf18f371e06b9";

//const utilities = new utils();

// CLI 
inquirer.prompt([
    {
        type: 'rawlist',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            {
                key: 'benchmark',
                name: 'Run benchmark',
                value: 'benchmark'
            },
            {
                key: 'snipe',
                name: 'Snipe token',
                value: 'snipe'
            },
        ],
    }
]).then((answers) => {
    switch (answers.action) {
        case 'benchmark': ;
            //utilities.test();
            benchmark();
            break;

        default:
            break;
    }
});

async function benchmark() {
    const rounds = 20
    console.log('-------------------------------');
    console.log('---------- benchmark ----------');
    console.log('-------------------------------');

    //console.log(boxen('unicorns love rainbows', { title: 'magical', titleAlignment: 'center' }));

    console.log('\n');

    var spinner = new Spinner('Running benchmark... %s');
    spinner.setSpinnerDelay(250)
    spinner.setSpinnerString('|/-\\');
    spinner.start();

    const start_time = Date.now();
    for (let index = 0; index < rounds; index++) {
        const price = await check_avax_price();
    }

    spinner.stop(true);

    const end_time = Date.now();
    console.log(`${rounds} rounds ${(rounds / ((end_time - start_time) / 1000))} query/s`);
    console.log(`${rounds} rounds took ${(end_time - start_time) / 1000} seconds`);
    console.log(``);
}

async function check_avax_price() {
    calculate_gas();
    const web3 = new Web3(rpcURL);
    const nativeToken = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7" //AVAX
    const usdcToken = "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664" //USDC.e
    let tokenAmount = web3.utils.toWei('1', 'ether');
    let amountOut;
    try {
        let router = new web3.eth.Contract(routerAbi, '0x60aE616a2155Ee3d9A68541Ba4544862310933d4'.toLocaleLowerCase()); // router address
        amountOut = await router.methods.getAmountsOut(tokenAmount, [nativeToken, usdcToken]).call();
        amountOut = web3.utils.fromWei(amountOut[1]);
    } catch (error) { }
    if (!amountOut) return 0;
    return (amountOut * 10 ** 12);
}

function set_decimals(number, decimals) {
    number = number.toString();
    let numberAbs = number.split('.')[0]
    let numberDecimals = number.split('.')[1] ? number.split('.')[1] : '';
    while (numberDecimals.length < decimals) {
        numberDecimals += "0";
    }
    return numberAbs + numberDecimals;
}

async function calculate_gas() {
    const web3 = new Web3(rpcURL);
    const gas_check = await web3.eth.getGasPrice()
    const gas_price = await gas_check / 1000000000;
    console.log('gas_price', gas_price);
}

async function check_approval() {
    //contract = client.eth.contract(address=Web3.toChecksumAddress(address), abi=standardAbi)
    //actual_allowance = contract.functions.allowance(Web3.toChecksumAddress(settings['WALLETADDRESS']), routerAddress).call()
}

async function approve_token() {

}

// async function calcSell(tokensToSell, tokenAddres) {
//     const web3 = new Web3("https://bsc-dataseed1.binance.org");
//     const AVAXTokenAddress = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7" //BNB

//     let tokenRouter = await new web3.eth.Contract(tokenAbi, tokenAddres);
//     let tokenDecimals = await tokenRouter.methods.decimals().call();

//     tokensToSell = setDecimals(tokensToSell, tokenDecimals);
//     let amountOut;
//     try {
//         let router = await new web3.eth.Contract(pancakeSwapAbi, pancakeSwapContract);
//         amountOut = await router.methods.getAmountsOut(tokensToSell, [tokenAddres, AVAXTokenAddress]).call();
//         amountOut = web3.utils.fromWei(amountOut[1]);
//     } catch (error) { }

//     if (!amountOut) return 0;
//     return amountOut;
// }
/*
How it works?
This script simply comunicates with the smart contract deployed by pancakeswap and calls the main
function that was build to retrive the token prices
*/
// (async () => {
//     const tokenAddres = '0xa49e44976c236beb51a1f818d49b9b9759ed97b1'; // change this with the token addres that you want to know the
//     let bnbPrice = await calcBNBPrice() // query pancakeswap to get the price of BNB in USDT
//     console.log(`CURRENT BNB PRICE: ${bnbPrice}`);

//     // Them amount of tokens to sell. adjust this value based on you need, you can encounter errors with high supply tokens when this value is 1.
//     // let tokens_to_sell = 1;
//     // let priceInBnb = await calcSell(tokens_to_sell, tokenAddres) / tokens_to_sell; // calculate TOKEN price in BNB
//     // console.log('SHIT_TOKEN VALUE IN BNB : ' + priceInBnb + ' | Just convert it to USD ');
//     // console.log(`SHIT_TOKEN VALUE IN USD: ${priceInBnb * bnbPrice}`); // convert the token price from BNB to USD based on the retrived BNB value
// })();


// web3.eth.getBalance(address, (err, wei) => {
//     // console.log('wei', wei);
//     // console.log('web3.utils.fromWei', web3.utils.fromWei(wei, 'ether'));
//     // balance.then(console.log)
// })




// benchmark();


