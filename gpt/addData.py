import openai
import json

# Set up OpenAI API key
openai.api_key = "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"

# Define additional data to be used for fine-tuning
additional_data = ""

# Define the ID of the fine-tuned model to add data to
model_id = "ada:ft-personal-2023-04-12-17-27-02"

# Define the parameters for the new fine-tuning task
params = {
    "model": model_id,
    "prompt": "Your fine-tuning prompt goes here",
    "temperature": 0.7,
    "max_tokens": 256,
    "n_epochs": 1,
    "data": additional_data
}

# Create the new fine-tuning task
task = openai.Task.create(params=params)

# Wait for the fine-tuning task to complete
while task.status != "completed":
    task = openai.Task.retrieve(id=task.id)

# Print the results of the fine-tuning task
print(json.dumps(task.result, indent=2))
