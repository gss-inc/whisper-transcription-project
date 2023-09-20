import { OpenAIClient, AzureKeyCredential } from '@azure/openai';

async function callOpenAI(messages) {
    let resultChoice;
    const client = new OpenAIClient(
        process.env.AZURE_ENDPOINT ,
        new AzureKeyCredential(process.env.AZURE_API_KEY ),
    );
    
    const deploymentId = 'gpt-4-test';
    const options = {
        temperature: 1,
    };

    const result = await client.getChatCompletions(
        deploymentId,
        messages,
        options,
    );

    for (const choice of result.choices) {
        resultChoice = `${choice.message?.content}`;
    }

    return resultChoice
}

export { callOpenAI }
