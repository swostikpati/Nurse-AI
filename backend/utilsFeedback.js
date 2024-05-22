import openai from './config/open-ai.js'

async function get_feedback(transcription, chosen_case) {
  let message = [
    {
      role: 'system',
      content: `As a senior nurse, you are given this sample patient update from a nurse student based on a patient's information or case. Please give feedback in the form of 6 questions that you would ask the student to help them improve their patient update.`,
    },
  ]
  if (chosen_case != null) {
    message.push({ role: 'user', content: chosen_case })
  }
  message.push({ role: 'user', content: transcription })
  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: message,
  })

  console.log('Feedback \n')
  console.log(message)

  return chatCompletion.choices[0]
}

export default get_feedback
