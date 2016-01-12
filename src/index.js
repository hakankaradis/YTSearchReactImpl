import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Search from './components/search';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';

const API_KEY = 'AIzaSyDGi8gF7FcWIYtbXzthi3szkXdPk2nqFoI';

// create a new component
// produce some html

// specifically say, take this component's generated html and put it
// on the page (in the DOM container! div)


class App extends Component { 
	constructor(props) {
		super(props);

		this.state = { 
			videos: [], 
			selectedVideo: null 
		};

		this.videoSearch('Nostalgia RAC');

	}

	videoSearch(term) {
		YTSearch({key:API_KEY, term:term}, (videos) => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0]
			});
			
		});
	}

	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
		return (
			<div> 
				<Search onSearchTermChange={videoSearch}/> 
				<VideoDetail video={this.state.selectedVideo}/>
				<VideoList onVideoSelect={ (selectedVideo) => this.setState({ selectedVideo }) } videos={this.state.videos} />
			</div>
		);
	}
	
}

ReactDOM.render(<App/>, document.querySelector('.container'));
// const => es6, final value for this variable (App)
// html in js -> jsx React.createElement('div', null)  == <div></div>