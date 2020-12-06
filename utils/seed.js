const Comic = require('../models/comic');
const Comment = require('../models/comment');


//Create Three New Comics 

//Create a new Comment for each comi 
const comic_seeds = [
{
    title:'Utengano',
    description:'Miiimi, mimi mwanao? Wewe nani? . . . Sogea hatua moja tu, kama huitaki roho yako. Utanijua sasa hivi kuwa mimi siye tena Maimuna boza. Nyinyi ndio mlionibadilisha hivi. Nyinyi na dunia.\' Ilikuwaje hata Maimuna - mwari mwarika, mwana wa nyumba kubwa - kubadilika kiasi hicho? . . . Ni nini hasa kilicholeta utengano nyumbani mwa Bwana Maksuudi?',
    author:'Mophat Chemiati',
    publisher:'Mophat Chemiati Media',
    date:'2002-02-22',
    series:'Utengano',
    issue:1,
    genre:'Sci-fi',
    color:true,
    image:'https://textbookcentre.com/media/products/2010143000118_1.jpg'
},
{
    title:'The River Between',
    description:'Miiimi, mimi mwanao? Wewe nani? . . . Sogea hatua moja tu, kama huitaki roho yako. Utanijua sasa hivi kuwa mimi siye tena Maimuna boza. Nyinyi ndio mlionibadilisha hivi. Nyinyi na dunia.\' Ilikuwaje hata Maimuna - mwari mwarika, mwana wa nyumba kubwa - kubadilika kiasi hicho? . . . Ni nini hasa kilicholeta utengano nyumbani mwa Bwana Maksuudi?',
    author:'Mophat Chemiati',
    publisher:'Mophat Chemiati Media',
    date:'2002-02-22',
    series:'The River Between',
    issue:1,
    genre:'Sci-fi',
    color:false,
    image:'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348355292l/152642.jpg'
},

{
    title:'Shreds of Tenderness',
    description:'Miiimi, mimi mwanao? Wewe nani? . . . Sogea hatua moja tu, kama huitaki roho yako. Utanijua sasa hivi kuwa mimi siye tena Maimuna boza. Nyinyi ndio mlionibadilisha hivi. Nyinyi na dunia.\' Ilikuwaje hata Maimuna - mwari mwarika, mwana wa nyumba kubwa - kubadilika kiasi hicho? . . . Ni nini hasa kilicholeta utengano nyumbani mwa Bwana Maksuudi?',
    author:'Mophat Chemiati',
    publisher:'Mophat Chemiati Media',
    date:'2002-02-22',
    series:'Shreds of Tenderness',
    issue:1,
    genre:'Sci-fi',
    color:true,
    image:'https://d3crmev290s45i.cloudfront.net/dorp/dorp/0/97cf/fdb1/1009470405-size-exact-300x0.jpg'
}




]

 const seed = async () =>{
     await Comic.deleteMany();
     console.log('Deleted All the Comics');
     await Comment.deleteMany();
     console.log('Deleted All Comments');

   for(comic_seed of comic_seeds){
      let comic =  await Comic.create(comic_seed);
      console.log(`Created Comic ${comic.title}`)
       await Comment.create({
           text:'Iruved this Romic Rook!',
           user:'Mophat Chemiati',
           comicId:comic._id
       })
       console.log('Created a new Comment!')




   }




    

}

module.exports= seed;