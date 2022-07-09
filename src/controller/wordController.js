import TextToIPA from "text-to-ipa";
import { eng_uzb, uzb_eng } from "../model/word.js";
// const app = express()

// CREATE

const wordCreateEngUzb = async (req, res) => {
  try {
    const { word, desc } = req.body;
    // app.use(express.json())

    if (word && desc) {
      let newBook = new eng_uzb({
        word,
        transc: TextToIPA.lookup(word).text,
        desc,
      });
      await newBook.save();

      console.log(newBook);
      return res.json({
        ok: true,
        data: newBook,
      });
    }
  } catch (e) {
    throw Error(e);
  }
};

const wordCreateUzbEng = async (req, res) => {
  try {
    const { word, desc } = req.body;
    let newBook = new uzb_eng({
      word,
      desc,
    });
    await newBook.save();

    return res.json({
      ok: true,
      data: newBook,
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
          word: {
            $regex: word,
          },
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

const wordAutocomp = async (req, res) => {
    try {
        const {desc} = req.body;
    } catch(e) {

    }
}

const deleleteProperty = async (req, res) => {
    try {

        // .u+pdateMany( { }, { $unset: { pron_1: "",  pron_2: "", uzb_1:"", uzb_2:"" } } )
        const {collection} = req.body;
        console.log(collection);
        // var result = []
        const result = await db.collection.updateMany({}, { $unset : { description : 1} })
        console.log(result);
        await res.json({ok:true, data:result})
    } catch(e) {
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

  deleleteProperty
};

// Birinchi adminniki crud funksiyaga ega
// Ikkinchi test so'z qo'shish funksiyaga egawordReadUzbEng
