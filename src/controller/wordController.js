import {
  eng_uzb,
  uzb_eng
} from "../model/word.js";
import get_ipa from "../lib/ipa.js";
import fetch from "node-fetch";
import {
  JSDOM
} from "jsdom";
import request from "request"

// CREATE
const wordTransc = async (word) => {
  if (word) {
    console.log(word)
    let fetchData = await fetch("https://dics.glot.ai/vocab/transcript", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "paragraph": word,
      }),
    })
    let result = []
    const data1 = await fetchData.json()
    data1.forEach(i => {
      result.push(i["ipa"][0])
    })

    const json = result.join(" ")
    const isUpperCase = (string) => /[A-Z]|[\u0080-\u024F]/.test(string)
    if (isUpperCase(json)) {
      let data = await fetch("https://tophonetics.com/", {
        "credentials": "include",
        "headers": {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
          "Content-Type": "application/x-www-form-urlencoded",
          "Upgrade-Insecure-Requests": "1",
          "Sec-Fetch-Dest": "document",
          "Sec-Fetch-Mode": "navigate",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-User": "?1"
        },
        "referrer": "https://tophonetics.com/",
        "body": `text_to_transcribe=${word}&submit=Show+transcription&output_dialect=br&output_style=only_tr&preBracket=&postBracket=&speech_support=1&ak_bib=1662208318283&ak_bfs=1662208323362&ak_bkpc=5&ak_bkp=91%3B104%2C826%3B106%2C920%3B70%2C91%3B99%2C63%3B&ak_bmc=98%3B79%2C5580%3B&ak_bmcc=2&ak_bmk=&ak_bck=&ak_bmmc=4&ak_btmc=0&ak_bsc=0&ak_bte=&ak_btec=0&ak_bmm=596%2C110%3B369%2C264%3B168%2C237%3B660%2C380%3B`,
        "method": "POST",
        "mode": "cors"
      });

      function regexpStrip(str) {
        return str.replace(/<[^>]*>/g, '');
      }
      const body = await data.text();
      const dom = new JSDOM(body);
      const reslt = regexpStrip(dom.window.document.querySelector("#transcr_output").innerHTML)
      if (reslt) {
        console.log("Uppercase fixed result", word)
        return reslt
      } else {
        console.log("Uppercase not fixed result", word, reslt)
        return json
      }
    } else {
      console.log("normal result", word)
      return json
    }
  } else {
    throw new Error("Word is not defined")
  }
}
const wordCreateEngUzb = async (req, res) => {
  try {
    const {
      word,
      desc
    } = req.body;
    // app.use(express.json())
    if (word && desc) {
      let newWord = new eng_uzb({
        word,
        transc: await wordTransc(word),
        desc
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
    const {
      word,
      desc
    } = req.body;
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
  const { word, id } = req.body;
  if(id) {
    try {
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
  }
 else if (word) {
  try {
    const result = await eng_uzb.findOne({
      word: {
        $regex: `^${word}$`,
        $options: 'i'
      }
    });
    console.log(word);
    res.json({
      ok: true,
      data: result,
    });
  } catch (e) {
    try {
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
  } }
};

const wordFindUzbEng = async (req, res) => {
  const { word, id } = req.body;
  if(id) {
    try {
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
  }
 else if (word) {
  try {
    const result = await uzb_eng.findOne({
      word: {
        $regex: `^${word}$`,
        $options: 'i'
      }
    });
    console.log(word);
    res.json({
      ok: true,
      data: result,
    });
  } catch (e) {
    try {
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
  } }
  
};

// Delete
const wordDeleteEngUzb = async (req, res) => {
  try {
    const id = req.body.id;
    const result = await eng_uzb.deleteOne({
      _id: id,
    });

    return res.json({
      ok: true,
      data: result,
    });
  } catch (e) {
    throw Error(e);
  }
};
const wordDeleteUzbEng = async (req, res) => {
  try {
    const id = req.body.id;
    const result = await uzb_eng.deleteOne({
      _id: id,
    });
    return res.json({
      ok: true,
      data: result,
    });
  } catch (e) {
    throw Error(e);
  }
};

//  Update
const wordUpdateEngUzb = async (req, res) => {
  try {
    const {
      id,
      desc
    } = req.body;
    // var result = []
    if (id && desc) {
      const result = await eng_uzb.findOneAndUpdate({
        _id: id,
      }, {
        desc: desc,
      });
      console.log(result);
      await res.json({
        ok: true,
        data: result,
      });
    }
  } catch (e) {
    throw Error(e);
  }
};
const wordUpdateUzbEng = async (req, res) => {
  try {
    // .u+pdateMany( { }, { $unset: { pron_1: "",  pron_2: "", uzb_1:"", uzb_2:"" } } )
    const {
      id,
      desc
    } = req.body;
    // var result = []
    if (id && desc) {
      const result = await uzb_eng.findOneAndUpdate({
        _id: id,
      }, {
        desc: desc,
      });
      console.log(result);
      await res.json({
        ok: true,
        data: result,
      });
    }
  } catch (e) {
    throw Error(e);
  }
};

// Filter
const wordFilterEngUzb = async (req, res) => {
  try {
    const {
      word  
    } = req.body;
    const result = await eng_uzb.find({
      word: {
        $regex: `^${word}`,
        $options: "i",
      },
    });
    await res.json({
      ok: true,
      data: result,
    });
  } catch (e) {
    throw Error(e);
  }
};
const wordFilterUzbEng = async (req, res) => {
  try {
    const {
      word
    } = req.body;
    const result = await uzb_eng.find({
      word: {
        $regex: `^${word}`,
        $options: "i",
      },
    });

    await res.json({
      ok: true,
      data: result,
    });
  } catch (e) {
    throw Error(e);
  }
};


const updateEngUzb = async (req, res) => {
  let fetchData = await eng_uzb.find().sort({
    transc: 1
  })
  console.log(fetchData)
  for (let i of fetchData) {
    let obj = {
      word: i["word"],
      transc: await wordTransc(i["word"]),
      desc: i["desc"],
    }
    console.log(await eng_uzb.update({
      _id: i["_id"]
    }, {
      $set: obj
    }));
  }
  res.json({
    data: "ok"
  })
};

const valuesEngUzb = async  (req, res) => {
  try {
    let words = await eng_uzb.find();
    const arr = [];
    await words.map((i) => arr.push(i["word"]));
    res.send(arr) 
  } catch(e)  {
    throw Error(e)
  }
}
const valuesUzbEng = async  (req, res) => {
  try {
    let words = await uzb_eng.find();
    const arr = [];
    await words.map((i) => arr.push(i["word"]));
    res.send(arr) 
  } catch(e)  {
    throw Error(e)
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
  valuesEngUzb,
  valuesUzbEng,
  // Delete
  wordDeleteUzbEng,
  wordDeleteEngUzb,
  // Update
  wordUpdateEngUzb,
  wordUpdateUzbEng,
  // Filter
  wordFilterEngUzb,
  wordFilterUzbEng,
  updateEngUzb,
};