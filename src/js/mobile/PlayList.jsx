var React = require("react");

var PlayList = React.createClass({
	getInitialState: function() {
		return {openItemId: -1}
	},

	generateList: function() {
		var videos = this.props.selectedVideos;
		var self = this;
		var list = Object.keys(videos).map(function(id) {
			var openStatus = (id === self.state.openItemId);
			return (
				<div className="media" key={id}>
					<ListItem id={id} video={videos[id]} handleToggle={self.toggleContext} />
					<ContextMenu id={id} open={openStatus} />
				</div>
			);
		});

		return list;
	},

	toggleContext: function(id){
		if(this.state.openItemId === id){
			this.setState({openItemId: -1});
		} 
		else {
			this.setState({openItemId: id});
		}
	},

	render: function() {
		return(
			<ul className="media-list">
				{this.generateList()}
			</ul>
		);
	}
});

var ListItem = React.createClass({
	toggleContext: function() {
		var id = this.props.id;
		this.props.handleToggle(id);
	},

	render: function() {
		var video = this.props.video;
		return(
			<div onTouchStart={this.toggleContext}>
				<Avatar img={video.thumbnailUrl}/>
				<MediaBody title={video.title} user={video.selectedBy}/>
			</div>
		);
	}
});

var Avatar = React.createClass({
	render: function() {
		return (
			<div className="media-left media-middle avatar">
				<a href="#">
					<img className="media-object" src={this.props.img} alt="..."/>
				</a>
			</div>
		);
	}
});

var MediaBody = React.createClass({
	render: function() {
		return (
			<div className="media-body">
				<h4 className="media-heading">{this.props.user}</h4>
				{this.props.title}
			</div>
		);
	}
});

var ContextMenu = React.createClass({
	getHeight: function(){
		if(this.props.open){
			return "3em"
		} else {
			return "0"
		}
	},

	render: function() {
		var style = { height: this.getHeight() }
		return (
			<div className="contextMenu" style={style}>
				<p> Hello World! </p>
			</div>
		);
	}
});

module.exports = PlayList;