import {
    Card,
    Icon,
    FlexBox,
    FlexBoxAlignItems,
    FlexBoxDirection,
    FlexBoxJustifyContent,
    Loader,
    ShellBar,
    ThemeProvider
} from '@ui5/webcomponents-react';
import { RadialChart, MicroBarChart } from '@ui5/webcomponents-react-charts';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client'
import './App.css';





const socket = io()
const socket_site = io('/site')
const colorcoding = function(value, maxValue = 100) {

    if (typeof value === 'number' && !isNaN(value)) {

        let grade = Math.min(3, Math.max(0, Math.ceil(Math.abs(value)/Math.abs(maxValue)/0.25) - 1))
        return ["green", "green", "yellow", "red"][grade]
    }

    return "grey"
}





function App() {

    const [value, setValue] = useState()
    const [site,  setSite]  = useState()
    console.log('site', site)

    useEffect(() => {

        socket.on('message', (msg) => { console.log(msg); setValue(msg.value) })
        socket_site.on('message', msg => setSite(msg))
    })

    return (
    <ThemeProvider>
        <ShellBar primaryTitle="SAP IoT для мониторинга вывоза мусора" />
        <FlexBox
            style={{ width: '100%' }}
            direction={FlexBoxDirection.Row}
            justifyContent={FlexBoxJustifyContent.Start}
            alignItems={FlexBoxAlignItems.Start}
        >
            <Card
                style           = {{ width: '400px', margin: '20px' }}
                avatar          = {<Icon name="map-2" />}
                className       = ""
                heading         = "ул. Котовского, 111"
                onHeaderClick   = { function noRefCheck(){} }
                slot            = ""
                status          = { site && "Подключено" || "Загрузка" }
                subheading      = "Заполнение баков на площаке в режиме онлайн"
                tooltip         = "Заполнение баков на площаке в режиме онлайн"
            >
                {!site && <MicroBarChart dataset={[]} /> }
                { site && <MicroBarChart
                    style       = {{ width: '360px', margin: '20px' }}
                    maxValue    = { 100 }
                    dataset     = { site }
                    dimension   = {{ accessor: 'name' }}
                    measure     = {{ accessor: 'data' }}
                />}
            </Card>
            <Card
                avatar          = {<Icon name="delete" />}
                className       = ""
                heading         = "Мусорный бак"
                onHeaderClick   = { function noRefCheck(){} }
                slot            = ""
                status          = { value && "Подключен" || "Загрузка" }
                style           = {{ width: '400px', margin: '20px' }}
                subheading      = "Заполнение бака в режиме онлайн"
                tooltip         = "Заполнение бака в режиме онлайн"
            >
                {!value && <Loader /> }
                { value && <RadialChart
                    color       = { colorcoding(value) }
                    displayValue= { `${Math.round(value)}%` }
                    style       = {{ width: '100%' }}
                    maxValue    = { 100 }
                    value       = { value }
                />}
            </Card>
        </FlexBox>
    </ThemeProvider>
    );
}

export default App;