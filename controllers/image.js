const Clarifai = require('clarifai'); 
const app = new Clarifai.App({
    apiKey: '2fdcce6e65ab4745941c3beada4ba2fa'
});


const handleImage = (req,res,db) => {
   const {id} = req.body;

        db('users').where('id','=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {res.json(entries[0])})
        .catch(err => {
            console.log(err);
            res.status(400).json('something when wrong with updating entries')
        })
   }

   const handleImageCall = (req, res) => {   
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
          console.log(err);
          res.status(400).json('unable to work with api');
        }
          );
      return null;
  }
   module.exports = {
    handleImage: handleImage,
    handleImageCall:handleImageCall
   }