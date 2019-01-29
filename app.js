// This is our API key. Add your own API key between the ""


const searchArticles = function (e) {
    e.preventDefault();
    const searchText = $('#searchTerm').val();
    const numRecords = $('#searchRecordNum').val();
    const startYear = $('#searchStart').val();
    const endYear = $('#searchEnd').val();
    const APIKey = 'N14O77o1kDhs1YACTRGTTJMurF4E6gfA';
    const filterQ = 'source:("The New York Times")';
    var queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchText}&fq=${filterQ}&api-key=${APIKey}`
    if (startYear & endYear) {
        queryURL = `${queryURL}&begin_date=${startYear}0101&end_date=${endYear}1231`;
    }
    else if (startYear) {
        queryURL = `${queryURL}&begin_date=${startYear}0101`;
    }
    else if (endYear) {
        queryURL = `${queryURL}&end_date=${endYear}1231`;
    }
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (res) {
        render(res.response.docs, numRecords);
    });
}

const render = function (articles, limit) {
    $('.resultsSection').empty();
    for (let i = 0; i < limit; i++) {
        $('.resultsSection').append(`<div>${articles[i].headline.main}</div>`);
        const urlLink = articles[i].web_url;
        $('.resultsSection').append(`<div><a href = "${urlLink}">${urlLink}</a></div>`);
        const pubDate = (articles[i].pub_date).substring(0, 10);
        $('.resultsSection').append(`<div>${pubDate}</div><br>`);
    }
}

const clearFields = function () {
    $('#searchTerm').val('');
    $('#searchRecordNum').val("1");
    $('#searchStart').val('');
    $('#searchEnd').val('');
    $('.resultsSection').empty();
}

$('#clearResults').on('click', clearFields);
$('#searchButton').on('click', searchArticles);