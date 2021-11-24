'use strict'
const configState = () => {
    return {
        config: {
            app: {
                appBarTitle: "Проекты",
                name: "FrontEnd TestTask",
            },
            api: {
                siis: {
                    baseUrl: "https://devsharp.siisltd.ru/test/api"
                }
            }
        }
    }
}

module.exports = configState();