const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

const AIchat = async (req, res) => {
  try {

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const value = (req.query.userInput)

    const result = await model.generateContent(value);
    const response = await result.response;

    const text = response.text();

    res.status(200).json({
      message: 'Success',
      generatedText: text,
      resultRES:result
    });

  } catch (error) {
    console.error('Error Creating Post:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = { AIchat };