from openai import OpenAI

api_url = "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"
base_url = "https://openrouter.ai/api/v1"
model = "nvidia/nemotron-3-ultra-550b-a55b:free"

client = OpenAI(base_url=base_url, api_key=api_url)



def ask_ai(prompt):
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content
        
