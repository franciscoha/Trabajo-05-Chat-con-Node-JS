// Make connection
var socket = io.connect();
// Query DOM
var message = document.getElementById('message'),
      user = document.getElementById('user'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');
      boxUser = document.getElementById('user-error');

// Emit events
btn.addEventListener('click', function(){
    if(user.value!=""){
        if(message.value!=""){
            socket.emit('chat', {
                message: message.value,
                user: user.value
            });
            message.value = "";
            boxUser.classList.add('box-user-without-error');
            message.focus();
        }
    }
    else{
        boxUser.classList.add('box-user-error');
        boxUser.classList.remove('box-user-without-error');
    }
});

message.addEventListener('keypress', function(){
    socket.emit('typing', user.value);
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.user + ' says: </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
