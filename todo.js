function get_todos() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); 
    }
    return todos;
}
function validateInput() {
    var x = document.getElementById('task').value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
    return true;
}
function checked() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos[id].checked = true;
    localStorage.setItem('todo', JSON.stringify(todos)); 
    show();
    return false;
}
 
function add() {
    if(!validateInput()) return 1;
    var task = document.getElementById('task').value;
    var todos = get_todos();
    todos.push({name: task, checked: false});
    localStorage.setItem('todo', JSON.stringify(todos));
    show();
    document.getElementById('task').value = "";
    return false;
}
 
function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
    show();
    return false;
}
 
function show() {
    var todos = get_todos();
    var html = '<ul>';
    for(var i=0; i<todos.length; i++) {        
      html += '<li>' + todos[i].name + 
          '<button class="remove" id="' + i  + '">remove</button>'+
          '<input id="'+i+'"  type="checkbox" class="checked"' + (todos[i].checked === true ? 'checked' : '') +
          '> </li>';
    };
    html += '</ul>';
 
    document.getElementById('todos').innerHTML = html;
 
    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
     var checkeds = document.getElementsByClassName('checked');
    for (var i=0; i < checkeds.length; i++) {
        checkeds[i].addEventListener('click', checked);
    };
    
}
 
document.getElementById('add').addEventListener('click', add);
show();
