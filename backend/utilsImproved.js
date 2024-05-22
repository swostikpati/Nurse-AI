import openai from "./config/open-ai.js";

async function get_improved(transcription, chosen_case) {
  let message = [
    {
      role: "system",
      content: `You are a nurse who is given this sample patient update from a nurse student to a doctor about a patient. Give an improved version of this patient update. It should have clear and concise details, full numbers and figures only specifically drawn from the case, and all the important information needed by the doctor.
      
      Example Format: Hi, this is Nurse Alex calling about Mr. Fabio, 17B. Yeah, I think he's on your service. He's a 50 -year -old male. He's complaining of right shoulder pain times four days related to falling on an outstretched hand while skateboarding. Yep, that's the one. Yeah, his pain is worse when he raises his arm up, like when he's eating. He has some numbness and weakness, runs from kind of the top of his shoulder down. Seven out of 10 pain, worse as it goes on. He's currently on 500 milligrams of Panadol every six hours. Took his vitals, they look okay, 120 over 80, 80 heart rate, 18 respiration rate, which is a little high for him, temps 37, and pain currently on the medication is 2 out of 10. Right upper extremity exam, he has tenderness with flexation and external rotation, decreased strength 4 out of 5 compared to the left side, external rotation's fine, pulse sensories are all within normal limits. Took his labs, CKMV and CKMM are both below 5, they are both normal. MRI and X ray are negative. The plan with him is to discharge him home with a higher dose because he is complaining aboiut pain, so 1000mg of Panadol followed by 2 days with a healthcare clinic. Is that okay with you or do you want to come see him? Any other orders you have? Thank you.`,
    },
  ];
  if (chosen_case != null) {
    message.push({ role: "user", content: chosen_case });
  }
  message.push({ role: "user", content: transcription });
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: message,
  });

  console.log("Feedback \n");
  console.log(message);

  return chatCompletion.choices[0];
}

export default get_improved;
