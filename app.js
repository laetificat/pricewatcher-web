$(function() {
    $.get( "http://localhost:8080/watchers", function( priceDataArray ) {
        var counter = 0;
        priceDataArray.forEach(function(priceItem) {
            var timestamps = [];
            var priceValues = [];

            priceItem["PriceHistory"].forEach(function(priceHistoryItem) {
                priceValues.push(priceHistoryItem["Value"]);

                dateStamp = new Date(priceHistoryItem["Timestamp"])
                timestamps.push(dateStamp.getDate() +"/"+ (dateStamp.getMonth() + 1) +"/"+ dateStamp.getFullYear());
            });


            if (counter === 0 || counter % 3 === 0) {
                rowEl = $("<div class='row'></div>").appendTo("#charts");
            }

            $('<div class="col-lg chart m-2">' +
                    '<a href="'+priceItem["Url"]+'" class="chart-title"><p class="lead text-center">'+priceItem["Name"]+'</p></a>' +
                    '<canvas id="price-'+counter+'"></canvas>' +
                '</div>'
            ).appendTo(rowEl);

            var ctx = document.getElementById('price-'+counter).getContext('2d');
            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: timestamps,
                    datasets: [{
                        label: 'Price for ' + priceItem["ShopType"] + ' item',
                        data: priceValues,
                        fill: true,
                        lineTension: 0.25,
                        spanGaps: true,
                        backgroundColor: 'rgba(88,216,163,0.10)',
                        borderColor: '#58d8a3',
                        pointBackgroundColor: '#58d8a3',
                        pointBorderColor: '#58d8a3'
                    }]
                },

                // Configuration options go here
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            display: true,
                            ticks: {
                                fontColor: '#b1b1b5',
                                beginAtZero: true,
                                callback: function(value, index, values) {
                                    return '€ ' + value;
                                }
                            },
                            gridLines: {
                                display:false
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: '#b1b1b5'
                            },
                            gridLines: {
                                display:false
                            }
                        }]
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return '€ ' + Math.round(tooltipItem.yLabel * 100) / 100;
                            }
                        }
                    }
                }
            });

            counter++;
        });
    });


});