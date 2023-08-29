function removeField(button) {
    button.previousElementSibling.remove();
    button.remove();
}
  
function addField(containerId) {
    const container = document.getElementById(containerId);
    const input = document.createElement('input');
    input.type = 'text';
    input.name = containerId;
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = '-';
    button.onclick = function() {
      removeField(button);
    };
    container.appendChild(input);
    container.appendChild(button);
}