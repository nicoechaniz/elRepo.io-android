import React, {Component} from 'react';
import { View, StyleSheet } from "react-native";
import { Appbar, Searchbar } from 'react-native-paper';
import { Navigation } from 'react-native-navigation';
import config from '../config'


export class AppBar extends Component {
    constructor(props) {
      super(props)
      this.state = {
        showSearch: false,
        searchText: undefined
      };
      this._onMore = this._onMore.bind(this);
      this._onSearch = this._onSearch.bind(this);
      this._onIconPress = this._onIconPress.bind(this);
      this._onChangeText = this._onChangeText.bind(this);
      this._toggleSearch = this._toggleSearch.bind(this);
    }

    _onIconPress() {
      this._onSearch();
    }

    _onChangeText(text) {
      this.setState({searchText: text})
      this.props.onSearchTextChange ? this.props.onSearchTextChange(text): false;
    }

    _toggleSearch() {
      this.setState({showSearch: !this.state.showSearch, searchText: undefined})
    }
    _onSearch() {
      typeof this.props.onSearch !== 'undefined' ? this.props.onSearch(this.state.searchText): false;
      this._toggleSearch()
    }

    _onMore() {
      Navigation.mergeOptions("SideMenu", {
        sideMenu: {
            left: {
                visible: true
            },
            right: {
              visible: false
            }
          }
      })
      return true;
    }

    _onDownloads() {
      Navigation.mergeOptions("SideMenu", {
        sideMenu: {
            right: {
                visible: true
            },
            left: {
              visible: false
            }
          }
      })
      return true;
    }

  render() {
    const searchTheme = {...config.theme, dark: true, colors: {...config.theme.colors, text: '#ffffff', placeholder: "rgba(255,255,255,0.7)",backgroundColor: config.theme.colors.primary}};
    return (
      <View>
        <Appbar.Header dark={true}>
        <Appbar.Action icon="menu" onPress={this._onMore} />
          <Appbar.Content
            title={this.props.title || 'elRepo.io'}
            subtitle={this.props.subtitle}
          >
          </Appbar.Content>
          {this.props.searchIcon?<Appbar.Action icon="search" onPress={this._toggleSearch} />: false }
          <Appbar.Action icon="more-vert" onPress={this._onDownloads} />
        </Appbar.Header>
        { this.state.showSearch === true
          ? <Searchbar
            ref={searchComponent => searchComponent !== null ? searchComponent.focus(): false } 
            style={style.search}
            theme={searchTheme}
            onIconPress={this._onIconPress}
            placeholder={"Buscar..."} 
            value={this.state.searchText}
            onChangeText={this._onChangeText}/>
          : false }
      </View>
    );
  }
}

const style = StyleSheet.create({
  search: {
    borderRadius: 0,
    backgroundColor: config.theme.colors.primary
  }
})