import React from "react";
import { View, Text } from 'react-native'
import { Home } from './containers/home';
import { Status } from './containers/status';
import { Search } from './containers/search';
import { Upload } from './containers/upload';
import { AppBar } from "./components/appbar";

export const Pages = [
    { component: AppBar, id: 'elRepoIO.appBar', title: 'appbar'},
    { component: Home, id: 'elRepoIO.home', title: 'Home'},
    { component: Status, id: 'elRepoIO.status', title: 'Status'},
    { component: Search, id: 'elRepoIO.search', title: 'Search'},
    { component: Upload, id: 'elRepoIO.upload', title: 'Upload'},
]