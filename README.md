# Movie Recommender Chatbot  

## Introduction  
The **Movie Recommender Chatbot** is a Hollywood movie recommendation system that leverages advanced **Natural Language Processing (NLP)** techniques to provide highly accurate and context-aware movie suggestions. It uses **Azure’s Language Service SDK** with **GPT-4** to analyze user input, understand preferences and sentiment, and generate personalized recommendations. By integrating IMDb’s API, the chatbot ensures a robust knowledge base with up-to-date movie information.

This project aims to provide an intuitive and conversational way to discover Hollywood movies across various genres, time periods, and themes.

---

## Features  

1. **Personalized Movie Recommendations**:  
   - Uses advanced NLP techniques to analyze user preferences.  
   - Factors in user sentiment, context, and keywords for tailored suggestions.  

2. **Dynamic Knowledge Base**:  
   - Integrated with IMDb's API to fetch detailed and accurate movie information.  
   - Covers a wide range of popular movies, genres, and time periods.

3. **Sophisticated Recommendation Algorithm**:  
   - Scores movies based on:  
     - Title matches  
     - Genre matches  
     - Plot keyword matches  
     - Director/Actor matches  
     - Year/Time period matches  
   - Employs a **weighted scoring system** for improved results.

4. **Improved UI/UX**:  
   - Added loading states to enhance user experience.  
   - Disabled input while processing recommendations to avoid confusion.  
   - Enhanced error handling and user feedback for smoother interactions.

5. **Advanced NLP with Azure Language Services**:  
   - Implements **key phrase extraction** for identifying user preferences.  
   - Uses **entity recognition** to understand movie-related details.  
   - Handles complex user queries with ease.  

---

## Installation  

### Prerequisites  
- Python 3.8+  
- Azure Language Service SDK key and endpoint  
- IMDb API key  
- Libraries:  
  - `openai`  
  - `azure-ai-language`  
  - `requests`  
  - `streamlit`  

