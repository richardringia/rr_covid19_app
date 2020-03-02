import React from 'react';
import {Layout, Text, TopNavigation} from "@ui-kitten/components";
import {SafeAreaView} from "react-native";
import ListComponent from '../components/list.component';

class ListPage extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <TopNavigation title='COVID-19 LIST' alignment='center'  titleStyle={{color: 'rgb(0,101,50)'}}/>
                <ListComponent />
            </SafeAreaView>
        );
    }
}

export default ListPage;
