// console.log(global)
// process.env.HELLO = 'HELLO';
// console.log(process)


// шлях до ноди
// шлях до скрипта
// console.log(process.argv)


// // поточна дерикторія
// console.log(process.cwd())
// console.log(__dirname)
// console.log(__filename)

// console.log(1111111)
// // зупиняє скрипт
// process.exit();
// console.log(22222)

// -----------------------------------------------------------------------

const { program } = require('commander');
const { log } = require('console');
const fs = require('fs').promises;
const { rawListeners } = require('process');
const readline = require('readline');
const { callbackify } = require('util');
require('colors')

// налаштовуєм командер
program.option('-f, --file <type>', 'file for saving game logs', 'game_result.log');

program.parse(process.argv)

// console.log(program.opts())

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

// // приклад використання readline
// rl.on('line', (txt) => {
//     console.log('||--->')
//     console.log(txt)
//     console.log('<---||')

//     process.exit()
// })


// логіка гри
/** Counter (кількість спроб) */
let counter = 0;

/** загадане число, від 1 до 10  */
const mind = Math.ceil(Math.random() * 10)

/** лог файли гри */
const logFile = program.opts().file;

/**
 * Logger to write into the log file
 * 
 * @param {string} msg - mesage to write
 * @returns {Promise<void>}
 */ 
const logger = async (msg) => {
    try {
        await fs.appendFile(logFile, `${new Date().toLocaleString('uk-UA')}: ${msg}\n`)
        
        console.log(msg.magenta)
        console.log(`Результат збережено до лог файлу ${logFile}`.yellow)
    } catch(err) {
console.log(`Щось пішло не так... ${err.message}`.red)
    }
}

/**
 * Simple input value validation
 * @author Oleks
 * 
 * @param {number} num - значення для перевірки
 * @returns {boolean} 
 */

const isValid = (num) => {
    if (!Number.isNaN(num) && num > 0 && num <= 10) return true;
      
    if (Number.isNaN(num)) console.log('Будь ласка, введіть число..'.red);
    if (num < 1 || num > 10) console.log('Число повинно бути від 1 до 10!'.red);
    
    return false
}

/**
 * Main game process
 * 
//  * @argument {sting} str  - input value 
//  * @returns {Promise}
 * @author Oleks
//  * @category Metods
 * 
 */


const game = () => {
    rl.question('Будь ласка, введіть будь яке ціле число від 1 до 10!\n'.green, (val) => {
        // convert val to number
            // const num = Number(val);
        const num = +val

        // validate numder
        if (!isValid(num)) return game()

        counter += 1
        // counter = counter + 1
        // counter ++
        // ++counter

        // if number !== mind
        if (num !== mind) {
            console.log("На жаль, ви не вгадали. Спробуйте ще раз!".yellow)

            return game()
        }

        // if number === mind
        // const congrats = `Вітаю! Ви вгадали число з ${counter} спроби :)`
        
logger(`Вітаю! Ви вгадали число з ${counter} спроби :)`)
        // process.exit()
        rl.close()
        
    })
}
// запуск гри 
game() 