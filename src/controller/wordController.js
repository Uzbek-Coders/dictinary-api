
import { eng_uzb, uzb_eng } from "../model/word.js";
import get_ipa from "../lib/ipa.js";

// CREATE

const wordCreateEngUzb = async (req, res) => {
  try {
    const { word, desc } = req.body;
    // app.use(express.json())

    if (word && desc) {
      let newWord = new eng_uzb({
        word,
        transc: get_ipa(word),
        desc,
      });
      await newWord.save();

      console.log(newWord);
      return res.json({
        ok: true,
        data: newWord,
      });
    }
  } catch (e) {
    throw Error(e);
  }
};

const wordCreateUzbEng = async (req, res) => {
  try {
    const { word, desc } = req.body;
    let newWord = new uzb_eng({
      word,
      desc,
    });
    await newWord.save();

    return res.json({
      ok: true,
      data: newWord,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
      data: [],
    });
  }
};

// Read
const wordReadEngUzb = async (req, res) => {
  try {
    let words = await eng_uzb.find();
    let arr = words ? words : [];
    return res.json(arr);
  } catch (e) {
    console.log(e);
    return res.json([]);
  }
};

const wordReadUzbEng = async (req, res) => {
  try {
    let words = await uzb_eng.find();
    let arr = words ? words : [];
    return res.json(arr);
  } catch (e) {
    console.log(e);
    return res.json([]);
  }
};

// Find
const wordFindEngUzb = async (req, res) => {
  try {
    const word = req.params.word;
    const result = await eng_uzb.findOne({
      word: word,
    });
    console.log(word);
    res.json({
      ok: true,
      data: result,
    });
  } catch (e) {
    throw Error(e);
  }
};

const wordFindUzbEng = async (req, res) => {
    try {
        const word = req.params.word;
        const result = await uzb_eng.findOne({
          word: word,
        });
        console.log(word);
        res.json({
          ok: true,
          data: result,
        });
      } catch (e) {
        throw Error(e);
      }
};
//  Word by Id
const wordFindIdEngUzb = async (req, res) => {
  try {
    const id = req.body.id;
    console.log(id, req.body)
    const result = await eng_uzb.findOne({
      _id: id,
    });
    res.json({
      ok: true,
      data: result,
    });
  } catch (e) {
    throw Error(e);
  }
};

const wordFindIdUzbEng = async (req, res) => {
    try {
        const id = req.body.id;
        const result = await uzb_eng.findOne({
          _id: id,
        });
        res.json({
          ok: true,
          data: result, 
        });
      } catch (e) {
        throw Error(e);
      }
};
// Delete
const wordDeleteEngUzb = async (req, res) => {
  try {
    const id = req.body.id;
    const result = await eng_uzb.deleteOne({
      _id: id, 
    })
      
      return res.json({
        ok: true,
        data: result,
      })
  } catch (e) {
    throw Error(e);
  }
};
const wordDeleteUzbEng = async (req, res) => {
  try {
    const id = req.body.id;
    const result = await uzb_eng.deleteOne({
      _id: id, 
    })
      return res.json({
        ok: true,
        data: result,
      })
  } catch (e) {
    throw Error(e);
  }
};

//  Update
const wordUpdateEngUzb = async (req, res) => {
    try {
        const {id, desc} = req.body;
        // var result = []
        if(id && desc){
          const result = await eng_uzb.findOneAndUpdate( {_id: id}, { desc: desc})
          console.log(result);
          await res.json({ok:true, data:result})
        } 
      } catch(e) {
        throw Error(e);
    }
}
const wordUpdateUzbEng = async (req, res) => {
    try {

        // .u+pdateMany( { }, { $unset: { pron_1: "",  pron_2: "", uzb_1:"", uzb_2:"" } } )
        const {id, desc} = req.body;
        // var result = []
        if(id && desc){
          const result =  await uzb_eng.findOneAndUpdate( {_id: id}, {desc: desc})
          console.log(result);
          await res.json({ok:true, data:result})
        }
    } catch(e) {
        throw Error(e);
    }
}
 const wordFilterEngUzb = async (req, res) => {
try {
  const {word} = req.body
  const result = await eng_uzb.find({"word": {$regex: `^${word}`, $options:"i"}})
  await res.json({ok:true, data:result})
} catch(e){
  throw Error(e);
}
}
 const wordFilterUzbEng = async (req, res) => {
try {
  const {word} = req.body
  const result = await uzb_eng.find({"word": {$regex: `^${word}`, $options:"i"}})

  await res.json({ok:true, data:result})
} catch(e){
  throw Error(e);
}
}
export {
  // Create
  wordCreateEngUzb,
  wordCreateUzbEng,
  // Read
  wordReadEngUzb,
  wordReadUzbEng,
  // Find
  wordFindEngUzb,
  wordFindUzbEng,
  // Find By ID
  wordFindIdEngUzb,
  wordFindIdUzbEng,
  // Delete
  wordDeleteUzbEng,
  wordDeleteEngUzb,
  // Update
  wordUpdateEngUzb,
  wordUpdateUzbEng,
  // Filter
  wordFilterEngUzb,
  wordFilterUzbEng
};