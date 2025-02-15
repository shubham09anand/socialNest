const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI('AIzaSyDPGAB0Gd5EsQAkOaAezycQ-lz3du9wJKQ');

const AIchat = async (req, res) => {
  try {

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const value = (req.query.userInput)

    const result = await model.generateContent(value);
    const response = result.response;

    const text = response.text();

    return res.status(200).json({
      message: 'Success',
      generatedText: text,
      resultRES:result
    });

  } catch (error) {
    console.error('Error Creating Post:');
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = { AIchat };