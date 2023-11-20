const buttons = document.querySelectorAll('button[type="button"]')
for (let button of buttons){
    button.addEventListener("click", function(){
    navigator.clipboard.writeText(this.value);
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied: " + this.value;
  }) 
}