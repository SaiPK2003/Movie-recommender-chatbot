import { TextAnalysisClient, AzureKeyCredential } from "@azure/ai-language-text";
import axios from 'axios';
import { Movie } from '../types/movie';

export class MovieService {
  private static movieDatabase: Movie[] = [/* ... existing movies ... */];
  
  // Initialize Azure Language Service client
  private static getAzureClient() {
    const endpoint = import.meta.env.VITE_AZURE_ENDPOINT;
    const apiKey = import.meta.env.VITE_AZURE_API_KEY;
    
    if (!endpoint || !apiKey) {
      throw new Error('Azure credentials not configured');
    }
    
    return new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
  }
  
  // Analyze text using Azure Language Service
  private static async analyzeText(input: string) {
    try {
      const client = this.getAzureClient();
      const documents = [{ id: "1", text: input }];
      
      // Get key phrases
      const keyPhrasesResult = await client.extractKeyPhrases(documents);
      const keyPhrases = keyPhrasesResult[0].keyPhrases || [];
      
      // Get sentiment
      const sentimentResult = await client.analyzeSentiment(documents);
      const sentiment = sentimentResult[0].sentiment;
      
      return { keyPhrases, sentiment };
    } catch (error) {
      console.error('Azure analysis error:', error);
      return null;
    }
  }
  
  // Search IMDb API
  private static async searchIMDb(query: string) {
    try {
      const apiKey = import.meta.env.VITE_IMDB_API_KEY;
      if (!apiKey) {
        throw new Error('IMDb API key not configured');
      }
      
      const response = await axios.get(`https://imdb-api.com/en/API/SearchMovie/${apiKey}/${query}`);
      return response.data.results || [];
    } catch (error) {
      console.error('IMDb API error:', error);
      return [];
    }
  }
  
  // Get detailed movie info from IMDb
  private static async getMovieDetails(imdbId: string): Promise<Movie | null> {
    try {
      const apiKey = import.meta.env.VITE_IMDB_API_KEY;
      if (!apiKey) {
        throw new Error('IMDb API key not configured');
      }
      
      const response = await axios.get(`https://imdb-api.com/en/API/Title/${apiKey}/${imdbId}`);
      const data = response.data;
      
      return {
        id: data.id,
        title: data.title,
        year: parseInt(data.year),
        plot: data.plot,
        genre: data.genres.split(', '),
        director: data.directors,
        actors: data.stars.split(', '),
        posterUrl: data.image,
        rating: parseFloat(data.imDbRating)
      };
    } catch (error) {
      console.error('IMDb API error:', error);
      return null;
    }
  }

  static async getRecommendations(userInput: string): Promise<Movie[]> {
    try {
      // First try to get recommendations from local database
      const localResults = await this.getLocalRecommendations(userInput);
      
      // If we have enough local results, return them
      if (localResults.length >= 3) {
        return localResults;
      }
      
      // Otherwise, enhance with IMDb results
      const analysis = await this.analyzeText(userInput);
      if (!analysis) {
        return localResults;
      }
      
      // Use key phrases from Azure analysis to search IMDb
      const searchPromises = analysis.keyPhrases.map(phrase => this.searchIMDb(phrase));
      const searchResults = await Promise.all(searchPromises);
      
      // Get detailed information for top IMDb results
      const imdbIds = searchResults
        .flat()
        .slice(0, 5)
        .map(result => result.id);
        
      const moviePromises = imdbIds.map(id => this.getMovieDetails(id));
      const imdbMovies = (await Promise.all(moviePromises))
        .filter((movie): movie is Movie => movie !== null);
      
      // Combine local and IMDb results, remove duplicates
      const allMovies = [...localResults, ...imdbMovies];
      const uniqueMovies = allMovies.filter((movie, index, self) =>
        index === self.findIndex(m => m.id === movie.id)
      );
      
      return uniqueMovies.slice(0, 3);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      return this.getLocalRecommendations(userInput);
    }
  }
  
  // Original local recommendation logic
  private static async getLocalRecommendations(userInput: string): Promise<Movie[]> {
    // ... existing local recommendation logic ...
  }
}