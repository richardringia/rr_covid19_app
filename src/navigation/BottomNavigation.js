import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import MapPage from "../pages/map.page";
import ListPage from "../pages/list.page";
import { StyleSheet } from 'react-native';

const BottomTab = createBottomTabNavigator();

const UsersScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>USERS</Text>
    </Layout>
);

const OrdersScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>ORDERS</Text>
    </Layout>
);

const BottomTabBar = ({ navigation, state }) => {

    const onSelect = (index) => {
        navigation.navigate(state.routeNames[index]);
    };

    return (
        <SafeAreaView>
            <BottomNavigation
              style={styles.bottomNavigation}
              indicatorStyle={styles.indicator}
              color={"rgb(0,101,50)"}
              selectedIndex={state.index} onSelect={onSelect} >
                <BottomNavigationTab title='MAP' titleStyle={state.index === 0 ? styles.tabTitle : null}/>
                <BottomNavigationTab title='LIST' titleStyle={state.index === 1 ? styles.tabTitle : null}/>
            </BottomNavigation>
        </SafeAreaView>
    );
};

const TabNavigator = () => (
    <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />} >
        <BottomTab.Screen name='Map' component={MapPage}/>
        <BottomTab.Screen name='List' component={ListPage}/>
    </BottomTab.Navigator>
);

const styles = StyleSheet.create({
  bottomNavigation: { backgroundColor: 'white' },
  indicator: { backgroundColor: 'rgb(0,101,50)'},
  tabTitle: {color: 'rgb(0,101,50)'}
});

export const AppNavigator = () => (
    <NavigationContainer>
        <TabNavigator/>
    </NavigationContainer>
);
