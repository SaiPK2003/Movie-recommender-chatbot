import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { MovieCard } from './components/MovieCard';
import { useChatStore } from './store/chatStore';
import { MovieService } from './services/movieService';
import { Movie } from './types/movie';

function App() {
  const [input, setInput] = useState('');
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { messages, addMessage } = useChatStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    addMessage(input, false);
    setIsLoading(true);
    
    try {
      // Get movie recommendations
      const movies = await MovieService.getRecommendations(input);
      setRecommendations(movies);

      // Add bot response
      const response = movies.length > 0
        ? "Based on your preferences and my analysis, here are some movies you might enjoy:"
        : "I couldn't find any movies matching your criteria. Try being more specific or use different keywords.";
      
      addMessage(response, true);
    } catch (error) {
      addMessage("Sorry, I encountered an error while processing your request. Please try again.", true);
      setRecommendations([]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Movie Recommendation Chatbot
          </h1>
          
          {/* Chat messages */}
          <div className="mb-6 h-[400px] overflow-y-auto">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                isBot={message.isBot}
              />
            ))}
          </div>

          {/* Movie recommendations */}
          {recommendations.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {recommendations.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}

          {/* Input form */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell me what kind of movies you like..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;