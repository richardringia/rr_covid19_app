import React from 'react';
import {Layout, Text, TopNavigation} from "@ui-kitten/components";
import {SafeAreaView} from "react-native";

class ListPage extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <TopNavigation title='COVID-19 LIST' alignment='center' />
                <Text>List</Text>
            </SafeAreaView>
        );
    }
}

export default ListPage;
