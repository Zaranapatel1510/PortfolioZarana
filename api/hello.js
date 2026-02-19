// api/hello.js
export default function handler(request, response) {
  // Aa backend thi data mokalshe
  response.status(200).json({
    message: "Hello from the Vercel Backend!",
    time: new Date().toLocaleTimeString()
  });
}