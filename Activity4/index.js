
// var client  = mqtt.connect({ host:'test.mosquitto.org', port: 8081})
// or
var client = mqtt.connect($('#broker-input').val());

// var client  = mqtt.connect({ host:'mqtt.eclipse.org/mqtt', port: 443})
// or
// var client  = mqtt.connect('wss://mqtt.eclipse.org:443/mqtt')

$('#con-button').click(function(){
  client.on('connect', function () {
    $('#con-button').html("Connected");
    $('#subscribeButton').on('click', () => {
      client.subscribe($('#topicToSub').val(), function (err) {
        $('#topic3').append("<p>"+$('#topicToSub').val().toString()+"</p>");
        $('#messages3').append("<p>"+new Date().toString()+"</p>");
        if (!err) {
          client.publish($('#topic').val(), $('#pub-payload').val());
          console.log($('#topic').val()+" "+$('#pub-payload').val())
          console.log("Topic exist");
        } else {
          alert("Topic does not exist");
        }
      })

    })
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic.toString())
  console.log(message.toString())
  $('#topic1').append("<p>"+topic.toString()+"</p>");
  $('#payload1').append("<p>"+message.toString()+"</p>");
  $('#messages1').append("<p>"+new Date().toString()+"</p>")
  //   client.end()
})


$('#pub-button').on('click', () => {

  client.publish($('#topic').val(), $('#pub-payload').val());
  $('#topic2').append("<p>"+$('#topic').val().toString()+"</p>");
  $('#payload2').append("<p>"+$('#pub-payload').val().toString()+"</p>");
  $('#messages2').append("<p>"+new Date().toString()+"</p>")
  
})