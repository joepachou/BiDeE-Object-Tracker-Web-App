/*
    2020 © Copyright (c) BiDaE Technology Inc. 
    Provided under BiDaE SHAREWARE LICENSE-1.0 in the LICENSE.
  
    Project Name:
        BiDae Object Tracker (BOT)

    File Name:
        ObjectListMenu.js

    File Description:
        BOT UI component

    Version:
        1.0, 20200601

    Abstract:
        BeDIS uses LBeacons to deliver 3D coordinates and textual descriptions of
        their locations to users' devices. Basically, a LBeacon is an inexpensive,
        Bluetooth device. The 3D coordinates and location description of every 
        LBeacon are retrieved from BeDIS (Building/environment Data and Information 
        System) and stored locally during deployment and maintenance times. Once 
        initialized, each LBeacon broadcasts its coordinates and location 
        description to Bluetooth enabled user devices within its coverage area. It 
        also scans Bluetooth low-energy devices that advertise to announced their 
        presence and collect their Mac addresses.

    Authors:
        Tony Yeh, LT1stSoloMID@gmail.com
        Wayne Kang, b05505028@ntu.edu.tw
        Edward Chen, r08921a28@ntu.edu.tw
        Joe Chou, jjoe100892@gmail.com
*/


import React from 'react';
import { push as Menu } from 'react-burger-menu';

export default class ObjectListMenu extends React.Component {
    constructor(){
        super()
        this.state = {
            customBurgerIcon: false,
            width: 400,
            noOverlay: true,
            isOpen: true,
        }

    }
    render(){
        const { menuOption, objectList } = this.props;

        const customListStyle = {
            paddingRight: '0.5em',
        }
        return (    
            <div id="outer-container">
                <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } {...this.state} {...menuOption}>
                        <div className="list-group list-group-flush" style={customListStyle}>
                            hello
                        </div>
                </Menu>
            </div>
        );
    }   
};
