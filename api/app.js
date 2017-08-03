movieApp = {};
movieAppGenres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 53,
      "name": "Thriller"
    }
];

movieApp.apikey = "4328dccb362844d5af898d2c02379b4d";
movieApp.thumbSize = 500;


movieApp.init = function(){
  var movie = 'All Genres';
  movieApp.getPieces(movie);
  movieApp.getPieces2(movie);
  $('#movie-select').on("change", function(){
    movie = $(this).val();
    var movieName = $(this).find(':selected').text();
    movieApp.updateTitle(movieName);
    movieApp.getPieces(movie);
    movieApp.getPieces2(movie);
  });
};

movieApp.getPieces2 = function(movie){
  $.ajax({
    url: 'https://api.themoviedb.org/3/movie/popular?api_key=4328dccb362844d5af898d2c02379b4d&language=en-US&page=1',
    type: 'GET',
    data: {
      key: movieApp.apikey,
      format: 'jsonp',
    },
    dataType: 'jsonp',
      success: function(results){
      movieApp.getGenres(results, movie);
    }
  });
};

movieApp.getPieces = function(movie){
  $.ajax({
    url: 'https://api.themoviedb.org/3/movie/popular?api_key=4328dccb362844d5af898d2c02379b4d&language=en-US&page=2',
    type: 'GET',
    data: {
      key: movieApp.apikey,
      format: 'jsonp',
    },
      success: function(results){
      $('#movie').empty();
      movieApp.getGenres(results, movie);
    }
  });
};


movieApp.getGenres = function(results, movie){

  var movieArray = results.results;
  var newArray = movieArray.map(function(value) {
     return value;
  });

  var newMovieArray = [];

  for(var i = 0; i < newArray.length; i++){
      newMovieArray.push(newArray[i]);
  }

  if (movie === 'All Genres'){
    movieApp.displayMovies(newMovieArray);
  }
  else{
  var newMovie;
  for (var movieList = 0; movieList < movieAppGenres.length; movieList++){
    if(movie === movieAppGenres[movieList].name){
      newMovie = movieAppGenres[movieList].id;
      }
    }

  for(var newMovieArrayCounter = 0; newMovieArrayCounter < newMovieArray.length; newMovieArrayCounter++){
    var counter = 0;
      for(var movieAppGenresLength = 0; movieAppGenresLength < newMovieArray[newMovieArrayCounter].genre_ids.length; movieAppGenresLength++){
        
        if(newMovieArray[newMovieArrayCounter].genre_ids[movieAppGenresLength] === newMovie){
          counter++;
          console.log(newMovieArray[newMovieArrayCounter].genre_ids[movieAppGenresLength]);
        }
      }
      if(counter < 1){
        newMovieArray.splice(newMovieArrayCounter,1);
        newMovieArrayCounter--;    
      }
    }
  movieApp.displayMovies(newMovieArray);
  }
}

movieApp.displayMovies = function(data){
    for(var movieCounter = 0; movieCounter < data.length; movieCounter++){
      var image = $('<img>').attr('src', 'https://image.tmdb.org/t/p/w500' + data[movieCounter].poster_path);
      var title = $('<h2>').text(data[movieCounter].original_title);
      var overview = $('<p>').addClass('overview').text(data[movieCounter].overview);
      var rating = $('<p>').addClass('rating').text("Average Rating Score: " + data[movieCounter].vote_average);
      var movie = $('<div>').addClass('movie').append(image, title, overview, rating);
      $('#movie').append(movie);
  }
};

movieApp.updateTitle = function(subject){
  $("#page-title").find("span").text(subject);
};

testFunction = function(){
  console.log("test");
}



$(function(){
  movieApp.init();
});



/*movieApp.displayMovies = function(data){
    for(var movieCounter = 0; movieCounter < data.length; movieCounter++){
      var image = $('<img>').attr('src', 'https://image.tmdb.org/t/p/w500' + data[movieCounter].poster_path);
      var title = $('<h2>').text(data[movieCounter].original_title);
      var overview = $('<p>').addClass('overview').text(data[movieCounter].overview);
      var rating = $('<p>').addClass('rating').text("Average Rating Score: " + data[movieCounter].vote_average);
      var movie = $('<div>').addClass('movie').append(image, title, overview, rating);
      $('#movie').append(movie);
  }
};*/
