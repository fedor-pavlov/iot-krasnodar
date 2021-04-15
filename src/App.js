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
import { RadialChart } from '@ui5/webcomponents-react-charts';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client'
import './App.css';





const socket = io()





function App() {

    const [value, setValue] = useState()
    console.log('value:', value)

    useEffect(() => {

        socket.on('message', (msg) => { console.log(msg); setValue(msg.value) })
    })

    return (
    <ThemeProvider>
        <ShellBar primaryTitle="UI5 Web Components for React Template" />
        <FlexBox
            style={{ width: '100%' }}
            direction={FlexBoxDirection.Column}
            justifyContent={FlexBoxJustifyContent.Start}
            alignItems={FlexBoxAlignItems.Start}
        >
            <Card
                avatar          = {<Icon name="delete" />}
                className       = ""
                heading         = "Мусорный бак"
                onHeaderClick   = { function noRefCheck(){} }
                slot            = ""
                status          = { value && "Подключен" || "Загрузка" }
                style           = {{ width: '400px', margin: '20px' }}
                subheading      = "Текущее заполнение в режиме онлайн"
                tooltip         = "Текущее заполнение в режиме онлайн"
            >
                {!value && <Loader /> }
                { value && <RadialChart
                    color       = "green"
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