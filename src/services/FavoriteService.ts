export class FavoriteService {
  private static STORAGE_KEY = "user_favorites";

  /**
   * Retrieves favorite product IDs for given user.
   */
  static getFavorites(userId: number): number[] {
    try {
      const allFavorites = this.getAllFavorites();
      return allFavorites[userId.toString()] || [];
    } catch (error) {
      console.error("Error getting favorites:", error);
      return [];
    }
  }

  /**
   * Toggles product's favorite status for specific user.
   */
  static toggleFavorite(userId: number, productId: number): number[] {
    try {
      const allFavorites = this.getAllFavorites();
      const userFavorites = allFavorites[userId.toString()] || [];

      const updatedFavorites = userFavorites.includes(productId)
        ? userFavorites.filter((id) => id !== productId)
        : [...userFavorites, productId];

      allFavorites[userId.toString()] = updatedFavorites;
      this.saveAllFavorites(allFavorites);

      return updatedFavorites;
    } catch (error) {
      console.error("Error toggling favorite:", error);
      return this.getFavorites(userId);
    }
  }

  /**
   * Checks if product is in user's favorites list.
   */
  static isFavorite(userId: number, productId: number): boolean {
    const userFavorites = this.getFavorites(userId);
    return userFavorites.includes(productId);
  }

  /**
   * Removes all favorites for given user.
   */
  static clearUserFavorites(userId: number): void {
    try {
      const allFavorites = this.getAllFavorites();
      delete allFavorites[userId.toString()];
      this.saveAllFavorites(allFavorites);
    } catch (error) {
      console.error("Error clearing user favorites:", error);
    }
  }

  /**
   * Internal method to load all favorites from localStorage.
   */
  private static getAllFavorites(): Record<string, number[]> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error("Error parsing favorites from localStorage:", error);
      return {};
    }
  }

  /**
   * Internal method to save all users' favorites to localStorage.
   */
  private static saveAllFavorites(favorites: Record<string, number[]>): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }
}
