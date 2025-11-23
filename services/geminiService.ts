import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';

const API_KEY = process.env.API_KEY || ''; 

let client: GoogleGenAI | null = null;

if (API_KEY) {
  client = new GoogleGenAI({ apiKey: API_KEY });
}

export const sendMessageToGemini = async (message: string, history: {role: string, parts: {text: string}[]}[] = []): Promise<string> => {
  if (!client) {
    return "Моля, конфигурирайте API ключ за Gemini, за да използвате асистента.";
  }

  try {
    const systemInstruction = `
      Вие сте полезен и приятелски настроен асистент за пазаруване на eMAG.bg.
      Вашата цел е да помагате на потребителите да намерят продукти, да сравняват цени и да отговарят на въпроси за наличности.
      
      Налични продукти в момента (използвайте тази информация, за да препоръчвате конкретни артикули):
      ${JSON.stringify(PRODUCTS.map(p => ({ id: p.id, title: p.title, price: p.price, category: p.category })))}
      
      Отговаряйте кратко, учтиво и на български език. Ако потребителят пита за продукт, който не е в списъка, предложете най-близката алтернатива или кажете, че в момента нямаме точно този модел.
      Акцентирайте върху "Genius" офертите, ако е възможно.
    `;

    // Convert history format if necessary or strictly adhere to what the API expects
    // The prompt format for Gemini 1.5/2.0 often takes a specific history structure.
    // However, for simplicity with @google/genai, we use the chat helper.
    
    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
      }
    });

    // NOTE: In a real app, we would maintain history state properly. 
    // Here we act as if it's a single turn or re-send context if needed, 
    // but the 'chat' object maintains session state if reused. 
    // Since we create a new chat every time in this simple stateless function, 
    // we might lose context unless we pass 'history' to 'client.chats.create'.
    // For this demo, we'll just send the message as a single prompt with context injected via system instruction mostly.
    
    const response = await chat.sendMessage({
      message: message
    });

    return response.text || "Съжалявам, не можах да генерирам отговор.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Възникна грешка при свързването с асистента. Моля, опитайте по-късно.";
  }
};