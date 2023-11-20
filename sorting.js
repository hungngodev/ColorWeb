function difference (arr1,arr2){
    setarr1= new Set(arr1)
    setarr2 = new Set(arr2)
    res1= new Set()
    res2 = new Set()
    for (let n of arr1){
        if (!setarr2.has(n)){
            res1.add(n)
        }
    }
    for (let n of arr2){
        if (!setarr1.has(n)){
            res2.add(n)
        }
    }
    return [Array.from(res1), Array.from(res2)]
}
const mongoose = require('mongoose');
var {listColor,Color, listColor}=require('./database.js');

var sorting = function(colors) {
    for (var c = 0; c < colors.length; c++) {
      /* Get the hex value without hash symbol. */
      var hex = colors[c].name.substring(1);
       
      /* Get the RGB values to calculate the Hue. */
      var r = parseInt(hex.substring(0,2),16)/255;
      var g = parseInt(hex.substring(2,4),16)/255;
      var b = parseInt(hex.substring(4,6),16)/255;
   
      /* Getting the Max and Min values for Chroma. */
      var max = Math.max.apply(Math, [r,g,b]);
      var min = Math.min.apply(Math, [r,g,b]);
   
      /* Variables for HSV value of hex color. */
      var chr = max-min;
      var hue = 0;
      var val = max;
      var sat = 0;
   
      if (val > 0) {
        /* Calculate Saturation only if Value isn't 0. */
        sat = chr/val;
        if (sat > 0) {
          if (r == max) { 
            hue = 60*(((g-min)-(b-min))/chr);
            if (hue < 0) {hue += 360;}
          } else if (g == max) { 
            hue = 120+60*(((b-min)-(r-min))/chr); 
          } else if (b == max) { 
            hue = 240+60*(((r-min)-(g-min))/chr); 
          }
        }
      }
       
      /* Modifies existing objects by adding HSV values. */
      colors[c].hue = hue;
      colors[c].sat = sat;
      colors[c].val = val;
    }
   
    /* Sort by Hue. */
    colors.sort(function(a,b){return a.hue - b.hue});
  }
async function testing(){
    let listColor1= await listColor.findOne({name:'orthodox'}).exec()
    let {image}= listColor1
    console.log(image,image.length)
    sorting(image)
    console.log(image,image.length)
    await listColor1.save()
}
async function connecting(){
    try {
    await mongoose.connect('mongodb://127.0.0.1:27017/KeyColor')
    console.log("Connection Successfully")
    }
    catch (err){
        console.log('Connection Failed');
        console.log(err)
    }
}
connecting();
module.exports.sorting=sorting
module.exports.testing=testing