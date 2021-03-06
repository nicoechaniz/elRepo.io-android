/* @flow */

import * as React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {  Drawer } from 'react-native-paper';
import { Navigation } from 'react-native-navigation';
import config from '../config';


const DrawerItemsData = [
  { label: 'Publicaciones', icon: 'inbox', key: 'key-0', goTo: 'elRepoIO.home' },
  { label: 'Descargas', icon: 'folder-shared', key: 'key-4', goTo: 'elRepoIO.fileList'},
  { label: 'Buscar', icon: 'search', key: 'key-1' , goTo: 'elRepoIO.search'},
  { label: 'Publicar', icon: 'file-upload', key: 'key-2', goTo: 'elRepoIO.upload'},
  { label: 'Estado de red', icon: 'settings-input-antenna', key: 'key-3' , goTo: 'elRepoIO.status'}
];

class DrawerItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      drawerItemIndex: 'key-0',
    };
    this._setDrawerItem = this._setDrawerItem.bind(this)
  }


  _setDrawerItem = (index,goTo) => {
     this.setState({ drawerItemIndex: index })
      Navigation.setStackRoot('App',{
        sideMenu: {
          center: { 
            stack: {
              children: [{
              component: {
                  name: goTo
              }
            }]
          }
        }
      }
    })
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: false
        }
      }
    })
  };

  render() {
    return (
      <View style={[styles.drawerContent, { backgroundColor: config.theme.colors.surface }]}>
        <Drawer.Section theme={config.theme}>
          {DrawerItemsData.map((props) => (
            <Drawer.Item
              {...props}
              active={this.state.drawerItemIndex === props.key}
              onPress={() => this._setDrawerItem(props.key, props.goTo)}
            />
          ))}
        </Drawer.Section>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 22,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerItems;