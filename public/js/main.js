console.log("its working");
const form = document.getElementById("vote-form");

form.addEventListener("submit", e=>{
    const choice = document.querySelector("input[name=os-poll]:checked").value;
    const data ={ os : choice};

    fetch("/poll", {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(console.log("its running "))
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

    e.preventDefault();

});

fetch("/poll")
.then(res => res.json())
.then(data => {
    const votes = data.votes;
    const totalVotes = votes.length;

    // count vote points - acc/current

    const voteCounts = votes.reduce((acc, vote) => ((acc[vote.os] = (acc[vote.os] || 0 ) + parseInt(vote.points) ), acc),{});

let dataPoints = [
    { label : "windows" , y: voteCounts.windows },
    { label : "ubuntu" , y: voteCounts.ubuntu },
    { label : "macintosh" , y: voteCounts.macintosh },
    { label : "chrome" , y: voteCounts.chrome },
    { label : "android" , y: voteCounts.android },
    
];

const chartContainer = document.querySelector('#chartContainer');
if(chartContainer){
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true ,
        theme: 'theme1',
        title: {
            text: 'Total Votes '+ totalVotes
        },
        data: [
            {
                type: 'column',
                dataPoints: dataPoints
            }
        ]
    });
    chart.render();


        Pusher.logToConsole = true;

            var pusher = new Pusher('1262a08e292cdf5748e2', {
            cluster: 'ap2',
            encrypted: true
            });

            var channel = pusher.subscribe('os-poll');
            channel.bind('vote', function(data) {
            dataPoints = dataPoints.map(x => {
                if(x.label == data.os){
                    x.y += data.points;
                    return x;
                }else{
                    return x;
                }
            
            });
            chart.render();
            });
            

}
} );
