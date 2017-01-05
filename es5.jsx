'use_strict';

function Poster(props) {
    return(
        <div className="col-sm-6 col-md-4 col-lg-3">
            <img src={props.poster} />
        </div>
    )
}

var Movies = React.createClass({

    getInitialState: function() {
        return{
            moviesToShow: []
        }
    },

    componentDidMount: function() {
        // var self = this;
        var apiBaseUrl = 'https://api.themoviedb.org/3/';
        var encoding = 'language=en-US&page=1&include_adult=false';
        var append = `append_to_response=credits,release_dates`;

        var page = 1;
        var nowPlayingUrl = `${apiBaseUrl}movie/now_playing?api_key=${tmdbKey}&${encoding}&page=`;

        $.getJSON(nowPlayingUrl, function(movieData) {
            var nowPlayingArray = [];
            for (let movie of movieData.results) {
                nowPlayingArray.push(movie);
            }
            this.setState({moviesToShow: nowPlayingArray})
        }.bind(this));
    },

    render: function() {
        var apiImageUrl = 'https://image.tmdb.org/t/p/';
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <div className="th-wrapper">
                            <button className="btn btn-primary">Reset Search</button>
                        </div>
                        <div className="movie-rows">
                            {/* Movies go here */}
                            {this.state.moviesToShow.map(function(movie, index){
                                // var fullImagePath = apiImageUrl + movie.poster_path;
                                var posterPath = apiImageUrl + 'w300' + movie.poster_path;
                                return <Poster key={index} poster={posterPath} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})


ReactDOM.render(
    <Movies />,
    document.getElementById('movie-gallery')
)
