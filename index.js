const express = require('express');
const app=express();
const path=require('path');
const methodOvveride= require('method-override')
const mongoose = require('mongoose');
const { Navigator } = require("node-navigator");
const navigator = new Navigator();
const {sorting,testing}=require('./sorting.js')

app.listen(6969,()=>{
    console.log('listening on port 6969');
});
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))
app.use(methodOvveride('_method'))

var {listColor,Color, listColor}=require('./database.js');
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


app.get('/', async (req,res)=>{
    let listColor1= await listColor.findOne({name:'orthodox'}).exec()
    res.render('home.ejs', {image:listColor1.image})
})

app.post('/',async (req,res) => {
        let listColor1= await listColor.findOne({name:'orthodox'}).exec()
        const {name, url} = req.body
        const newColor= new Color ({name:name, url: url})
        let {image}= listColor1
        image.push(newColor)
        sorting(image)
        await listColor1.save()
        res.redirect('back')
})

app.delete('/',async(req,res)=>{
    let listColor1= await listColor.findOne({name:'orthodox'}).exec()
    let {name}=req.body 
    listColor1.image=listColor1.image.filter((value) => value.name!==name)
    await listColor1.save()
    res.redirect('back')
})


async function inputing(){
    const listColorModel=await listColor.create({
        name:'orthodox',
        image:[],
    })
    const image_array= [
                    'image/SP_Abs_ColorCodes_RR.png',
                    'image/862633.png',
                    'image/d42450.png',
                    'image/SP_Abs_ColorCodes_RCU.png',
                    'image/SP_Abs_ColorCodes_OAS.png',
                    'image/SP_Abs_ColorCodes_YBP.png',
                    'image/d0df00.png',
                    'image/SP_Abs_ColorCodes_VAT.png',
                    'image/SP_Abs_ColorCodes_VCK.png',
                    'image/00857d.png',
                    'image/SP_Abs_ColorCodes_VAG.png',
                    'image/SP_Abs_ColorCodes_VCO.png',
                    'image/SP_Abs_ColorCodes_BFQ.png',
                    'image/SP_Abs_ColorCodes_BFL.png',
                    'image/SP_Abs_ColorCodes_BBQ.png',
                    'image/SP_Abs_ColorCodes_BDH.png',
                    'image/SP_Abs_ColorCodes_RCJ.png',
                    'image/SP_Abs_ColorCodes_RDA.png',
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWZY3vcvy51AAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=',
                    'image/c16784.png',
                    'image/SP_Abs_ColorCodes_RCR.png',
                    'image/SP_Abs_ColorCodes_RCS.png'
                ]
const code_array=[  '#ca1a0e',
                    '#862633',
                    '#d42450',
                    '#dd6151',
                    '#ff6800',
                    '#ffac00',
                    '#d0df00',
                    '#93c247',
                    '#008d52',
                    '#00857d',
                    '#249c78',
                    '#69d0a5',
                    '#66d0d0',
                    '#579bad',
                    '#00a6b4',
                    '#005699',
                    '#a698c5',
                    '#6c3b7b',
                    '#99637b',
                    '#c16784',
                    '#d37ba2',
                    '#dca2c8'
                    ]
        for (let i =0; i<image_array.length;i++){
            let listColor1= await listColor.findOne({name:'orthodox'}).exec()
            const newColor= new Color ({name:code_array[i], url: image_array[i]})
            listColor1.image.push(newColor)
            await listColor1.save()
        }
}