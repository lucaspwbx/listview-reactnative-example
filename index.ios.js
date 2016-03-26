/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 import React, {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class ListViewExample extends Component {
  constructor(props) {
    console.log('constructor');
    super(props);
    this.state = {
      movies: null
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          movies: responseData.movies,
        });
      })
      .done();
  }
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
        Loading movies...
        </Text>
      </View>
    );
  }
  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image source={{uri: movie.posters.thumbnail}} style={styles.thumbnail}/>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
  render() {
    //let movie = MOCKED_MOVIES_DATA[0];
    if (!this.state.movies) {
      return this.renderLoadingView();
    }
    let movie = this.state.movies[0];
    return this.renderMovie(movie);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('ListViewExample', () => ListViewExample);
