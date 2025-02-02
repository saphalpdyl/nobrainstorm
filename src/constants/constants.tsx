// Define the configuration object
const lineGraphConfig = {
    model: "gpt-4o",
    temperature: 1,
    max_tokens: 5000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  };
  

// Define the configuration object
const summarizeConfig = {
    model: "gpt-4o",
    temperature: 1,
    max_tokens: 6000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  };
  
  export {lineGraphConfig, summarizeConfig};