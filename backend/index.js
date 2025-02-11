//https://stackoverflow.com/questions/78879806/docker-desktop-wsl-update-failed

import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function generateImagesFromDALL_E() {

    const image = await openai.images.generate({
        model: "dall-e-3", 
        prompt: "A steampunk city with canon machines, airships docked atop buildings, and streets lit by gas lamps, set in a vast canyon",
        size: "1024x1792",
    });
    console.log(image);
}
async function analyseImagesWithGPT4Vision(){

    // this uses the the chat completions api
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "user", 
            content: [
                {
                    type:"text",
                    text: "please tell me what type of architecture is this building made of and tell me more about the city in which the building is present?"
                },
                {
                    type:"image_url",
                    image_url: {
                        "url": "https://images.pexels.com/photos/20796003/pexels-photo-20796003/free-photo-of-mysore-palace-in-karnataka-india.jpeg?auto=compress&cs=tinysrgb&w=600",
                      },
                }
            ]},
        ],
    });

    console.log(response.choices[0]);
}
 await analyseImagesWithGPT4Vision();
// generateImagesFromDALL_E();
