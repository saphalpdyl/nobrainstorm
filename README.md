# Brainstormer

*Interactive AI-Driven Brainstorming Board*

Brainstormer is a structured, visual collaboration tool enhanced by AI analysis and automation, designed to revolutionize the way teams brainstorm and develop ideas.

## Features

### Dual-Canvas Interface

- **Team Canvas**: Engage in real-time collaboration using text, sketches, and sticky notes.
- **AI Canvas**: Automatically organizes ideas into flowcharts, Venn diagrams, or X-Y graphs to reveal trends and patterns.

### AI Guidance

- **Goal-Oriented Suggestions**: Set specific brainstorming goals (e.g., "Product Launch Strategy for a Hackathon") to focus AI-generated suggestions.
- **Real-Time Concept Generation**: The AI generates related concepts, connects ideas, and builds visual frameworks in real time.

### Image Analysis & Enhancement

- **Sketch Refinement**: Upload or sketch images; the AI analyzes content and refines or iterates via DALL-E integration.

### Instant Visualizations

- **Automated Structuring**: Converts unstructured input into mind maps, timelines, or hierarchical charts automatically.

### Voice-to-Text

- **Live Idea Capture**: Capture spoken ideas during live sessions.
- **Structured Responses**:
  - Every 5-10 seconds (debounce) or with user interaction (button click).
  - AI generates tables and short summaries of information on specific topics.
  - Produces markdown tables highlighting positives and negatives, strengths and weaknesses.

### Graphing

- **JSON-Based Visualization**:
  - AI creates JSON values representing X and Y coordinates for 2-3 graphs comparing key brainstorming elements.
  - Contextual pairing and ranking for 2D graph plotting.
  - Frontend utilizes this data to draft charts using a JavaScript library.

### Flowcharts

- **Pattern Recognition**:
  - AI identifies flows/patterns in brainstorming sessions and generates flow diagrams.
  - Flowcharts are provided in code, which the frontend converts into visual representations.

### Additional Features

- **Voice-to-Text Enhancement**: Converts voice input into text, corrects grammar, and generates concise notes.
- **Scribble to Image**: Transforms selected sketches into refined images using DALL-E for minimalistic drawings.
- **Simple Diagrams**: Generates Venn diagrams and simple roadmaps based on user input.
- **AI Control**: Includes a "Freeze AI" button to pause automation during divergent thinking phases.
- **User Control**: Allows users to edit AI outputs and includes a "Re-prompt" button for iterative refinement.


## Usage

1. **Launch the Application**: Open your browser and navigate to `http://brainstromer.tech`.
2. **Create a New Session**: Start a new brainstorming session by selecting the "New Session" option.
3. **Utilize the Team Canvas**: Collaborate with your team in real-time using text, sketches, and sticky notes.
4. **Engage the AI Canvas**: Allow the AI to organize and visualize your ideas into various formats.
5. **Explore Additional Features**: Use voice-to-text, image analysis, and other tools to enhance your brainstorming experience.
