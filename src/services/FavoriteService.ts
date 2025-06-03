export class FavoriteService {
  private static STORAGE_KEY = "user_favorites";

  // Get favorites for a specific user
  static getFavorites(userId: number): number[] {
    try {
      const allFavorites = this.getAllFavorites();
      return allFavorites[userId.toString()] || [];
    } catch (error) {
      console.error("Error getting favorites:", error);
      return [];
    }
  }

  // Toggle favorite status
  static toggleFavorite(userId: number, productId: number): number[] {
    try {
      const allFavorites = this.getAllFavorites();
      const userFavorites = allFavorites[userId.toString()] || [];

      let updatedFavorites: number[];

      if (userFavorites.includes(productId)) {
        // If product is already favorited, remove it
        updatedFavorites = userFavorites.filter((id) => id !== productId);
      } else {
        // Otherwise, add it to favorites
        updatedFavorites = [...userFavorites, productId];
      }

      // Save updated list
      allFavorites[userId.toString()] = updatedFavorites;
      this.saveAllFavorites(allFavorites);

      return updatedFavorites;
    } catch (error) {
      console.error("Error toggling favorite:", error);
      return this.getFavorites(userId);
    }
  }

  // Check if product is currently favorited by user
  static isFavorite(userId: number, productId: number): boolean {
    const userFavorites = this.getFavorites(userId);
    return userFavorites.includes(productId);
  }

  // Clear all favorites for given user (typically on logout)
  static clearUserFavorites(userId: number): void {
    try {
      const allFavorites = this.getAllFavorites();
      delete allFavorites[userId.toString()];
      this.saveAllFavorites(allFavorites);
    } catch (error) {
      console.error("Error clearing user favorites:", error);
    }
  }

  // Load all users' favorites from localStorage
  private static getAllFavorites(): Record<string, number[]> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error("Error parsing favorites from localStorage:", error);
      return {};
    }
  }

  // Save the full favorites object to localStorage
  private static saveAllFavorites(favorites: Record<string, number[]>): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }
}
